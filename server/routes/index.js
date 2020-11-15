const express = require('express');
const router = express.Router();
const path = require('path');

const app = express();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.use(express.static(path.join(__dirname,'../client/src')));

router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
  // res.sendFile(path.join(__dirname, '../../client/src', 'index.js'));
});


app.listen(process.env.PORT || 8080);

module.exports = router;
