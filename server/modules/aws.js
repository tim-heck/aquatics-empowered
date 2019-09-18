require('dotenv').load();
require('dotenv').config();

let AWS = require('aws-sdk');
// user's public and secret keys for S3 bucket
// pulled from .env that must be written upon download of project
let credentials = {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY
};

AWS.config.update({ credentials: credentials, region: 'us-east-2' });
let s3 = new AWS.S3();

module.exports = {

    /**
     * Presigned GET Url generated per image
     * Used to grab an image from the S3 bucket via GET request
     * @param {string} image_name name of the image to be uploaded
     */
    getPresignedGetUrl: function (image_name) {
        let presignedGETURL = s3.getSignedUrl('getObject', {
            Bucket: 'htfh', // bucket name
            Key: image_name, // filename
            Expires: 300 // time to expire in seconds
        });
        return presignedGETURL;
    },

    /**
     * Presigned PUT Url generated per image
     * Used to upload/store an image in the S3 bucket via PUT request
     * @param {string} image_name name of the image to be uploaded
     */
    getPresignedPutUrl: function (image_name) {
        let presignedPUTURL = s3.getSignedUrl('putObject', {
            Bucket: 'htfh', // bucket name
            Key: image_name, // filename
            Expires: 300 // time to expire in seconds
        });
        return presignedPUTURL;
    }
}