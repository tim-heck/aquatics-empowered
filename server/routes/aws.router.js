const express = require('express');
const router = express.Router();
const aws = require('../modules/aws');

router.get('/presignedGETURL/:image_name', (req, res) => {
    res.send(aws.getPresignedGetUrl(req.params.image_name));
});

router.get('/presignedPUTURL/:image_name', (req, res) => {
    res.send(aws.getPresignedPutUrl(req.params.image_name));
})

module.exports = router;