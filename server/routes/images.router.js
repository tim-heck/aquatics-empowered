const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/:id', (req, res) => {
    const sqlText = `
        SELECT * FROM images WHERE story_id = $1;`;
    pool.query(sqlText, [req.params.id]).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
})

module.exports = router;