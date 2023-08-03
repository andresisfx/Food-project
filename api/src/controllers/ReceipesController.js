const  axios = require("axios");
const {Recipe,Diets} = require("../db")


const getRecipesApi = async()=> {
    const getRecipes = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5");
    const recipes = getRecipes.data.results.map((result)=>{
        return{
            id:result.id,
            name:result.title.toLowerCase(),
            summaryOfDish:result.summary,
            healthScore:result.healthScore,
            stepByStep:result.analyzedInstructions.map((instruction)=>{
                return instruction.steps.map((step)=>{
                   return step.step
                })
            }).flat(),
            image:result.image,
            diets:result.diets.length?result.diets.map((diet)=> ({name:diet})):"there aren't diets" 
        }
           
        
    })
    return recipes
}

const getRecipesDb = async()=>{
  const getRecFromDb = await Recipe.findAll({
    include:{
        model:Diets,
        attributes:["name"],
        through:{attributes:[]}
        
    }
  
  })
  return getRecFromDb
}

const getAllRecipes = async()=>{
    const dbRecipes = await getRecipesDb();
    const apiRecipes = await getRecipesApi();

    return [...dbRecipes,...apiRecipes]
}

const getRecipeByName = async(name)=>{
 const allRecipes = await getAllRecipes();
 const allRecFilterded = allRecipes.filter((rec)=>rec.name.includes(name.toLowerCase()));

 return allRecFilterded
}

const getRecipeById = async(id)=>{
    
    const allRecipes =await getAllRecipes();
    const idRecipe = allRecipes.filter((rec)=> rec.id.toString()===id.toString())
  
    return idRecipe
}
const createRecipe = async(name,id,image,summaryOfDish,healthScore,stepByStep,diets)=>{
    console.log(diets)
    const newRecipe =await Recipe.create({
        name,id,image,summaryOfDish,healthScore,stepByStep
    })
    
    const getDietsDb = await Diets.findAll({
    where:{
        name: diets
    } 
    
    })
    // const dietIds = getDietsDb.map((diet) => diet.id)
    // await newRecipe.setDiets(dietIds)
     await newRecipe.addDiets(getDietsDb);
     return newRecipe
}

module.exports={getAllRecipes,getRecipeByName,getRecipeById,createRecipe }