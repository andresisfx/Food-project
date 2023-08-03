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
        allowNull:false,
        validate:{
          validate: {
            isUnique: async (value) => {
              const existingDiet = await sequelize.models.Diets.findOne({ where: { name: value } });
              if (existingDiet) {
                throw new Error('The diet name must be unique.');
              }
            },
          },
        
        }
      }
    },
    {
        timestamps:false
    })
}