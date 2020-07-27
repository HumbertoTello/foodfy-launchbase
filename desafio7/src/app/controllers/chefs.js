const Chef = require("../models/Chef")
const File = require("../models/File")
const Recipe = require("../models/Recipe")

module.exports = {
  index(req, res){
    Chef.all(async function(chefs) {
      results = await Chef.allFiles()
      let files = results.rows

      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }))

      return res.render("chefs/index", { chefs, files })
    })
  },
  create(req, res) {
    return res.render("chefs/create")
  },
  async post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields")
      }
    }

    let results = await File.create(req.file)
    const fileId = parseInt(results.rows[0].id)
    req.body.file_id = fileId

    Chef.create(req.body, function(chef) {
      return res.redirect(`/admin/recipes`)
    })
  },
  show(req, res) {
    Chef.find(req.params.index, function(chef) {
      if (!chef) return res.send("Chef not found!")

      Chef.allRecipes(async function(recipes) {
        results = await Chef.file(req.params.index)
        let file = results.rows[0]
        if (file) {
          file.src = `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }

        results = await Recipe.allFiles()
        let files = results.rows

        files = files.map(file => ({
          ...file,
          src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))
        
        let deleteFiles = []

        for (let i = 0; i < files.length; i++) {
          if (i < files.length-1) {
            if (files[i].recipe_id === files[i+1].recipe_id ) {
              deleteFiles.push(i)
            }
          }
        }

        for (var i = deleteFiles.length - 1; i>= 0; i--) {
          files.splice(deleteFiles[i], 1)
        }

        return res.render("chefs/show", { chef, recipes, file, files })
      })
    })
  },
  edit(req, res) {
    Chef.find(req.params.index, async function(chef) {
      if(!chef) return res.send("Chef not found!")

      let results = await Chef.file(chef.id)
      let file = results.rows
      file = file.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }))

      return res.render("chefs/edit", { chef, file })
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

