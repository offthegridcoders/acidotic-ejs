var express = require('express');
var router = express.Router();
var Firebase = require('firebase');
var fbRef = new Firebase('https://acidotic.firebaseio.com/');
var allData = {};
var defaultSeason = 'winter';

fbRef.child('events/').on('value', function(snapshot) {
  allData = snapshot.val();
});

// HOME PAGE
  router.get('/', function(req, res, next) {
    var fbData = {};
    fbData.title = 'Winter Events - acidotic Racing';
    fbData.season = 'winter';
    fbData.data = allData;
    return res.render('pages/seasons/winter', fbData);
  });

// SEASON PAGES
  router.get('/winter', function(req, res, next) {
    var fbData = {};
    fbData.title = 'Winter Events - acidotic Racing';
    fbData.season = 'winter';
    fbData.data = allData;
    return res.render('pages/seasons/winter', fbData);
  });

  router.get('/spring', function(req, res, next) {
    var fbData = {};
    fbData.title = 'Spring Events - acidotic Racing';
    fbData.season = 'spring';
    fbData.data = allData;
    return res.render('pages/seasons/spring', fbData);
  });

  router.get('/summer', function(req, res, next) {
    var fbData = {};
    fbData.title = 'Summer Events - acidotic Racing';
    fbData.season = 'summer';
    fbData.data = allData;
    return res.render('pages/seasons/summer', fbData);
  });

  router.get('/fall', function(req, res, next) {
    var fbData = {};
    fbData.title = 'Fall Events - acidotic Racing';
    fbData.season = 'fall';
    fbData.data = allData;
    return res.render('pages/seasons/fall', fbData);
  });

// ABOUT PAGE
  router.get('/about', function(req, res, next) {
    var fbData = {};
    fbData.title = 'About - acidotic Racing';
    fbData.season = 'fall';
    fbData.page = 'about';
    fbData.data = allData;
    return res.render('pages/about', fbData);
  });

// CONTACT PAGE
  router.get('/contact', function(req, res, next) {
    var fbData = {};
    fbData.title = 'Contact - acidotic Racing';
    fbData.season = 'fall';
    fbData.page = 'contact';
    fbData.data = allData;
    return res.render('pages/contact', fbData);
  });

// SINGLE EVENTS
  router.get('/sidehiller-snowshoe', function(req, res, next) {
    var fbData = {};
    fbData.title = 'Winter Events - acidotic Racing';
    fbData.season = 'winter';
    fbData.data = allData;
    fbData.event = allData.winter.sidehillerSnowshoe;
    return res.render('pages/single-event', fbData);
  });

  router.get('/kingman-farm', function(req, res, next) {
    var fbData = {};
    fbData.title = 'Winter Events - acidotic Racing';
    fbData.season = 'winter';
    fbData.data = allData;
    fbData.event = allData.winter.kingmanFarm;
    return res.render('pages/single-event', fbData);
  });

  router.get('/snowshoe-hullabaloo', function(req, res, next) {
    var fbData = {};
    fbData.title = 'Winter Events - acidotic Racing';
    fbData.season = 'winter';
    fbData.data = allData;
    fbData.event = allData.winter.snowshoeHullabaloo;
    return res.render('pages/single-event', fbData);
  });

  router.get('/snowshoe-championship', function(req, res, next) {
    var fbData = {};
    fbData.title = 'Winter Events - acidotic Racing';
    fbData.season = 'winter';
    fbData.data = allData;
    fbData.event = allData.winter.snowshoeChampionship;
    return res.render('pages/single-event', fbData);
  });

  router.get('/ralph-waldo', function(req, res, next) {
    var fbData = {};
    fbData.title = 'Spring Events - acidotic Racing';
    fbData.season = 'spring';
    fbData.data = allData;
    fbData.event = allData.spring.ralphWaldo;
    return res.render('pages/single-event', fbData);
  });

  router.get('/exeter-trail', function(req, res, next) {
    var fbData = {};
    fbData.title = 'Spring Events - acidotic Racing';
    fbData.season = 'spring';
    fbData.data = allData;
    fbData.event = allData.spring.exeterTrail;
    return res.render('pages/single-event', fbData);  });

  router.get('/loon-mountain-race', function(req, res, next) {
    var fbData = {};
    fbData.title = 'Summer Events - acidotic Racing';
    fbData.season = 'summer';
    fbData.data = allData;
    fbData.event = allData.summer.loonMountainRace;
    return res.render('pages/single-event', fbData);
  });

  router.get('/kingman-farm-trail-race', function(req, res, next) {
    var fbData = {};
    fbData.title = 'Summer Events - acidotic Racing';
    fbData.season = 'summer';
    fbData.data = allData;
    fbData.event = allData.summer.kingmanFarmTrailRace;
    return res.render('pages/single-event', fbData);
  });

  router.get('/harmony-hill', function(req, res, next) {
    var fbData = {};
    fbData.title = 'Summer Events - acidotic Racing';
    fbData.season = 'summer';
    fbData.data = allData;
    fbData.event = allData.summer.harmonyHill;
    return res.render('pages/single-event', fbData);
  });

  router.get('/bretton-woods', function(req, res, next) {
    var fbData = {};
    fbData.title = 'Fall Events - acidotic Racing';
    fbData.season = 'fall';
    fbData.data = allData;
    fbData.event = allData.fall.brettonWoods;
    return res.render('pages/single-event', fbData);
  });

  router.get('/vulcans-fury', function(req, res, next) {
    var fbData = {};
    fbData.title = 'Fall Events - acidotic Racing';
    fbData.season = 'fall';
    fbData.data = allData;
    fbData.event = allData.fall.vulcansFury;
    return res.render('pages/single-event', fbData);
  });

  router.get('/roaring-falls', function(req, res, next) {
    var fbData = {};
    fbData.title = 'Fall Events - acidotic Racing';
    fbData.season = 'fall';
    fbData.data = allData;
    fbData.event = allData.fall.roaringFalls;
    return res.render('pages/single-event', fbData);
  });

module.exports = router;
