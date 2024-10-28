
export async function ipToCountry(ip : string){
    const geo = await import('geoip-lite');

    return geo.lookup(ip).country
}