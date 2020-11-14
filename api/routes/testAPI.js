var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {   
    quickstart();
    res.send('API is working properly - GCloud here');
});

async function quickstart() {
    // Imports the Google Cloud client libraries
    const vision = require('@google-cloud/vision');
    const fs = require('fs');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    const fileName = './../client/public/imgs/battery.jpg';

    // Performs label detection on the image file
    const [result] = await client.labelDetection(fileName);
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
}

module.exports = router;