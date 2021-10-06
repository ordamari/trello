export const utilService = {
    genId,
    checkDateStr,
    timeToString,
    checkTimeStr
}

function genId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function checkDateStr(str) {
    const matt = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    return matt.test(str);
}

function timeToString(time) {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const isPM = (hours / 12 >= 1);
    let hoursStr = (hours % 12 === 0) ? 12 : hours % 12;
    hoursStr = (hoursStr < 10) ? '0' + hoursStr : '' + hoursStr
    const minutesStr = (minutes < 10) ? '0' + minutes : '' + minutes
    return `${hoursStr}:${minutesStr} ${isPM ? 'PM' : 'AM'}`
}

function checkTimeStr(str) {
    const timeMat = /^([0]?[0-9]|1[0-2]):[0-5][0-9]$/i;
    if (str.split(' ').length !== 2) return false;
    const [time, AMorPM] = str.split(' ');
    if (!(AMorPM === 'AM' || AMorPM === 'PM')) return false;
    return timeMat.test(time);
}