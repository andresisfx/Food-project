const { DataTypes } = require('sequelize');
module.exports=(sequelize)=>{
    sequelize.define('Diets',{
      id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false,
        defaultValue:DataTypes.UUIDV4
      },
      name:{
        type:DataTypes.TEXT,
        allowNull:false
      }
    },
    {
        timestamps:false
    })
}