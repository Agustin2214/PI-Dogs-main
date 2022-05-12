import { BrowserRouter } from 'react-router-dom';
import './App.css';
import {LadingPage} from './Componentes/LadingPage'
import { Route, Switch } from 'react-router-dom';
import { Home } from './Componentes/Home';
import {  FormDog } from './Componentes/FormDog';
import { CardDetalles } from './Componentes/CardDetalles';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
      <Switch>
        
     <Route exact path ='/' component = {LadingPage} />
     <Route path="/home/:id" component={CardDetalles} />
     <Route exact path ='/home' component = {Home} />
    
     <Route exact path ='/dog' component = {FormDog} />
     
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
