const express = require('express')
const routes = express.Router()
const admin = require('./controllers/admin')

routes.get('/admin', admin.index)
routes.get("/admin/recipes/create", admin.create)
routes.get("/admin/recipes/:index", admin.show)
routes.get("/admin/recipes/:index/edit", admin.edit)

routes.post("/admin", admin.post)
routes.put("/admin", admin.put)
routes.delete("/admin", admin.delete) 
module.exports = routes