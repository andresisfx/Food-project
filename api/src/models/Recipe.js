const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue:UUIDV4
      
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
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
    },
    createdDb:{
      type:DataTypes.BOOLEAN,
      defaultValue:true
    }
    
    
  },
  {
    timestamps:false
  }
  
  );
};
