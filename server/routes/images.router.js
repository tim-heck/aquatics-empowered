const express = require('express');
const pool = require('../modules/pool');
const aws = require('../modules/aws');

const router = express.Router();

/**
 * GET route for all images for a specific story
 */
router.get('/:id', async (req, res) => {
    const sqlText = `
        SELECT * FROM images WHERE story_id = $1;`;
    try {
        const response = await pool.query(sqlText, [req.params.id]);
        // Adds the getUrl property to the object passed back
        // along with the presignedGETUrl value
        for (let i = 0; i < response.rows.length; i++) {
            response.rows[i].getUrl = aws.getPresignedGetUrl(response.rows[i].img_link);
        }
        res.send(response.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

/**
 * DELETE route for removing a specific image from the database
 */
router.delete('/:id', (req, res) => {
    const sqlText = `DELETE FROM images WHERE id = $1;`;
    pool.query(sqlText, [req.params.id]).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error when deleting image', error);
        res.sendStatus(500);
    })
})

module.exports = router;