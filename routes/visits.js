var express = require('express');
var config = {database: 'pethotel'};
var pg = require('pg');

var router = express.Router();
var pool = new pg.Pool(config);


router.get('/list',function(req,res){
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {
     client.query(
       'select first_name,last_name,name,check_in,check_out from owners o join pets p on o.id=p.owner_id join visits v on p.id=v.pet_id;'
      //  'select * from visits;'
      ,
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
});//end of get

router.post('/:pid',function(req,res){
  console.log('req.body::',req.body);
  var date = new Date().toISOString().slice(0,10);
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {

     client.query(
      'insert into visits(check_in, pet_id, checking_flag) values($1,$2,$3) returning *;',
      [date, req.params.pid, 1],
      function(err,result){
        done();
        if(err){
          console.log('error querying db',err);
          res.sendStatus(500);
        } else {
          console.log('posted info from db from visits',result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});//end of post

router.put('/:pid',function(req,res){
  console.log('req.body::',req.body);
  var date = new Date().toISOString().slice(0, 10);
  console.log('This is the id we are currently looking for', req.params.pid);
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {

     client.query(
       'UPDATE visits SET check_out=$2, checking_flag=$3 WHERE id = $1 RETURNING *',
                    [req.params.pid, date, 0],
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
});//end of put

module.exports = router;
