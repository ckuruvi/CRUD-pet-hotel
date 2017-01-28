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
});//end of post


router.get('/',function(req,res){
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {
     client.query(
       //'select o.id uid,first_name,last_name,p.id pid,name,breed,color,check_in_flag from owners o join pets p on o.id=p.owner_id join visits v on p.id=v.pet_id;'
       'select o.id oid,first_name,last_name,p.id pid,name,breed,color, checking_flag, v.id vid from owners o join pets p on '+
        'o.id=p.owner_id left join visits v on p.id=v.pet_id WHERE p.display_flag = 1 '+
       'AND (v.checking_flag IS NULL OR v.checking_flag = 1);'

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



router.get('/list',function(req,res){
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {
     client.query(
       'select id,first_name,last_name from owners;'
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
module.exports = router;
