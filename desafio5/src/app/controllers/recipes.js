const Recipe = require("../models/Recipe")

module.exports = {
  admin(req, res) {
    return res.redirect(`/admin/recipes`)
  },
  index(req, res) {
    Recipe.all(function(recipes) {
      
      Recipe.chefsSelectOptions(function(options) {
        return res.render('recipes/index', { recipes, chefOptions: options })
      })
    })
  },
  create(req, res) {
    Recipe.chefsSelectOptions(function(options) {
      return res.render('recipes/create', { chefOptions: options })
    })
  },
  post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields")
      }
    }

    Recipe.create(req.body, function(recipe) {
      return res.redirect(`/admin/recipes`)
    })
  },
  show(req, res) {
    Recipe.find(req.params.index, function(recipe) {
      if (!recipe) return res.send("Recipe not found!")

      Recipe.chefsSelectOptions(function(options) {
        return res.render('recipes/show', { recipe, chefOptions: options })
      })
    })
  },
  edit(req, res) {
    Recipe.find(req.params.index, function(recipe) {
      if(!recipe) return res.send("Recipe not found!")

      Recipe.chefsSelectOptions(function(options) {
        return res.render('recipes/edit', { recipe, chefOptions: options })
      })
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send(`Please, fill all fields`)
      }
    }

    Recipe.update(req.body, function() {
      return res.redirect(`/admin/recipes/${req.body.id}`)
    })
  },
  delete(req, res) {
    Recipe.delete(req.body.id, function() {
      return res.redirect(`/admin/recipes`)
    })
  }
}
