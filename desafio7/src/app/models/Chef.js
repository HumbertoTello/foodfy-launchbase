const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
  all(callback) {
    db.query(`
      SELECT chefs.*, COUNT(recipes) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      WHERE chefs.avatar_url IS NOT NULL
      GROUP BY chefs.id
      ORDER BY total_recipes DESC`, function(err, results) {
        if(err) throw `Database error ${err}`

        callback(results.rows)
    })
  },
  allRecipes(callback) {
    db.query(`SELECT * FROM recipes WHERE image IS NOT NULL`, function(err, results) {
      if(err) throw `Database error! ${err}`

      callback(results.rows)
    })
  },
  create(data, callback) {
    const query = `
      INSERT INTO chefs (
        name,
        avatar_url,
        created_at,
        file_id
      ) VALUES ($1, $2, $3, $4)
      RETURNING id
    `
    const values = [
      data.name,
      data.avatar_url,
      date(Date.now()).iso,
      data.file_id
    ]

    db.query(query, values, function(err, results) {
      if (err) throw `Database error! ${err}`
      callback(results.rows[0])
    })
  },
  find(id, callback) {
    db.query(`
      SELECT chefs.*, (SELECT count(recipes) FROM recipes WHERE recipes.chef_id = $1) AS total_recipes
      FROM chefs
      WHERE chefs.id = $1`, [id], function(err, results) {
        if (err) throw `Database error ${err}`
        callback(results.rows[0])
    })
  },
  update(data, callback) {
    const query = `
      UPDATE chefs SET
      avatar_url = ($1),
      name = ($2)
      WHERE id = $3
    `

    const values = [
      data.avatar_url,
      data.name,
      data.id
    ]

    db.query(query, values, function(err, results) {
      if(err) throw `Database error! ${err}`

      callback()
    })
  },
  delete(id, callback) {
    db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results) {
      if (err) throw `Database error! ${err}`

      return callback()
    })
  },
  file(id) {
    return db.query(`
    SELECT * FROM files 
    LEFT JOIN chefs ON (files.id = chefs.file_id)
    WHERE files.id = (SELECT file_id FROM chefs WHERE id = $1)
    `, [id])
  },
  allFiles() {
    return db.query(`
      SELECT chefs.id AS chef_id, chefs.name AS chef_name, * FROM chefs
      FULL JOIN files ON (chefs.file_id = files.id)
      WHERE chefs.id IS NOT NULL AND files.path IS NOT NULl
      ORDER BY chefs.id
    `)
  }
}