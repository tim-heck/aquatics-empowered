const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

require('dotenv').load();
require('dotenv').config();

let AWS = require('aws-sdk');
let credentials = {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY
};
AWS.config.update({ credentials: credentials, region: 'us-east-2' });
let s3 = new AWS.S3();

let presignedGETURL = s3.getSignedUrl('getObject', {
    Bucket: 'htfh',
    Key: 'aquatic.jpg', //filename
    Expires: 100 //time to expire in seconds
});

let presignedPUTURL = s3.getSignedUrl('putObject', {
    Bucket: 'htfh',
    Key: '/Users/mollyellison/Desktop/aquatic.jpg', //filename
    Expires: 100 //time to expire in seconds
});

console.log(presignedPUTURL);

