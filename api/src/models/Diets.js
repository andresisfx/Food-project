const { DataTypes } = require('sequelize');
module.exports=(sequelize)=>{
    sequelize.define('Diets',{
      
      name:{
        type:DataTypes.TEXT,
        allowNull:false
      }
    },
    {
        timestamps:false
    })
}