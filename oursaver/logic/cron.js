const cron = require('node-cron')
const core = require('./core')

cron.schedule('*/1 * * * *', core.saveRedis)