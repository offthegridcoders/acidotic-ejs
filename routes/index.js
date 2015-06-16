var Express = require('express');
var Router = Express.Router();
var Firebase = require('firebase');
var FireBaseRef = new Firebase('https://acidotic.firebaseio.com/');
var AllData = {};
var SessionAuth;
var Defaults = {};
var Sponsors;

// Page META Data information

  var meta = {
    homepage: {
      title: 'Events - acidotic Racing',
      description: 'Our mission is to host uncompromisingly excellent events in beautiful locations on challenging courses and to make every competitor feel as though they are important and valuable to us.'
    },
    winter: {
      title: 'Winter Events',
      description: 'Winter Events description'
    },
    spring: {
      title: 'Spring Events',
      description: 'Spring Events description'
    },
    summer: {
      title: 'Summer Events',
      description: 'Summer Events description'
    },
    fall: {
      title: 'Fall Events',
      description: 'Fall Events description'
    },
    about: {
      title: 'About Page',
      description: 'About page description'
    },
    contact: {
      title: 'Contact Title',
      description: 'Contact page description'
    },
    community: {
      title: 'Community Title',
      description: 'Community page description'
    },
    charity: {
      title: 'Charity Title',
      description: 'Charity page description'
    },
    sidehillerSnowshoe: {
      title: 'sidehillerSnowshoe',
      description: 'sidehillerSnowshoe' 
    },
    kingmanFarm: {
      title: 'kingmanFarm',
      description: 'kingmanFarm' 
    },
    snowshoeHullabaloo: {
      title: 'snowshoeHullabaloo',
      description: 'snowshoeHullabaloo' 
    },
    snowshoeChampionship: {
      title: 'snowshoeChampionship',
      description: 'snowshoeChampionship' 
    },
    ralphWaldo: {
      title: 'ralphWaldo',
      description: 'ralphWaldo' 
    },
    exeterTrail: {
      title: 'exeterTrail',
      description: 'exeterTrail' 
    },
    loonMountainRace: {
      title: 'loonMountainRace',
      description: 'loonMountainRace' 
    },
    kingmanFarmTrailRace: {
      title: 'kingmanFarmTrailRace',
      description: 'kingmanFarmTrailRace' 
    },
    harmonyHill: {
      title: 'harmonyHill',
      description: 'harmonyHill' 
    },
    brettonWoods: {
      title: 'brettonWoods',
      description: 'brettonWoods' 
    },
    vulcansFury: {
      title: 'vulcansFury',
      description: 'vulcansFury' 
    },
    roaringFalls: {
      title: 'roaringFalls',
      description: 'roaringFalls' 
    }
  };

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


  function getAdminPageData(eventData) {
    var fbData = {};
    fbData.title = 'Admin Dashboard - acidotic Racing';
    fbData.season = Defaults.season;
    fbData.description = 'Admin Dashboard'
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
        return res.status('401').render('pages/admin/login', getAdminPageData(false));
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
// ADMIN

  Router.get('/admin', function(req, res, next) {
    if (SessionAuth) {
      // if authenticated - go to admin homepage
      goToAdminHome(res, false);
    } else {
      // navigate to regular homepage
      return res.status(401).redirect('/');
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
// HOME PAGE

  function getHomePageData() {
    var fbData = {};
    fbData.title = meta.homepage.title;
    fbData.description = meta.homepage.description;
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
  function setSeasonData(season, title, description) {
    var fbData = {};
    fbData.title = title;
    fbData.description = description;
    fbData.season = season;
    fbData.page = season;
    fbData.data = AllData;
    fbData.sponsors = Sponsors;
    fbData.Session = SessionAuth;
    return fbData
  };

  // WINTER
  Router.get('/winter', function(req, res, next) {
    return res.render('pages/seasons/winter',
      setSeasonData('winter', meta.winter.title, meta.winter.description));
  });

  // SPRING
  Router.get('/spring', function(req, res, next) {
    return res.render('pages/seasons/spring',
      setSeasonData('spring', meta.spring.title, meta.spring.description));
  });

  // SUMMER
  Router.get('/summer', function(req, res, next) {
    return res.render('pages/seasons/summer',
      setSeasonData('summer', meta.summer.title, meta.summer.description));
  });

  // FALL
  Router.get('/fall', function(req, res, next) {
    return res.render('pages/seasons/fall',
      setSeasonData('fall', meta.fall.title, meta.fall.description));
  });
// REGULAR PAGES
  function setRegPageData(season, page, title, description) {
    var fbData = {};
    fbData.title = title;
    fbData.description = description;
    fbData.season = season;
    fbData.page = page;
    fbData.data = AllData;
    fbData.sponsors = Sponsors;
    fbData.Session = SessionAuth;
    return fbData
  };

  // ABOUT PAGE
  Router.get('/about', function(req, res, next) {
    return res.render('pages/about', setRegPageData('fall', 'about', meta.about.title, meta.about.description));
  });

  // CONTACT PAGE
  Router.get('/contact', function(req, res, next) {
    return res.render('pages/contact',
      setRegPageData('fall', 'contact', meta.contact.title, meta.contact.description));
  });

  // COMMUNITY PAGE
  Router.get('/community', function(req, res, next) {
    return res.render('pages/community',
      setRegPageData('winter', 'community', meta.community.title, meta.community.description));
  });

  // COMMUNITY PAGE
  Router.get('/charity', function(req, res, next) {
    return res.render('pages/charity',
      setRegPageData('fall', 'charity', meta.charity.title, meta.charity.description));
  });
// SINGLE EVENTS
  function setSingleEventData(season, data, eventName, title,  description) {
    var fbData = {};
    fbData.title = title;
    fbData.description = description;
    fbData.season = season;
    fbData.page = season;
    fbData.data = data;
    fbData.event = eventName;
    fbData.sponsors = Sponsors;
    fbData.Session = SessionAuth;
    return fbData;
  };

  // SIDEHILLER SNOWSHOE
  Router.get('/sidehiller-snowshoe-race', function(req, res, next) {
    var data = setSingleEventData('winter',
      AllData, AllData.winter.sidehillerSnowshoe,
      meta.sidehillerSnowshoe.title, meta.sidehillerSnowshoe.description);
    return res.render('pages/single-event', data);
  });
  // KINGMAN FARM
  Router.get('/kingman-farm-moonlight-snowshoe-race', function(req, res, next) {
    var data = setSingleEventData('winter',
      AllData, AllData.winter.kingmanFarm,
      meta.kingmanFarm.title, meta.kingmanFarm.description);
    return res.render('pages/single-event', data);
  });

  // SNOWSHOE HULLABALOO
  Router.get('/exeter-snowshoe-hullabaloo', function(req, res, next) {
    var data = setSingleEventData('winter',
      AllData, AllData.winter.snowshoeHullabaloo,
      meta.snowshoeHullabaloo.title, meta.snowshoeHullabaloo.description);
    return res.render('pages/single-event', data);
  });

  // SNOWSHOE CHAMPIONSHIP
  Router.get('/nh-snowshoe-championship', function(req, res, next) {
    var data = setSingleEventData('winter',
      AllData, AllData.winter.snowshoeChampionship,
      meta.snowshoeChampionship.title, meta.snowshoeChampionship.description);
    return res.render('pages/single-event', data);
  });

  // RALPH WALDO
  Router.get('/ralph-waldo-emerson-trail-race', function(req, res, next) {
    var data = setSingleEventData('spring',
      AllData, AllData.spring.ralphWaldo,
      meta.ralphWaldo.title, meta.ralphWaldo.description);
    return res.render('pages/single-event', data);
  });

  // EXETER TRAIL RACE
  Router.get('/exeter-trail-race', function(req, res, next) {
    var data = setSingleEventData('spring',
      AllData, AllData.spring.exeterTrail,
      meta.exeterTrail.title, meta.exeterTrail.description);
    return res.render('pages/single-event', data);
  });

  // LOON MOUNTAIN RACE
  Router.get('/loon-mountain-race', function(req, res, next) {
    var data = setSingleEventData('summer',
      AllData, AllData.summer.loonMountainRace,
      meta.loonMountainRace.title, meta.loonMountainRace.description);
    // return res.render('pages/loon-mountain-race', data);
    return res.render('pages/single-event', data);
  });

  // KINGMAN FARM TRAIL RACE
  Router.get('/kingman-farm-trail-race', function(req, res, next) {
    var data = setSingleEventData('summer',
      AllData, AllData.summer.kingmanFarmTrailRace,
      meta.kingmanFarmTrailRace.title, meta.kingmanFarmTrailRace.description);
    return res.render('pages/single-event', data);
  });

  // HARMONY HILL SUMMER XC SERIES
  Router.get('/harmony-hill-summer-xc-series', function(req, res, next) {
    var data = setSingleEventData('summer',
      AllData, AllData.summer.harmonyHill,
      meta.harmonyHill.title, meta.harmonyHill.description);
    return res.render('pages/single-event', data);
  });

  // BRETTON WOODS FELL RACE
  Router.get('/bretton-woods-fell-race', function(req, res, next) {
    var data = setSingleEventData('fall',
      AllData, AllData.fall.brettonWoods,
      meta.brettonWoods.title, meta.brettonWoods.description);
    return res.render('pages/single-event', data);
  });

  // VULCANS FURY
  Router.get('/vulcans-fury-trail-race', function(req, res, next) {
    var data = setSingleEventData('fall',
      AllData, AllData.fall.vulcansFury,
      meta.vulcansFury.title, meta.vulcansFury.description);
    return res.render('pages/single-event', data);
  });

  // ROARING FALLS
  Router.get('/roaring-falls-trail-race', function(req, res, next) {
    var data = setSingleEventData('fall',
      AllData, AllData.fall.roaringFalls,
      meta.roaringFalls.title, meta.roaringFalls.description);
    return res.render('pages/single-event', data);
  });
// OLD ACIDOTIC LINKS
//Make sure the old links still work:
  Router.get('/results.php', function(req, res, next){
    res.redirect(410, 'http://www.acidoticracing.com/');
  });

  Router.get('/photos.php', function(req, res, next){
    res.redirect(410, 'http://www.acidoticracing.com/');
  });
// old url redirects

  Router.get('/kingman-farm', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/kingman-farm-trail-race');
  });

  Router.get('/sidehiller-showshoe', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/sidehiller-snowshoe-race');
  });

  Router.get('/snowshoe-hullabaloo', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/exeter-snowshoe-hullabaloo');
  });

  Router.get('/snowshoe-championship', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/nh-snowshoe-championship');
  });

  Router.get('/ralph-waldo', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/ralph-waldo-emerson-trail-race');
  });

  Router.get('/exeter-trail', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/exeter-trail-race');
  });

  Router.get('/harmony-hill', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/harmony-hill-summer-xc-series');
  });

  Router.get('/bretton-woods', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/bretton-woods-fell-race');
  });

  Router.get('/vulcans-fury', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/vulcans-fury-trail-race');
  });

  Router.get('/roaring-falls', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/roaring-falls-trail-race');
  });

  Router.get('/events/view_event.php', function(req, res, next){
    switch(req.query.ID) {
    case '1':
        res.redirect(301, 'http://www.acidoticracing.com/kingman-farm-trail-race/');
        break;
    case '2':
        res.redirect(301, 'http://www.acidoticracing.com/sidehiller-snowshoe-race/');
        break;
    case '3':
        res.redirect(301, 'http://www.acidoticracing.com/exeter-snowshoe-hullabaloo/');
        break;
    case '4':
        res.redirect(301, 'http://www.acidoticracing.com/nh-snowshoe-championship/');
        break;
    case '6':
        res.redirect(301, 'http://www.acidoticracing.com/ralph-waldo-emerson-trail-race/');
        break;
    case '7':
        res.redirect(301, 'http://www.acidoticracing.com/exeter-trail-race/');
        break;
    case '8':
        res.redirect(301, 'http://www.acidoticracing.com/loon-mountain-race/');
        break;
    case '9':
        res.redirect(301, 'http://www.acidoticracing.com/harmony-hill-summer-xc-series/');
        break;
    case '13':
        res.redirect(301, 'http://www.acidoticracing.com/bretton-woods-fell-race/');
        break;
    case '14':
        res.redirect(301, 'http://www.acidoticracing.com/vulcans-fury-trail-race/');
        break;
    case '15':
        res.redirect(301, 'http://www.acidoticracing.com/roaring-falls-trail-race/');
        break;
    default:
        console.log('Didnt find old event page so defaulted to homepage');
        return res.status(404).redirect('http://www.acidoticracing.com/');
    }
  });
//The 404 Route (ALWAYS Keep this as the last route)
  Router.get('*', function(req, res, next){
    return res.status(404).redirect('/');
  });

module.exports = Router;
