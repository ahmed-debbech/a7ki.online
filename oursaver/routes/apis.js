var express = require('express');
var router = express.Router();

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

router.get('/users', function(req, res, next) {
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
  res.json({
    "st":st,
    "et":et,
    "ip":ip
  })
});

module.exports = router;
