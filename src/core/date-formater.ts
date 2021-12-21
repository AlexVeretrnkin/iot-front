import moment from 'moment';

export const getTime = (date: Date): string => {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds() > 10 ? date.getSeconds() : '0' + date.getSeconds().toString()}`;
};

export const getDate = (date: Date): string => {
    return `${date.getFullYear()}/${date.getDate()}/${date.getMonth()}`;
};

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
