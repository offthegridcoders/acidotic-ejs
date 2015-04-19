var Express = require('express');
var Router = Express.Router();
var Firebase = require('firebase');
var FireBaseRef = new Firebase('https://acidotic.firebaseio.com/');
var AllData = {};
var SessionAuth;
var Defaults = {};
var Sponsors;

// INITIALLY loads data into global variable
  FireBaseRef.child('defaultseason/').on('value', function(snapshot) {
    Defaults.season = snapshot.val();
  });

  FireBaseRef.child('events/').on('value', function(snapshot) {
    AllData = snapshot.val();
  });

  FireBaseRef.child('sponsors/').on('value', function(snapshot) {
    Sponsors = snapshot.val();
  });

// ADMIN
  function getAdminPageData(eventData) {
    var fbData = {};
    fbData.title = 'Admin Dashboard - acidotic Racing';
    fbData.season = Defaults.season;
    fbData.data = AllData;
    fbData.page = 'Admin';
    // starting event edit data (false or value)
    fbData.event = eventData;
    fbData.sponsors = Sponsors;
    fbData.Session = SessionAuth;
    return fbData;
  };

  function goToAdminHome(res, startingData) {
    var data = getAdminPageData(startingData);
    return res.render('pages/admin/admin', data);
  };

  function errorReport(error) {
    if (error) {
      console.log("Data could not be saved." + error);
    } else {
      console.log("Data saved successfully.");
    }
  };

  Router.get('/admin', function(req, res, next) {
    if (SessionAuth) {
      // if authenticated - go to admin homepage
      goToAdminHome(res, false);
    } else {
      // navigate to regular homepage
      return res.render('pages/seasons/winter', getHomePageData());
    }
  });

  Router.post('/admin', function(req, res){
    return res.render('pages/admin/admin', getAdminPageData(JSON.parse(req.body.eventChoice)));
  });

  Router.post('/update-event', function(req, res){
    var season = req.body.season;
    var curEvent = req.body.key;
    var fbRef = FireBaseRef.child("events/" + season + '/' + curEvent);
    fbRef.update(req.body, function(error) {errorReport(error)});
    goToAdminHome(res, false);
  });

  Router.post('/update-details', function(req, res){
    var season = req.body.season;
    var curEvent = req.body.eventKey;
    var key = req.body.key;
    var fbURL = "events/" + season + '/' + curEvent + '/details/' + key;
    var fbRef = FireBaseRef.child(fbURL);
    fbRef.update(req.body, function(error) {
      errorReport(error)
    });

    goToAdminHome(res, false);
  });

  Router.post('/remove-detail', function(req, res){
    var season = req.body.season;
    var curEvent = req.body.eventKey;
    var key = req.body.key;
    var fbURL = "events/" + season + '/' + curEvent + '/details/' + key;
    var fbRef = FireBaseRef.child(fbURL);
    fbRef.remove();
    goToAdminHome(res, false);
  });

  Router.post('/new-detail', function(req, res){
    var season = req.body.season;
    var curEvent = req.body.eventKey;
    var key = req.body.key;
    key = parseInt(key) + 1;
    var fbURL = "events/" + season + '/' + curEvent + '/details/' + key;
    var fbRef = FireBaseRef.child(fbURL);
    var newData = {
      copy: req.body.copy,
      title: req.body.title,
      image: req.body.image,
    };

    fbRef.set(newData, function(error) {
      errorReport(error)
    });

    goToAdminHome(res, false);
  });

  Router.post('/add-map', function(req, res){
    var season = req.body.season;
    var curEvent = req.body.eventKey;
    var key = req.body.key;
    var fbURL = "events/" + season + '/' + curEvent + '/coursemaps/' + key;
    var fbRef = FireBaseRef.child(fbURL);
    var newData = {
      image: req.body.image,
      thumb: req.body.thumb,
    };

    fbRef.set(newData, function(error) {
      errorReport(error)
    });

    goToAdminHome(res, false);
  });

  Router.post('/remove-map', function(req, res){
    var season = req.body.season;
    var curEvent = req.body.eventKey;
    var key = req.body.key;
    var fbURL = "events/" + season + '/' + curEvent + '/coursemaps/' + key;
    var fbRef = FireBaseRef.child(fbURL);
    fbRef.remove();
    goToAdminHome(res, false);
  });

  Router.post('/move-blurb-down-form', function(req, res){
    var season = req.body.season;
    var curEvent = req.body.eventKey;
    var key = req.body.key;
    var key2 = parseInt(key) + 1;

    var firstVal, secondVal;

    var fbURLFirst = "events/" + season + '/' + curEvent + '/details/' + key;
    var fbRef = FireBaseRef.child(fbURLFirst);
    fbRef.once('value', function(snapshot) {
      firstVal  = snapshot.val();
    });

    var fbURLSecond = "events/" + season + '/' + curEvent + '/details/' + key2;
    var fbRef2 = FireBaseRef.child(fbURLSecond);
    fbRef2.once('value', function(snapshot) {
      secondVal  = snapshot.val();
    });

    fbRef.update(secondVal, function(error) {
      errorReport(error)
    });

    fbRef2.update(firstVal, function(error) {
      errorReport(error)
    });

    goToAdminHome(res, false);
  });

  Router.post('/move-blurb-up-form', function(req, res){
    var season = req.body.season;
    var curEvent = req.body.eventKey;
    var key = req.body.key;
    var key2 = parseInt(key) - 1;

    var firstVal, secondVal;

    var fbURLFirst = "events/" + season + '/' + curEvent + '/details/' + key;
    var fbRef = FireBaseRef.child(fbURLFirst);
    fbRef.once('value', function(snapshot) {
      firstVal  = snapshot.val();
    });

    var fbURLSecond = "events/" + season + '/' + curEvent + '/details/' + key2;
    var fbRef2 = FireBaseRef.child(fbURLSecond);
    fbRef2.once('value', function(snapshot) {
      secondVal  = snapshot.val();
    });

    fbRef.update(secondVal, function(error) {
      errorReport(error)
    });

    fbRef2.update(firstVal, function(error) {
      errorReport(error)
    });

    goToAdminHome(res, false);
  });

  Router.post('/update-sponsor', function(req, res){
    var key = req.body.key;
    var fbURL = "sponsors/" + key;
    var fbRef = FireBaseRef.child(fbURL);
    var newData = {
      image: req.body.image,
      link: req.body.link,
    };

    fbRef.update(newData, function(error) {
      errorReport(error)
    });

    goToAdminHome(res, false);
  });

  Router.post('/remove-sponsor', function(req, res){
    var key = req.body.key;
    var fbURL = "sponsors/" + key;
    var fbRef = FireBaseRef.child(fbURL);

    fbRef.remove();
    goToAdminHome(res, false);
  });

  Router.post('/update-default-season', function(req, res){
    var fbURL = "/";
    var fbRef = FireBaseRef.child(fbURL);
    var data = {defaultseason: req.body.defaultSeason};
    fbRef.update(data, function(error) {
      errorReport(error)
    });

    goToAdminHome(res, false);
  });

