const express = require('express')
const routes = express.Router()
const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')
const home = require('./app/controllers/home')

routes.get("/", home.index)
routes.get("/about", home.about)
routes.get("/recipes", home.recipes)
routes.get("/recipe/:index", home.recipe)
routes.get("/chefs", home.chefs)

routes.get("/admin", recipes.admin)
routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:index", recipes.show)
routes.get("/admin/recipes/:index/edit", recipes.edit)

routes.post("/recipes", recipes.post)
routes.put("/recipes", recipes.put)
routes.delete("/recipes", recipes.delete)

routes.get("/admin/chefs", chefs.index)
routes.get("/admin/chefs/create", chefs.create)
routes.get("/admin/chefs/:index", chefs.show)
routes.get("/admin/chefs/:index/edit", chefs.edit)

routes.post("/chefs", chefs.post)
routes.put("/chefs", chefs.put)
routes.delete("/chefs", chefs.delete)

module.exports = routes