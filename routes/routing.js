var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HOME' });
});


/* SITES */
router.get('/blank', function(req, res, next) {
  res.render('blank', { title: 'BLANK' });
});

router.get('/events', function(req, res, next) {
  res.render('events', { title: 'EVENTS' });
});

router.get('/impressum', function(req, res, next) {
  res.render('impressum', { title: 'IMPRESSUM' });
});

router.get('/streams', function(req, res, next) {
  res.render('streams', { title: 'STREAMS' });
});

router.get('/umfragen', function(req, res, next) {
  res.render('umfragen', { title: 'UMFRAGEN' });
});

router.get('/join', function(req, res, next) {
  res.render('join', { title: 'JOIN' });
});

router.get('/todo', function(req, res, next) {
  res.render('todo', { title: 'TODO' });
});



/* TEST */

router.get('/test/:id', function(req, res, next) {
  res.render('test', { title: 'Test', output: req.params.id });
});

router.post('/test/submit', function(req, res, next) {
  var id = req.body.id;
  res.redirect('/test/' + id);
});



/* DO NOT DELETE THIS :) */
module.exports = router;
