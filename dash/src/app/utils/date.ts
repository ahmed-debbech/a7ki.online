export function convertDateToTimestamp(date: string){
    const timestamp = new Date(date).getTime();
    return timestamp.toString()
}
