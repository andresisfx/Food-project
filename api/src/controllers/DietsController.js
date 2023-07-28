const axios = require("axios");
const {Recipe,Diets} = require("../db");

const getAllDiets = async()=>{
    const data= (await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5")).data;

    const allDiets=[];

    const diets = data.results.map((res)=> {
        return {
           name :res.diets,
           otherDiet:Object.keys(data.results[0])[0]
        }
    })
    
    
    diets.forEach(element => {
      allDiets.push(...element.name,element.otherDiet)
    });
   
       // using new Set we remove all duplicated elements 
    const newObjectDiet = [...new Set(allDiets)].map((diet)=> ({name:diet}));
    
    const savedDb = await Diets.bulkCreate(newObjectDiet);
    
    return savedDb;
    
};

module.exports={getAllDiets}