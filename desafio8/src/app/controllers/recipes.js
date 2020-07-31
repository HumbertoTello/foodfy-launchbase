const Recipe = require("../models/Recipe")
const File = require("../models/File")
const { file } = require("../models/Chef")

module.exports = {
  admin(req, res) {
    return res.redirect(`/admin/recipes`)
  },
  index(req, res) {
    Recipe.all(function(recipes) {
      
      Recipe.chefsSelectOptions(async function(options) {

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

        return res.render('recipes/index', { recipes, chefOptions: options, files })
      })
    })
  },
  create(req, res) {
    Recipe.chefsSelectOptions(function(options) {
      return res.render('recipes/create', { chefOptions: options })
    })
  },
  async post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields")
      }
    }

    if (req.files.length == 0)
      return res.send("Please, send at least one image")
    
    let results = await Recipe.create(req.body)
    const recipeId = parseInt(results.rows[0].id)

    const filesPromise = req.files.map(async file => {
      let results = await File.create({...file})
      const fileId = parseInt(results.rows[0].id)
      File.createRecipeFile(recipeId, fileId)
      }
    )

    await Promise.all(filesPromise)

    return res.redirect(`/admin/recipes`)
  },
  show(req, res) {
    Recipe.find(req.params.index, function(recipe) {
      if (!recipe) return res.send("Recipe not found!")

      Recipe.chefsSelectOptions(async function(options) {
        results = await Recipe.files(recipe.id)
        const files = results.rows.map(file => ({
          ...file,
          src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render('recipes/show', { recipe, chefOptions: options, files })
      })
    })
  },
  edit(req, res) {
    Recipe.find(req.params.index, async function(recipe) {
      if(!recipe) return res.send("Recipe not found!")

      results = await Recipe.files(recipe.id)
      let files = results.rows
      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }))

      Recipe.chefsSelectOptions(function(options) {
        return res.render('recipes/edit', { recipe, chefOptions: options, files })
      })
    })
  },
  async put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "" && key!= "removed_files") {
        return res.send(`Please, fill all fields`)
      }
    }

    Recipe.update(req.body, async function() {
      if (req.files.length != 0) {
        const newsFilesPromise = req.files.map(async file => {
          let results = await File.create({...file})
          const fileId = parseInt(results.rows[0].id)
          File.createRecipeFile(req.body.id, fileId)
          }
        )
  
        await Promise.all(newsFilesPromise)
      }
  
      if (req.body.removed_files) {
        // 1,2,3 -> [1,2,3,]
        const removedFiles = req.body.removed_files.split(",")
        const lastIndex = removedFiles.length - 1
        removedFiles.splice(lastIndex, 1) // [1,2,3]
        
        const removedFilesPromise = removedFiles.map(id => File.delete(id))
  
        await Promise.all(removedFilesPromise)
      }

      return res.redirect(`/admin/recipes/${req.body.id}`)
    })
  },
  async delete(req, res) {
    const results = await Recipe.files(req.body.id)
    let files = results.rows

    const removedFiles = files.map(files => files.id)

    const removedFilesPromise = removedFiles.map(id => File.delete(id))
    await Promise.all(removedFilesPromise)

    Recipe.delete(req.body.id, function() {
      return res.redirect(`/admin/recipes`)
    })
  }
}