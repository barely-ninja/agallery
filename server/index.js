const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const app = express();

app.use(express.static('../client/build/static'));

app.engine('html', es6Renderer);
app.set('views', '../client/build');
app.set('view engine', 'html');

app.get('/upload', function(req, res) {
  res.render('index', {locals: {bundle: 'js/bundle-upload.js'}});
});

app.get('/review', function(req, res) {
  res.render('index', {locals: {bundle: 'js/bundle-review.js'}});
});

const server = app.listen(4000);