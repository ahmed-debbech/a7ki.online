const cron = require('node-cron')
let core = require('./core')

cron.schedule('*/10 * * * * *', async () => core.saveRedis(), true)