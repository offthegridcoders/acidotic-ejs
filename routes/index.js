var express = require('express');
var router = express.Router();
var Firebase = require('firebase');
var fbRef = new Firebase('https://acidotic.firebaseio.com/');
var allData = {};
var defaultSeason = 'winter';
var SessionAuth;

fbRef.child('events/').on('value', function(snapshot) {
  allData = snapshot.val();
});

// ADMIN and LOGIN PAGE
  router.get('/login', function(req, res, next) {
      var fbData = {};
      fbData.title = 'Login - acidotic Racing';
      fbData.season = 'winter';
      fbData.data = allData;
      return res.render('pages/admin/login', fbData);
  });

  router.post('/login', function(req,res) {
    // email    : "admin@acidoticracing.com",
    // password : "RACEacidotic2015!"
    fbRef.authWithPassword({
      email    : req.body.email,
      password : req.body.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        SessionAuth = authData;
        console.log("Authenticated successfully with payload:", authData);
        var fbData = {};
        fbData.title = 'Admin Dashboard - acidotic Racing';
        fbData.season = 'winter';
        fbData.data = allData;
        fbData.event = false;
        return res.render('pages/admin/admin', fbData);
      }
    }, {
      // expires after browser shutdown
      remember: "sessionOnly"
    });
  });

  router.post('/logout', function(req,res) {
    fbRef.unauth();
    SessionAuth = null;
    var fbData = {};
    fbData.title = 'Winter Events - acidotic Racing';
    fbData.season = 'winter';
    fbData.data = allData;
    return res.render('pages/seasons/winter', fbData);
  });

  router.get('/admin', function(req, res, next) {
    if (SessionAuth) {
      var fbData = {};
      fbData.title = 'Admin Dashboard - acidotic Racing';
      fbData.season = 'winter';
      fbData.data = allData;
      fbData.event = false;
      return res.render('pages/admin/admin', fbData);
    } else {
      var fbData = {};
      fbData.title = 'Winter Events - acidotic Racing';
      fbData.season = 'winter';
      fbData.data = allData;
      return res.render('pages/seasons/winter', fbData);
    }
  });

  router.post('/admin', function(req, res){
    var fbData = {};
    fbData.title = 'Admin Dashboard - acidotic Racing';
    fbData.season = 'winter';
    fbData.data = allData;
    fbData.event = JSON.parse(req.body.eventChoice);
    return res.render('pages/admin/admin', fbData);
  });

  router.post('/update-event', function(req, res){
    var season = req.body.season;
    var curEvent = req.body.key;
    var usersRef = fbRef.child("events/" + season + '/' + curEvent);
    usersRef.update(req.body, function(error) {
      if (error) {
        console.log("UPDATE DATA FAIL: Data could not be saved." + error);
      } else {
        console.log("UPDATE DATA: Data saved successfully.");
      }
    });

    var fbData = {};
    fbData.title = 'Admin Dashboard - acidotic Racing';
    fbData.season = 'winter';
    fbData.data = allData;
    fbData.event = false;
    return res.render('pages/admin/admin', fbData);
  });


  router.post('/update-details', function(req, res){
    console.log(req.body);
    var season = req.body.season;
    var curEvent = req.body.eventKey;
    var key = req.body.key;
    var fbURL = "events/" + season + '/' + curEvent + '/details/' + key;
    var usersRef = fbRef.child(fbURL);
    usersRef.update(req.body, function(error) {
      if (error) {
        console.log("UPDATE DETAILS FAIL: Data could not be saved." + error);
      } else {
        console.log("UPDATE DETAILS: Data saved successfully.");
      }
    });

    var fbData = {};
    fbData.title = 'Admin Dashboard - acidotic Racing';
    fbData.season = 'winter';
    fbData.data = allData;
    fbData.event = false;
    return res.render('pages/admin/admin', fbData);
  });


  router.post('/remove-detail', function(req, res){
    console.log(req.body);
    var season = req.body.season;
    var curEvent = req.body.eventKey;
    var key = req.body.key;
    var fbURL = "events/" + season + '/' + curEvent + '/details/' + key;
    var usersRef = fbRef.child(fbURL);
    usersRef.remove();
    
    var fbData = {};
    fbData.title = 'Admin Dashboard - acidotic Racing';
    fbData.season = 'winter';
    fbData.data = allData;
    fbData.event = false;
    return res.render('pages/admin/admin', fbData);
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
    fbData.title = allData.winter.sidehillerSnowshoe.title + ' - acidotic Racing';
    fbData.season = 'winter';
    fbData.data = allData;
    fbData.event = allData.winter.sidehillerSnowshoe;
    return res.render('pages/single-event', fbData);
  });

  router.get('/kingman-farm', function(req, res, next) {
    var fbData = {};
    fbData.title = allData.winter.kingmanFarm.title + ' - acidotic Racing';
    fbData.season = 'winter';
    fbData.data = allData;
    fbData.event = allData.winter.kingmanFarm;
    return res.render('pages/single-event', fbData);
  });

  router.get('/snowshoe-hullabaloo', function(req, res, next) {
    var fbData = {};
    fbData.title = allData.winter.snowshoeHullabaloo.title + ' - acidotic Racing';
    fbData.season = 'winter';
    fbData.data = allData;
    fbData.event = allData.winter.snowshoeHullabaloo;
    return res.render('pages/single-event', fbData);
  });

  router.get('/snowshoe-championship', function(req, res, next) {
    var fbData = {};
    fbData.title = allData.winter.snowshoeChampionship.title + ' - acidotic Racing';
    fbData.season = 'winter';
    fbData.data = allData;
    fbData.event = allData.winter.snowshoeChampionship;
    return res.render('pages/single-event', fbData);
  });

  router.get('/ralph-waldo', function(req, res, next) {
    var fbData = {};
    fbData.title = allData.spring.ralphWaldo.title + ' - acidotic Racing';
    fbData.season = 'spring';
    fbData.data = allData;
    fbData.event = allData.spring.ralphWaldo;
    return res.render('pages/single-event', fbData);
  });

  router.get('/exeter-trail', function(req, res, next) {
    var fbData = {};
    fbData.title = allData.spring.exeterTrail.title + ' - acidotic Racing';
    fbData.season = 'spring';
    fbData.data = allData;
    fbData.event = allData.spring.exeterTrail;
    return res.render('pages/single-event', fbData);  });

  router.get('/loon-mountain-race', function(req, res, next) {
    var fbData = {};
    fbData.title = allData.summer.loonMountainRace.title + ' - acidotic Racing';
    fbData.season = 'summer';
    fbData.data = allData;
    fbData.event = allData.summer.loonMountainRace;
    return res.render('pages/single-event', fbData);
  });

  router.get('/kingman-farm-trail-race', function(req, res, next) {
    var fbData = {};
    fbData.title = allData.summer.kingmanFarmTrailRace.title + ' - acidotic Racing';
    fbData.season = 'summer';
    fbData.data = allData;
    fbData.event = allData.summer.kingmanFarmTrailRace;
    return res.render('pages/single-event', fbData);
  });

  router.get('/harmony-hill', function(req, res, next) {
    var fbData = {};
    fbData.title = allData.summer.harmonyHill.title + ' - acidotic Racing';
    fbData.season = 'summer';
    fbData.data = allData;
    fbData.event = allData.summer.harmonyHill;
    return res.render('pages/single-event', fbData);
  });

  router.get('/bretton-woods', function(req, res, next) {
    var fbData = {};
    fbData.title = allData.fall.brettonWoods.title + ' - acidotic Racing';
    fbData.season = 'fall';
    fbData.data = allData;
    fbData.event = allData.fall.brettonWoods;
    return res.render('pages/single-event', fbData);
  });

  router.get('/vulcans-fury', function(req, res, next) {
    var fbData = {};
    fbData.title = allData.fall.vulcansFury.title + ' - acidotic Racing';
    fbData.season = 'fall';
    fbData.data = allData;
    fbData.event = allData.fall.vulcansFury;
    return res.render('pages/single-event', fbData);
  });

  router.get('/roaring-falls', function(req, res, next) {
    var fbData = {};
    fbData.title = allData.fall.roaringFalls.title + ' - acidotic Racing';
    fbData.season = 'fall';
    fbData.data = allData;
    fbData.event = allData.fall.roaringFalls;
    return res.render('pages/single-event', fbData);
  });

module.exports = router;
