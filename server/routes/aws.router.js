const express = require('express');
const router = express.Router();
const aws = require('../modules/aws');

router.get('/presignedGETURL/:image_name', (req, res) => {
    try {
        res.send(aws.getPresignedGetUrl(req.params.image_name));
    } catch (error) {
        console.log('error when getting presignedGETUrl from aws', error);
    }
});

router.get('/presignedPUTURL/:image_name', (req, res) => {
    try {
        res.send(aws.getPresignedPutUrl(req.params.image_name));
    } catch (error) {
        console.log('error when getting presignedPUTUrl from aws', error);
    }
})

module.exports = router;