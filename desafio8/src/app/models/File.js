const db = require('../../config/db')
const fs = require('fs')

module.exports = {
  create(data) {
    const query = `
      INSERT INTO files (
        name,
        path
      ) VALUES ($1, $2)
      RETURNING id
    `
    const values = [
      data.filename,
      data.path
    ]

    return db.query(query, values)
  },
  createRecipeFile(recipe_id, file_id) {
    const query = `
      INSERT INTO recipe_files (
        recipe_id,
        file_id
      ) VALUES ($1, $2)
      RETURNING id
    `
    const values = [
      recipe_id,
      file_id
    ]

    return db.query(query, values)
  },
  async delete(id) {
    await db.query(`DELETE FROM recipe_files WHERE file_id = $1`, [id])

    const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
    const file = result.rows[0]

    fs.unlinkSync(file.path)

    return db.query(`
      DELETE FROM files WHERE id = $1
    `, [id])
  }
}