// LOGIN/LOGOUT
  function logout(res) {
    FireBaseRef.unauth();
    SessionAuth = null;
    // navigate to homepage
    var data = getHomePageData();
    return res.render('pages/seasons/winter', data);
  };
  
  Router.get('/logout', function(req,res) {
    logout(res);
  });

  Router.post('/logout', function(req,res) {
    logout(res);
  });

  Router.get('/login', function(req, res, next) {
    return res.render('pages/admin/login', getAdminPageData(false));
  });

  Router.post('/login', function(req,res) {
    // email    : "admin@acidoticracing.com",
    // password : "RACEacidotic2015!"
    FireBaseRef.authWithPassword({
      email    : req.body.email,
      password : req.body.password
    }, function(error, authData) {
      if (error) {
        // failed authenication
        console.log("Login Failed!", error);
        return res.render('pages/seasons/' + Defaults.season, getHomePageData());
      } else {
        // saves auth data in global var
        SessionAuth = authData;
        console.log("Authenticated successfully with payload:");
        // goes to admin homepage
        goToAdminHome(res, false);
      }
    }, {
      // expires after browser shutdown
      remember: "sessionOnly"
    });
  });

// HOME PAGE
  function getHomePageData() {
    var fbData = {};
    fbData.title = 'Events - acidotic Racing';
    fbData.season = Defaults.season;
    fbData.page = Defaults.season;
    fbData.data = AllData;
    fbData.sponsors = Sponsors;
    fbData.Session = SessionAuth;
    return fbData;
  };

  Router.get('/', function(req, res, next) {
    return res.render('pages/seasons/' + Defaults.season, getHomePageData());
  });

// SEASON PAGES
  function setSeasonData(title, season) {
    var fbData = {};
    fbData.title = title + ' - acidotic Racing';
    fbData.season = season;
    fbData.page = season;
    fbData.data = AllData;
    fbData.sponsors = Sponsors;
    fbData.Session = SessionAuth;
    return fbData
  };

  // WINTER
  Router.get('/winter', function(req, res, next) {
    return res.render('pages/seasons/winter', setSeasonData('Winter Events', 'winter'));
  });

  // SPRING
  Router.get('/spring', function(req, res, next) {
    return res.render('pages/seasons/spring', setSeasonData('Spring Events', 'spring'));
  });

  // SUMMER
  Router.get('/summer', function(req, res, next) {
    return res.render('pages/seasons/summer', setSeasonData('Summer Events', 'summer'));
  });

  // FALL
  Router.get('/fall', function(req, res, next) {
    return res.render('pages/seasons/fall', setSeasonData('Fall Events', 'fall'));
  });

