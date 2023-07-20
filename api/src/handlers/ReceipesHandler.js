const {getAllRecipes,getRecipeByName,getRecipeById,createRecipe } = require("../controllers/ReceipesController")

const getRecipesByIdHandler = async(req,res)=>{
const {id} = req.params
  
   try {
      if(id){
   const getIdRecipe = await getRecipeById(id);
    getIdRecipe.length? res.status(200).json(getIdRecipe):res.status(400).send("id doesn't found")
      }
 } catch (error) {
   res.status(400).json({error:error.message})
 }

}

const getRecipesHandler = async(req,res)=>{
 const {name} = req.query
//  console.log(req.query) 
 try {
   if(name){
      const getRecipe = await getRecipeByName(name);
      getRecipe.length? res.status(200).json(getRecipe): res.status(400).send("the recipe doesn't exist")
   }
   else{
   const getRecipe = await getAllRecipes();
    res.status(200).json(getRecipe)
   }
    
 } catch (error) {
   res.status(400).json({error:error.message})
 }
 
}


const postRecipesHandler = async(req,res)=>{
   const {name,id,image,summaryOfDish,healthScore,stepByStep,diets}= req.body
   try {
      const newRecipe = await createRecipe(name,id,image,summaryOfDish,healthScore,stepByStep,diets);
      res.status(200).json(newRecipe)
   } catch (error) {
      res.status(400).json({error:error.message})
   }
}
module.exports= {getRecipesHandler,getRecipesByIdHandler,postRecipesHandler}