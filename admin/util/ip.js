function v6Tov4(ip){
    // Convert IPv6 loopback (::1) to IPv4 (127.0.0.1)
    if (ip === '::1') {
        ip = '127.0.0.1';
    } else if (ip.startsWith('::ffff:')) {
        ip = ip.slice(7); // Remove the ::ffff: prefix
    }
    return ip
}

module.exports = {
    v6Tov4
}