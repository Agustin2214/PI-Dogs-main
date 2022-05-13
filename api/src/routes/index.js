const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const {Dog, Temperament} = require('../db');
const e = require('express');

const { APY_KEY } = process.env;

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApi = async ()=>{
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?${APY_KEY}`);
    const apiInfo = await apiUrl.data.map(e => {
return {
    name: e.name?e.name : 'Sin nombre',
    imagen : e.image.url,
    temperaments: e.temperament? e.temperament: 'Sin-Temperamento',
    weight: e.weight.metric.includes('NaN')? '5-12':e.weight.metric,
    height: e.height.metric.includes('NaN')? '5-12':e.height.metric,
    life_span: e.life_span,
    bred_for: e.bred_for,
    id: e.id


}

    })
    return apiInfo
}

// const getDataBase = async ()=>{
//     return await Dog.findAll({
//         include : {
//             model: Temperament,
//             attributes : ['name']
//         }
//     })
// }
const getDataBase = async ()=>{
    let x = await Dog.findAll({
        include : {
            model: Temperament,
            attributes : ['name'],
            through :{
                attributes:[],
            }
        }
    })
return x.map(e=>{
    return{
        ...e.dataValues,
        temperaments : e.temperaments?.map(temps=>temps.name).join(", ")
    }
})

}



const getAllDog = async ()=>{
    const apiInfo = await getApi();
    const dbInfo = await getDataBase();
    const infoYunta = apiInfo.concat(dbInfo);

    return infoYunta
}


router.get('/dog', async (req, res) => {
    const {name} = req.query
    let razasTotales = await getAllDog();
    const {temperamentoss} = req.query
    console.log(temperamentoss) 
    
    
    if(temperamentoss){
        
        let temperamentos  = temperamentoss.replaceAll('%',' ').trim().split('-')
       
    

        var  z =   function(){ 
     
            var array =[] 
            let count = 0  
            
            for(var i = 0; i <  razasTotales.length ; i++){
                 
                for(var j = 0; j <  temperamentos.length ; j++){
                    
                  if(  razasTotales[i].temperaments.includes(temperamentos[j]) ){
                       
                      count = count + 1
                    
                  }else{  
                    count = count + 0
                  }
            
                    } 
                    if(count === temperamentos.length){
                        count = 0  
                        array.push(razasTotales[i])
        
                    }else{
                        count = 0  
                    }
                    count = 0  
                }
                 
                return array
                   
            } 
         const aux = z() 
         aux.length>0 ? 
         res.status(200).send(aux) :
         res.status(404).json([{ "name": 'NO ENCONTRADO',
         "imagen" : 'https://media.istockphoto.com/photos/pug-dog-with-yellow-constructor-safety-helmet-and-cone-and-404-error-picture-id687810238?k=20&m=687810238&s=612x612&w=0&h=5MdWpmZyAKqnZxbUQw5d2t5KttUL4947Sn-DFdM8ayE=',
         "temperament": 'NO ENCONTRADO',
         "weight": 'NO ENCONTRADO',
         "height": 'NO ENCONTRADO',
         "life_span": 'NO ENCONTRADO',
         "bred_for": 'NO ENCONTRADO',
         "id": 'NO ENCONTRADO'}])
       
        
    }else if(name){
        let dogName = await razasTotales.filter( e => e.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length>0 ? 
        res.status(200).send(dogName) :
        res.status(404).json([{ "name": 'NO ENCONTRADO',
        "imagen" : 'https://media.istockphoto.com/photos/pug-dog-with-yellow-constructor-safety-helmet-and-cone-and-404-error-picture-id687810238?k=20&m=687810238&s=612x612&w=0&h=5MdWpmZyAKqnZxbUQw5d2t5KttUL4947Sn-DFdM8ayE=',
        "temperament": 'NO ENCONTRADO',
        "weight": 'NO ENCONTRADO',
        "height": 'NO ENCONTRADO',
        "life_span": 'NO ENCONTRADO',
        "bred_for": 'NO ENCONTRADO',
        "id": 'NO ENCONTRADO'}])

    } else  {

        res.status(200).send(razasTotales)
    }

})

router.get('/dog/:razaid', async (req, res) => {
    const {razaid} = req.params
    let razasTotales = await getAllDog();

    if(razaid){
        let dogName = await razasTotales.find( e => e.id == razaid)
        dogName ? 
        res.status(200).send(dogName) :
        res.status(404).send({ "name": 'Lo siento, no pudimos encontrar esta tipo de raza, puedes crearla en Create Dog',
        "imagen" : 'https://media.istockphoto.com/photos/pug-dog-with-yellow-constructor-safety-helmet-and-cone-and-404-error-picture-id687810238?k=20&m=687810238&s=612x612&w=0&h=5MdWpmZyAKqnZxbUQw5d2t5KttUL4947Sn-DFdM8ayE=',
        "temperament": 'NO FOUND',
        "weight": 'NO FOUND',
        "height": 'NO FOUND',
        "life_span": 'NO FOUND',
        "bred_for": 'NO FOUND',
        "id": 'NO FOUND'})


    } else {

        res.status(200).send(razasTotales)
    }

})

router.get('/temperament', async (req, res) => {
    const infoapi = await getApi()
    let array = []
    infoapi.map(e =>  array.push(e.temperaments))

    const x = array.join(', ').trim()
   
    const arrayfinal = x.split(',')
    var arrayfinal2 =[]
    function aux(){    
        for(var i = 0; i<arrayfinal.length;i++){
      arrayfinal2.push(arrayfinal[i].trim())
    }}
    aux()
   

    const dataArr = new Set(arrayfinal2);

    let result = [...dataArr]
    let arrayfinalfinal = Array.from(result).sort()

    for(var i =0; i <  arrayfinalfinal.length; i++){
        if(arrayfinalfinal[i] !== " "){
        Temperament.findOrCreate({
            where: {name: arrayfinalfinal[i] }
        })
    }
    }

   const allTemperaments = await Temperament.findAll();

res.send(allTemperaments)
})



router.post('/dog', async (req,res)=>{
let {name,height,weight,life_span,imagen,bred_for,temperament} = req.body
console.log(name)

let dogCreador = await Dog.create ({
    name,
    height,
    weight,
    life_span,
    imagen,
    bred_for,
     
    
}) 
 
let temperamenteDb = await Temperament.findAll({
    where : {name : temperament}
})

dogCreador.addTemperament(temperamenteDb)
res.send('dog created')

})
 
 

router.delete('/:name/', async (req, res)=>{
    
   try{ 
    let {name}=req.params
    let {height,temperaments}=req.body
     await Dog.update(
         {name,height,temperaments},
         {
        where:{
            id: id
        }
    })
    res.status(200).send("usuario eliminado")
}catch(error) {
    res.status(400).send("usuario no se pudo eliminar");

}
})



module.exports = router;
