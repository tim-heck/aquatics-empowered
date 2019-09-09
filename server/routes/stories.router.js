const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route for all stoies with the category and featured image (if there is one)
 * Featured image will be NULL if one does not exist
 */
router.get('/', (req, res) => {
    const sqlText = `
        SELECT stories.id, stories.name, stories.location, stories.title, stories.aquatic_therapist, 
        stories.message, stories.email, stories.category_id, stories.flagged, categories.category, images.img_link
        FROM stories
        JOIN categories ON stories.category_id = categories.id
        LEFT JOIN images ON images.story_id = stories.id AND featured_img = true
        ORDER BY id ASC;`;
    pool.query(sqlText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
})

router.get('/filter/:category', (req, res) => {
    console.log('category', req.params.category);
    const sqlText = `
        SELECT stories.id, stories.name, stories.location, stories.title, stories.aquatic_therapist, 
        stories.message, stories.email, categories.category, images.img_link
        FROM stories
        JOIN categories ON stories.category_id = categories.id
        LEFT JOIN images ON images.story_id = stories.id AND featured_img = true
        WHERE categories.category = $1;`;
    // snippet got capitalizing the first letter of each word found here
    // https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
    const categoryToCheck = req.params.category.replace(/_/g, ' ').split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    console.log(categoryToCheck);
    pool.query(sqlText, [categoryToCheck]).then(result => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
})


// GET route for search function

router.get(`/search`, (req, res) =>{

    const searchQuery = req.query;
    
    console.log(req.query);
    
    const sqlText = `
        SELECT stories.id, stories.name, stories.location, stories.title, stories.aquatic_therapist, 
        stories.message, stories.email, categories.category, images.img_link
        FROM stories
        JOIN categories ON stories.category_id = categories.id
        LEFT JOIN images ON images.story_id = stories.id AND featured_img = true
        WHERE categories.category ILIKE '% $1 %' OR
        stories.title ILIKE '% $1 %' OR
        stories.name ILIKE '% $1 %' OR
        stories.location ILIKE '% $1 %' OR
        stories.message ILIKE '% $1 %';`;
})

// GET route for getting all stories that are flagged by users
router.get('/flagged', (req, res) => {
    const sqlText = `
        SELECT stories.id, stories.name, stories.location, stories.title, stories.aquatic_therapist, 
        stories.message, stories.email, stories.category_id, stories.flagged, categories.category, images.img_link
        FROM stories
        JOIN categories ON stories.category_id = categories.id
        LEFT JOIN images ON images.story_id = stories.id AND featured_img = true 
        WHERE "flagged" = true`;
    pool.query(sqlText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
})

/**
 * DELETE route for deleting a specific story
 * Removes a specific story based on the id
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `DELETE FROM stories WHERE id = $1;`;
    pool.query(sqlText, [req.params.id]).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
})

/**
 * PUT route for flagging a specific story
 * Flags a specific story based on the id
 */
router.put('/flag/:id', (req, res) => {
    const sqlText = `UPDATE stories SET flagged = true WHERE id = $1;`;
    pool.query(sqlText, [req.params.id]).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
})

// POST route for adding a story to the app
router.post('/share', (req, res) => {
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

// PUT route for adding a story to the app
router.put('/update/:id', (req, res) => {
    const sqlText = `
        UPDATE "stories" 
        SET "name" = $1, "location" = $2, "title" = $3, "aquatic_therapist" = $4, "message" = $5, "email" = $6, "category_id" = $7, "flagged" = false
        WHERE "id" = $8;`
    const values = [
        req.body.name, 
        req.body.location, 
        req.body.title, 
        req.body.aquatic_therapist, 
        req.body.message, 
        req.body.email, 
        req.body.category_id,
        req.params.id
    ];
    pool.query(sqlText, values)
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error with post', error);
            res.sendStatus(500);
        });
});

module.exports = router;