const Chef = require("../models/Chef")

module.exports = {
  index(req, res){
    Chef.all(function(chefs) {
      return res.render("chefs/index", { chefs })
    })
  },
  create(req, res) {
    return res.render("chefs/create")
  },
  post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields")
      }
    }

    Chef.create(req.body, function(chef) {
      return res.redirect(`/admin/recipes`)
    })
  },
  show(req, res) {
    Chef.find(req.params.index, function(chef) {
      if (!chef) return res.send("Chef not found!")

      Chef.allRecipes(function(recipes) {
        return res.render("chefs/show", { chef, recipes })
      })
    })
  },
  edit(req, res) {
    Chef.find(req.params.index, function(chef) {
      if(!chef) return res.send("Chef not found!")

      return res.render("chefs/edit", { chef })
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send(`Please, fill all fields`)
      }
    }

    Chef.update(req.body, function() {
      return res.redirect(`/admin/chefs/${req.body.id}/edit`)
    })
  },
  delete(req, res) {
    Chef.delete(req.body.id, function() {
      return res.redirect(`/admin/recipes`)
    })
  }
}

