const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      allowNull:false,
      autoIncrement:false
      
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    summaryOfDish:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    healthScore:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        isInt:true,
        min:1,
        max:10
      }
    },
    stepByStep:{
      type:DataTypes.TEXT,
      allowNull:false
    }
    
  },
  {
    timestamps:false
  }
  
  );
};
