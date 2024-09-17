const cron = require('node-cron')
let core = require('./core')

let isRunning = false

async function run(){
    if(!isRunning) {
        isRunning = true
        await core()
        isRunning = false
    }
}
cron.schedule('*/10 * * * * *', async () => {
    run()
})