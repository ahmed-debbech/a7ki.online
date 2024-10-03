var express = require('express');
var router = express.Router();
var messages = require("../logic/messages")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/poll', async function(req, res, next) {

  let msgs = await messages.getNewMessages()

  res.json({ms: msgs});
});


module.exports = router;
