var cooldown_pool = {}

function checkCooldown(user_id){
    if(cooldown_pool[user_id]){
        let timest = cooldown_pool[user_id]
        const ellapsedMilli = Date.now() - timest
        if(Math.floor(ellapsedMilli / 1000) < 4){
            console.log(ellapsedMilli)
            return false
        }
    }
    cooldown_pool[user_id] = Date.now()
    return true;
}

module.exports = {
    checkCooldown
}