const axios = require("axios");
const {Recipe,Diets} = require("../db");

const getAllDiets = async()=>{
    const data= (await axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=01b6918a716f45a98e004ede8f5e2754&addRecipeInformation=true&number=100")).data;

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