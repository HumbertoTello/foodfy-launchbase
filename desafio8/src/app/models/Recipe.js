const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM recipes WHERE image IS NOT NULL ORDER BY created_at DESC`, function(err, results) {
      if(err) throw `Database error ${err}`

      callback(results.rows)
    })
  },
  create(data) {
    const query = `
      INSERT INTO recipes (
        chef_id,
        image,
        title,
        ingredients,
        preparation,
        information,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `
    const values = [
      data.chef,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso
    ]

    return db.query(query, values)
  },
  find(id, callback) {
    db.query(`
      SELECT *
      FROM recipes
      WHERE id = $1`, [id], function(err, results) {
        if (err) throw `Database error ${err}`
        callback(results.rows[0])
    })
  },
  findBy(filter, callback) {
    db.query(`SELECT * FROM recipes WHERE recipes.title ILIKE '%a%' AND image IS NOT NULL ORDER BY updated_at DESC`, function(err, results) {
      if(err) throw `Database error ${err}`

      callback(results.rows)
    })
  },
  update(data, callback) {
    const query = `
      UPDATE recipes SET
      chef_id = ($1),
      image = ($2),
      title = ($3),
      ingredients = ($4),
      preparation = ($5),
      information = ($6)
      WHERE id = $7
    `

    const values = [
      data.chef,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.id
    ]

    db.query(query, values, function(err, results) {
      if(err) throw `Database error! ${err}`

      callback()
    })
  },
  delete(id, callback) {
    db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results) {
      if (err) throw `Database error! ${err}`

      return callback()
    })
  },
  chefsSelectOptions(callback) {
    db.query(`SELECT name, id FROM chefs WHERE chefs.avatar_url IS NOT NULL`, function(err, results) {
      if(err) throw `Database error! ${err}`

      callback(results.rows)
    })
  },
  files(id) {
    return db.query(`
      SELECT * FROM files WHERE id IN (SELECT file_id FROM recipe_files WHERE recipe_id = $1)
    `, [id])
  },
  allRecipeFiles() {
    return db.query(`
      SELECT * FROM recipe_files
    `)
  },
  allFiles() {
    return db.query(`
      SELECT * FROM recipes
      FULL JOIN recipe_files ON (recipes.id = recipe_files.recipe_id)
      FULL JOIN files ON (files.id = recipe_files.file_id)
      WHERE recipes.id IS NOT NULL AND files.path IS NOT NULL
      ORDER BY recipes.id
    `)
  }
}