var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('API is working properly - GCloud here');
});

module.exports = router;