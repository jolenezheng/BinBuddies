var express = require('express');
const { response } = require('../app');
var router = express.Router();

router.get('/', function(req, res, next) {   
    quickstart().then(response => {
        let jsonObj = {
            'obj': 'container',
        }
        jsonObj.obj = response;
        res.send(
            jsonObj
        )
    })
});

async function quickstart() {
    // Imports the Google Cloud client libraries
    const vision = require('@google-cloud/vision');
    const fs = require('fs');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    const fileName = './../client/src/imgs/photo.jpg';

    // Performs label detection on the image file
    const [result] = await client.labelDetection(fileName);
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
    return labels[0].description;
}

module.exports = router;