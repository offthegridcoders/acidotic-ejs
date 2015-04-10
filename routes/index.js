var express = require('express');
var router = express.Router();
var Firebase = require('firebase');
var fbRef = new Firebase('https://acidotic.firebaseio.com/');

var defaultSeason = 'winter';

// HOME PAGE
router.get('/', function(req, res, next) {
  res.render('pages/seasons/winter', {
    title: 'Winter Events - acidotic Racing',
    season: 'winter'});
});


// SEASON PAGES
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

// ABOUT PAGE
router.get('/about', function(req, res, next) {
  res.render('pages/about', {
    title: 'About - acidotic Racing',
    season: 'fall',
    page: 'about'});
});

// CONTACT PAGE
router.get('/contact', function(req, res, next) {
  res.render('pages/contact', {
    title: 'Contact - acidotic Racing',
    season: 'fall',
    page: 'contact'});
});

// WINTER EVENTS
router.get('/sidehiller-snowshoe', function(req, res, next) {
  fbRef.child('events/winter/1').on('value', function(snapshot) {
    return res.render('pages/single-event', snapshot.val());
  });
});

router.get('/kingman-farm', function(req, res, next) {
  fbRef.child('events/winter/2').on('value', function(snapshot) {
    return res.render('pages/single-event', snapshot.val());
  });
});

router.get('/snowshoe-hullabaloo', function(req, res, next) {
  fbRef.child('events/winter/3').on('value', function(snapshot) {
    return res.render('pages/single-event', snapshot.val());
  });
});

router.get('/snowshoe-championship', function(req, res, next) {
  fbRef.child('events/winter/4').on('value', function(snapshot) {
    return res.render('pages/single-event', snapshot.val());
  });
});

// SPRING EVENTS
router.get('/ralph-waldo', function(req, res, next) {
  fbRef.child('events/spring/6').on('value', function(snapshot) {
    return res.render('pages/single-event', snapshot.val());
  });
});

router.get('/exeter-trail', function(req, res, next) {
  fbRef.child('events/spring/7').on('value', function(snapshot) {
    return res.render('pages/single-event', snapshot.val());
  });
});

// SUMMER EVENTS

router.get('/loon-mountain-race', function(req, res, next) {
  fbRef.child('events/summer/8').on('value', function(snapshot) {
    return res.render('pages/single-event', snapshot.val());
  });
});

router.get('/kingman-farm-trail-race', function(req, res, next) {
  fbRef.child('events/summer/10').on('value', function(snapshot) {
    return res.render('pages/single-event', snapshot.val());
  });
});

router.get('/harmony-hill', function(req, res, next) {
  fbRef.child('events/summer/11').on('value', function(snapshot) {
    return res.render('pages/single-event', snapshot.val());
  });
});

// FALL EVENTS

router.get('/bretton-woods', function(req, res, next) {
  fbRef.child('events/fall/12').on('value', function(snapshot) {
    return res.render('pages/single-event', snapshot.val());
  });
});

router.get('/vulcans-fury', function(req, res, next) {
  fbRef.child('events/fall/13').on('value', function(snapshot) {
    return res.render('pages/single-event', snapshot.val());
  });
});

router.get('/roaring-falls', function(req, res, next) {
  fbRef.child('events/fall/14').on('value', function(snapshot) {
    return res.render('pages/single-event', snapshot.val());
  });
});

module.exports = router;
