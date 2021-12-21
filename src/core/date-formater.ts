import moment from 'moment';

export const getTime = (date: Date): string => {
    return `${getStringValue(date.getHours())}:${getStringValue(date.getMinutes())}:${getStringValue(date.getSeconds())}`;
};

export const getDate = (date: Date): string => {
    return `${ getStringValue(date.getMonth() + 1)}/${getStringValue(date.getDate())}/${date.getFullYear()}`;
};

const getStringValue = (val) => {
    return val >= 10 ? val : '0' + val.toString()
}

export function getFromTo(type: string) {
    const currentDate = moment() //new Date();
    let otherDate = moment(currentDate)

    if (type == "hour") {
        otherDate.subtract(1, 'hours')
        return [otherDate, currentDate]
    } else if (type == "day") {
        otherDate.subtract(1, 'days')
        return [otherDate, currentDate]
    } else if (type == "week") {
        otherDate.subtract(7, 'days')
        return [otherDate, currentDate]
    }
}
