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
  var t = setTimeout(() => {
    messages.freeUser(req.params.userId)
  }, 30000)
  messages.setWaitingUsersToBeNotified(t, req.params.userId, res)
});

router.get('/banMsg/:messageId', async function(req, res, next) {

  let banned = await messages.banMessage(req.params.messageId)
  res.json({isBanned: banned});

});


module.exports = router;
