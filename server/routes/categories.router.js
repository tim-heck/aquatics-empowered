const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Get all categories 
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "categories";`)
        .then((result) => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error getting categories', error);
            res.sendStatus(500);
        });
});

// Post a new category
router.post('/add',(req, res) => {
    const sqlText = `INSERT INTO "categories" ("category")
    VALUES ($1);`
    const values = [req.body.category];
    pool.query(sqlText, values)
    .then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error with post', error);
        res.sendStatus(500);
    });
});

module.exports = router;