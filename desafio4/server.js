const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./routes")
const methodOverride = require("method-override")

const server = express()
const recipes = require("./data.js")

server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))
server.use(methodOverride("_method"))
server.use(routes)

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

server.listen("5003", function () {
  console.log("Server is running")
})