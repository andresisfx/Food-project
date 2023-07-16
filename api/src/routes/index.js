const { Router } = require('express');
const recipesRouter = require("./ReceipesRoutes")
const dietsRouter =require("./DietsRoutes")

const mainRouter = Router();

mainRouter.use('/recipes',recipesRouter)
mainRouter.use('/diets',dietsRouter)

module.exports = mainRouter;
