const {Router}= require('express');
const dietsRouter = Router();
const {getDietHandler}= require("../handlers/DietsHandler")

dietsRouter.get('/',getDietHandler)

module.exports= dietsRouter