const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const recipes = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
})

server.get("/", function(req, res) {
  return res.render("index", { recipes })
})

server.get("/about", function(req, res) {
  return res.render("about")
})

server.get("/recipes", function(req, res) {
  return res.render("recipes", { recipes })
})

server.get("/recipe/:index", function(req, res) {
  const recipeIndex = req.params.index
  const recipe_show = recipes[recipeIndex]

  return res.render("recipe", { recipe_show })
})

server.listen("5002", function () {
  console.log("Server is running")
})