// REGULAR PAGES
  function setRegPageData(title, season, page) {
    var fbData = {};
    fbData.title = title + ' - acidotic Racing';
    fbData.season = season;
    fbData.page = page;
    fbData.data = AllData;
    fbData.sponsors = Sponsors;
    fbData.Session = SessionAuth;
    return fbData
  };
  // ABOUT PAGE
  Router.get('/about', function(req, res, next) {
    return res.render('pages/about', setRegPageData('About', 'fall', 'about'));
  });

  // CONTACT PAGE
  Router.get('/contact', function(req, res, next) {
    return res.render('pages/contact', setRegPageData('Contact', 'fall', 'contact'));
  });

// SINGLE EVENTS
  function setSingleEventData(title, season, data, eventName) {
    var fbData = {};
    fbData.title = title + ' - acidotic Racing';
    fbData.season = season;
    fbData.page = season;
    fbData.data = data;
    fbData.event = eventName;
    fbData.sponsors = Sponsors;
    fbData.Session = SessionAuth;
    return fbData;
  };

  // SIDEHILLER SNOWSHOE
  Router.get('/sidehiller-snowshoe', function(req, res, next) {
    var data = setSingleEventData(AllData.winter.sidehillerSnowshoe.title,
      'winter', AllData, AllData.winter.sidehillerSnowshoe);
    return res.render('pages/single-event', data);
  });

  // KINGMAN FARM
  Router.get('/kingman-farm', function(req, res, next) {
    var data = setSingleEventData(AllData.winter.kingmanFarm.title,
      'winter', AllData, AllData.winter.kingmanFarm);
    return res.render('pages/single-event', data);
  });

  // SNOWSHOE HULLABALOO
  Router.get('/snowshoe-hullabaloo', function(req, res, next) {
    var data = setSingleEventData(AllData.winter.snowshoeHullabaloo.title,
      'winter', AllData, AllData.winter.snowshoeHullabaloo);
    return res.render('pages/single-event', data);
  });

  // SNOWSHOE CHAMPIONSHIP
  Router.get('/snowshoe-championship', function(req, res, next) {
    var data = setSingleEventData(AllData.winter.snowshoeChampionship.title,
      'winter', AllData, AllData.winter.snowshoeChampionship);
    return res.render('pages/single-event', data);
  });

  // RALPH WALDO
  Router.get('/ralph-waldo', function(req, res, next) {
    var data = setSingleEventData(AllData.spring.ralphWaldo.title,
      'spring', AllData, AllData.spring.ralphWaldo);
    return res.render('pages/single-event', data);
  });

  // EXETER TRAIL RACE
  Router.get('/exeter-trail', function(req, res, next) {
    var data = setSingleEventData(AllData.spring.exeterTrail.title,
      'spring', AllData, AllData.spring.exeterTrail);
    return res.render('pages/single-event', data);
  });

  // LOON MOUNTAIN RACE
  Router.get('/loon-mountain-race', function(req, res, next) {
    var data = setSingleEventData(AllData.summer.loonMountainRace.title,
      'summer', AllData, AllData.summer.loonMountainRace);
    // return res.render('pages/loon-mountain-race', data);
    return res.render('pages/single-event', data);
  });

  // KINGMAN FARM TRAIL RACE
  Router.get('/kingman-farm-trail-race', function(req, res, next) {
    var data = setSingleEventData(AllData.summer.kingmanFarmTrailRace.title,
      'summer', AllData, AllData.summer.kingmanFarmTrailRace);
    return res.render('pages/single-event', data);
  });

  // HARMONY HILL SUMMER XC SERIES
  Router.get('/harmony-hill', function(req, res, next) {
    var data = setSingleEventData(AllData.summer.harmonyHill.title,
      'summer', AllData, AllData.summer.harmonyHill);
    return res.render('pages/single-event', data);
  });

  // BRETTON WOODS FELL RACE
  Router.get('/bretton-woods', function(req, res, next) {
    var data = setSingleEventData(AllData.fall.brettonWoods.title,
      'fall', AllData, AllData.fall.brettonWoods);
    return res.render('pages/single-event', data);
  });

  // VULCANS FURY
  Router.get('/vulcans-fury', function(req, res, next) {
    var data = setSingleEventData(AllData.fall.vulcansFury.title,
      'fall', AllData, AllData.fall.vulcansFury);
    return res.render('pages/single-event', data);
  });

  // ROARING FALLS
  Router.get('/roaring-falls', function(req, res, next) {
    var data = setSingleEventData(AllData.fall.roaringFalls.title,
      'fall', AllData, AllData.fall.roaringFalls);
    return res.render('pages/single-event', data);
  });

module.exports = Router;
