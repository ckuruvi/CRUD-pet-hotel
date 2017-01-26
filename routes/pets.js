var express = require('express');
var config = {database: 'pethotel'};
var pg = require('pg');

var router = express.Router();
var pool = new pg.Pool(config);

module.exports = router;
