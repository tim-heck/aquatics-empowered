const express = require('express');
const pool = require('../modules/pool');
const aws = require('../modules/aws');

const router = express.Router();

router.get('/:id', async (req, res) => {
    const sqlText = `
        SELECT * FROM images WHERE story_id = $1;`;
    try {
        const response = await pool.query(sqlText, [req.params.id]);
        for (let i = 0; i < response.rows.length; i++) {
            response.rows[i].getUrl = aws.getPresignedGetUrl(response.rows[i].img_link);
        }
        res.send(response.rows);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;