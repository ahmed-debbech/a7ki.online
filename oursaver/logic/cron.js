const cron = require('node-cron')
const core = require('./core')

cron.schedule('*/10 * * * * *', core.saveRedis)