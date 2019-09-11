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
        ORDER BY post_date ASC;`;
    pool.query(sqlText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
})

// GET route for getting filtered stories
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
router.get(`/search`, (req, res) => {
// establish an array to store values to be used to query database    
    let values = [];
// declare queryString variable by using Object.entries() method to mutate req.query to array of arrays    
    let queryString = Object.entries(req.query);
// loop through array of arrays and find values at index of queryString words 
// interior array holds key:value pair array entries, which will be used to search database
    for (let i = 0; i < queryString.length; i++) {
        if (queryString[i][1] !== '') {
            values.push(`%${queryString[i][1]}%`)
        }
    }
    // console.log(values);

// First we establish base sql query here; 
// this which will be appended onto for each key:value pair (q1: entered search keyword)

    let sqlText = `
        SELECT stories.id, stories.name, stories.location, stories.title, stories.aquatic_therapist, 
        stories.message, stories.email, categories.category, images.img_link
        FROM stories
        JOIN categories ON stories.category_id = categories.id
        LEFT JOIN images ON images.story_id = stories.id AND featured_img = true
        `;
// Loop through the queryString (entered search words on client-side)
// concat. on additional sql query text for each word searched (separated by spaces, breaking at a space without proceeding character)
    for (let i = 1; i < queryString.length + 1; i++) {
        if (i < 2) {
            sqlText += `
                WHERE categories.category ILIKE $${i} OR
                stories.title ILIKE $${i} OR
                stories.name ILIKE $${i} OR
                stories.location ILIKE $${i} OR
                stories.message ILIKE $${i}`;
        } else {
            sqlText += ` 
                OR categories.category ILIKE $${i} OR
                stories.title ILIKE $${i} OR
                stories.name ILIKE $${i} OR
                stories.location ILIKE $${i} OR
                stories.message ILIKE $${i}`;
        }
    }
// once the loop hits else clause and breaks, we concat. on the ending semi-colon

    sqlText += `;`;

    pool.query(sqlText, values).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('error with server side of database search function', error);
        res.sendStatus(500);
    })
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

// PUT route for updating a story on the app. Targets story by its id.
router.put('/update/:id', rejectUnauthenticated, (req, res) => {
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