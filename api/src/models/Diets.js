const { DataTypes, UUID, UUIDV4 } = require('sequelize');
module.exports=(sequelize)=>{
    sequelize.define('Diets',{
      id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:true,
        defaultValue:UUIDV4
      },
      name:{
        type:DataTypes.JSONB,
        allowNull:false
      }
    },
    {
        timestamps:false
    })
}