import moment from 'moment';

export const getNewUTCDate = (dInput) => {
    return dInput ? moment(dInput) : moment();
}

export const formatToYearMonthDay = (dTime) => {
    return moment(dTime).format("YYYY-MM-DD");
};

export const getDifferenceInDays = (dStart, dEnd) => {
    const dateStart = moment(dStart);
    const dateEnd = moment(dEnd);

    return dateEnd.diff(dateStart, 'days');
};

export const getStartEndTogetherDates = (firstTimeStart, firstTimeEnd, secondTimeStart, secondTimeEnd) => {
    let startTogetherDate;
    let endTogetherDate;

    if (firstTimeStart >= secondTimeStart && firstTimeStart <= secondTimeEnd) startTogetherDate = firstTimeStart;
    else if (firstTimeEnd >= secondTimeStart && firstTimeEnd <= secondTimeEnd) startTogetherDate = firstTimeEnd;

    if (secondTimeEnd >= firstTimeStart && secondTimeEnd <= firstTimeEnd) endTogetherDate = secondTimeEnd;
    else if (secondTimeStart >= firstTimeStart && secondTimeStart <= firstTimeEnd) endTogetherDate = secondTimeStart;

    if (startTogetherDate && endTogetherDate) {
        return [Math.min(startTogetherDate, endTogetherDate), Math.max(startTogetherDate, endTogetherDate)];
    }

    return [];
};
