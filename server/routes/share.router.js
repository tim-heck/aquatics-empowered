const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route template
 */

router.post('/', (req, res) => {
    const sqlText = `INSERT INTO "stories" ("name", "location", "title", "aquatic_therapist", "message", "email", "category_id", "flagged")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`
    const values = [req.body.name, req.body.location, req.body.title, req.body.aquatic_therapist, req.body.message, req.body.email, req.body.category_id, req.body.flagged];
    console.log(req.body.message)
    pool.query(sqlText, values)
        .then((results) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error with post', error);
            res.sendStatus(500);
        });
});
module.exports = router;