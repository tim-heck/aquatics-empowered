const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    const sqlText = `
        SELECT stories.id, stories.name, stories.location, stories.title, stories.aquatic_therapist, 
        stories.message, stories.email, categories.category
        FROM stories
        JOIN categories ON stories.category_id = categories.id
        ORDER BY id ASC;`;
    pool.query(sqlText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
})

module.exports = router;