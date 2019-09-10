const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

require('dotenv').load();
require('dotenv').config();

let AWS = require('aws-sdk');
let credentials = {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY
};

AWS.config.update({ credentials: credentials, region: 'us-east-2' });
let s3 = new AWS.S3();

router.get('/presignedGETURL/:image_name', (req, res) => {
    let presignedGETURL = s3.getSignedUrl('getObject', {
        Bucket: 'htfh',
        Key: req.params.image_name, //filename
        Expires: 100 //time to expire in seconds
    });
    res.send(presignedGETURL);
});

router.get('/presignedPUTURL/:image_name', (req, res) => {
    let presignedPUTURL = s3.getSignedUrl('putObject', {
        Bucket: 'htfh',
        Key: req.params.image_name, //filename
        Expires: 100 //time to expire in seconds
    });
    res.send(presignedPUTURL);
})

module.exports = router;