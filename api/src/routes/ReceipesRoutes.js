const {Router}= require("express");
const recipesRouter =Router();
const {getRecipesHandler,getRecipesByIdHandler, postRecipesHandler} = require("../handlers/ReceipesHandler")

recipesRouter.get("/",getRecipesHandler)
recipesRouter.get("/:id",getRecipesByIdHandler)
recipesRouter.post("/",postRecipesHandler)

module.exports= recipesRouter