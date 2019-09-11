const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET all visible categories 
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "categories" WHERE "hide_cat" = false ORDER BY category ASC;`)
        .then((result) => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error getting categories', error);
            res.sendStatus(500);
        });
});

// GET all hidden categories
router.get('/hidden', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "categories" WHERE "hide_cat" = true;`)
        .then((result) => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error getting categories', error);
            res.sendStatus(500);
        });
});

// POST route that posts a new category
router.post('/add', rejectUnauthenticated, (req, res) => {
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

// PUT route that changes a category to hidden
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('Updating category to hidden');
    const sqlText = `UPDATE "categories" SET "hide_cat"=$1 WHERE "id"=$2;`
    values = [true, req.params.id]
    pool.query(sqlText, values)
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})

// PUT route that changes a category to visible
router.put('/unhide/:id', rejectUnauthenticated, (req, res) => {
    console.log('Updating category to visible');
    const sqlText = `UPDATE "categories" SET "hide_cat"=$1 WHERE "id"=$2;`
    values = [false, req.params.id]
    pool.query(sqlText, values)
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})

// GET all e-mails for CSV download
router.get('/emails', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "email" FROM "stories"; ;`)
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error getting emails', error);
            res.sendStatus(500);
        });
});



module.exports = router;