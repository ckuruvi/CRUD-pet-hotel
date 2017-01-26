var express = require('express');
var config = {database: 'pethotel'};
var pg = require('pg');

var router = express.Router();
var pool = new pg.Pool(config);

router.post('/',function(req,res){
  console.log('req.body::',req.body);
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {

     client.query(
      'insert into owners (first_name, last_name) values($1,$2) returning *;',
      [req.body.firstName, req.body.lastName],
      function(err,result){
        done();
        if(err){
          console.log('error querying db',err);
          res.sendStatus(500);
        } else {
          console.log('posted info from db',result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});//end of p

module.exports = router;
