var express = require('express');
var router = express.Router();

var defaultSeason = 'winter';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'acidotic Racing',
    season: defaultSeason});
});

router.get('/winter', function(req, res, next) {
  res.render('templates/winter', {
    title: 'Winter Events - acidotic Racing',
    season: 'winter'});
});

module.exports = router;
