const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
  id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,

    },

    bred_for: {
      type: DataTypes.STRING,
      allowNull: true,

    },

    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue : 'caca'
    
    },
    creadoEnBase:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue : true,
    }


  });
};
