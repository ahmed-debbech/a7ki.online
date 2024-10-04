var express = require('express');
var router = express.Router();
var messages = require("../logic/messages")


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/get_msg', async function(req, res, next) {


  let msgs = await messages.getNewMessages()

  res.json({ms: msgs});
});

router.get('/poll/:userId', async function(req, res, next) {
  messages.setWaitingUsersToBeNotified(res)
});

module.exports = router;
