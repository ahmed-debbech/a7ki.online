var express = require('express');
var router = express.Router();
var gen = require('../logic/generator')

router.get('/gen', function(req, res, next) {
  res.send({
    name: gen.generate()
  });
});



module.exports = router;