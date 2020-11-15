const express = require('express');
const router = express.Router();
const path = require('path');
// const React = require('react');
// const renderToString = require('react-dom/server');

const app = express();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.use(express.static(path.join(__dirname,'../client/src')));

router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
  // res.sendFile(path.join(__dirname, '../../client/src', 'index.js'));
//   const theHtml = `
//     <html>
//     <head><title>My First SSR</title></head>
//     <body>
//     <h1>My First Server Side Render</h1>
//     <div id="reactele">{{{reactele}}}</div>
//     <script src="/app.js" charset="utf-8"></script>
//     <script src="/vendor.js" charset="utf-8"></script>
//     </body>
//     </html>
//     `;
// res.send(theHtml);

  // const appString = renderToString(<App />);

  // res.send(template({
  //   body: appString,
  //   title: 'Hello World from the server'
  // }));
});


app.listen(process.env.PORT || 8080);

module.exports = router;
