var express = require('express');
var router = express.Router();
var logic = require("../logic/core")

function isValidIPv4(ip) {
    const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Pattern.test(ip);
}
function isValidTimestamp(timestamp) {
    const parsed = Number(timestamp);

    if (isNaN(parsed)) {
        return false;
    }

    const minTimestamp = 0;
    const maxTimestamp = 2147483647000;
    return parsed >= minTimestamp && parsed <= maxTimestamp;
}

function isValidUid(uid){
  const uidd = Number(uid);
  if(isNaN(uidd)) return false
  return 0 <= uidd && uidd <= 999999999
}

router.get('/users', async function(req, res, next) {
  let st = req.query["start_time"]
  let et = req.query["end_time"]
  let ip = req.query["ip"]

  if(st == undefined || et == undefined){
    res.json({
        error: "ERROR"
    })
    return
  }
  if(ip && !isValidIPv4(ip)){
    res.json({
        error: "ERROR"
    })
    return
  }
  if(!isValidTimestamp(st) || !isValidTimestamp(et)){
    res.json({
        error: "ERROR"
    })
    return
  }

  let users = await logic.getUsers(st, et, ip)

  res.json(users)
});

router.get('/messages', async function(req, res, next) {
  let st = req.query["start_time"]
  let et = req.query["end_time"]
  let occ = req.query["occ"]
  let uid = req.query["uid"]

  if(st == undefined || et == undefined){
    res.json({
        error: "ERROR"
    })
    return
  }
  if(!isValidTimestamp(st) || !isValidTimestamp(et)){
    res.json({
        error: "ERROR"
    })
    return
  }

  if(uid && !isValidUid(uid)){
    res.json({
        error: "ERROR"
    })
    return
  }
  uid = parseInt(uid)

  let messages = await logic.getMessages(st, et, occ, uid)

  res.json(messages)
});

module.exports = router;
