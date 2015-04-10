var express = require('express');
var router = express.Router();
var Firebase = require('firebase');
var fbRef = new Firebase('https://acidotic.firebaseio.com/');
var fbData;

var defaultSeason = 'winter';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'acidotic Racing',
    season: defaultSeason});
});

router.get('/winter', function(req, res, next) {
  res.render('pages/seasons/winter', {
    title: 'Winter Events - acidotic Racing',
    season: 'winter'});
});

router.get('/spring', function(req, res, next) {
  res.render('pages/seasons/spring', {
    title: 'Spring Events - acidotic Racing',
    season: 'spring'});
});

router.get('/summer', function(req, res, next) {
  res.render('pages/seasons/summer', {
    title: 'Summer Events - acidotic Racing',
    season: 'summer'});
});

router.get('/fall', function(req, res, next) {
  res.render('pages/seasons/fall', {
    title: 'Fall Events - acidotic Racing',
    season: 'fall'});
});


router.get('/about', function(req, res, next) {
  res.render('pages/about', {
    title: 'About - acidotic Racing',
    season: 'fall',
    page: 'about'});
});

router.get('/contact', function(req, res, next) {
  res.render('pages/contact', {
    title: 'Contact - acidotic Racing',
    season: 'fall',
    page: 'contact'});
});

router.get('/event', function(req, res, next) {
  fbRef.child('events/summer/10').on('value', function(snapshot) {
    fbData = snapshot.val();
  });
  res.render('pages/single-event', fbData);
});

module.exports = router;
