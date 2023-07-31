const { DataTypes } = require('sequelize');
module.exports=(sequelize)=>{
    sequelize.define('Diets',{
      
      name:{
        type:DataTypes.JSONB,
        allowNull:false
      }
    },
    {
        timestamps:false
    })
}