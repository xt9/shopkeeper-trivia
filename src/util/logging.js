export function flatLog(val) {
    return console.log(JSON.parse(JSON.stringify(val)));
}