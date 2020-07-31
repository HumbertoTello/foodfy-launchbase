const Chef = require("../models/Chef")
const Recipe = require("../models/Recipe")

module.exports = {
  index(req, res) {
    const { filter } = req.query

    if(filter) {
      Recipe.findBy(filter, function(recipes) {
        return res.render('home/index', { filter, recipes, chefOptions: options })
      })
    } else {
      Recipe.all(function(recipes) {
        Recipe.chefsSelectOptions(function(options) {
          return res.render('home/index', { recipes, chefOptions: options })
        })
      })
    }
  },
  about(req, res) {
    return res.render("home/about")
  },
  recipes(req, res) {
    const { filter } = req.query

    if(filter) {
      Recipe.findBy(filter, function(recipes) {
        Recipe.chefsSelectOptions(function(options) {
        
          return res.render('home/recipes', { filter, recipes, chefOptions: options })
        })
      })
    } else {
      Recipe.all(function(recipes) {
        Recipe.chefsSelectOptions(function(options) {
          return res.render('home/recipes', { recipes, chefOptions: options })
        })
      })
    }

  },
  recipe(req, res) {
    Recipe.find(req.params.index, function(recipe) {
      
      if(!recipe) return res.send("Recipe not found!")

      Recipe.chefsSelectOptions(function(options) {
        return res.render('home/recipe', { recipe, chefOptions: options })
      })
    })
  },
  chefs(req, res) {
    Chef.all(function(chefs) {
      return res.render("home/chefs", { chefs })
    })
  }
}