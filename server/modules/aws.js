require('dotenv').load();
require('dotenv').config();

let AWS = require('aws-sdk');
let credentials = {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY
};

AWS.config.update({ credentials: credentials, region: 'us-east-2' });
let s3 = new AWS.S3();


module.exports = {
    getPresignedGetUrl: function (image_name) {
        let presignedGETURL = s3.getSignedUrl('getObject', {
            Bucket: 'htfh',
            Key: image_name, //filename
            Expires: 100 //time to expire in seconds
        });
        return presignedGETURL;
    },

    getPresignedPutUrl: function (image_name) {
        let presignedPUTURL = s3.getSignedUrl('putObject', {
            Bucket: 'htfh',
            Key: image_name, //filename
            Expires: 100 //time to expire in seconds
        });
        return presignedPUTURL;
    }
}