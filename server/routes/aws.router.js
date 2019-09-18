const express = require('express');
const router = express.Router();
const aws = require('../modules/aws');

/**
 * GET route for an single image
 * The image name is passed via params from the get request from the client
 */
router.get('/presignedGETURL/:image_name', (req, res) => {
    try {
        // sends back the presignedGETUrl to access the image in the S3 bucket
        res.send(aws.getPresignedGetUrl(req.params.image_name));
    } catch (error) {
        console.log('error when getting presignedGETUrl from aws', error);
    }
});

/**
 * PUT route for an single image
 * The image name is passed via params from the put request from the client
 */
router.get('/presignedPUTURL/:image_name', (req, res) => {
    try {
        // sends back the presignedPUTUrl to upload the image in the S3 bucket
        res.send(aws.getPresignedPutUrl(req.params.image_name));
    } catch (error) {
        console.log('error when getting presignedPUTUrl from aws', error);
    }
})

module.exports = router;