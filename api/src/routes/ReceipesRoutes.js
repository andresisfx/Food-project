const {Router}= require("express");
const recipesRouter =Router();
const {getRecipesHandler, postRecipesHandler} = require("../handlers/ReceipesHandler")

recipesRouter.get("/",getRecipesHandler)
recipesRouter.post("/",postRecipesHandler)

module.exports= recipesRouter