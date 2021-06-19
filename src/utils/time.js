import moment from 'moment';

export const getNewUTCDate = (dInput) => {
    return dInput ? moment(dInput) : moment();
};

export const formatToYearMonthDay = (dTime) => {
    return moment(dTime).format('YYYY-MM-DD');
};

export const getDifferenceInDays = (dStart, dEnd) => {
    const dateStart = moment(dStart);
    const dateEnd = moment(dEnd);

    return dateEnd.diff(dateStart, 'days');
};

export const getStartEndOverlapDates = (abStart, abEnd, cdStart, cdEnd) => {
    let overlapStart;
    let overlapEnd;

    // lines are not overlapping
    if ((abStart < cdStart && abEnd < cdEnd && abEnd < cdStart) || (cdStart < abStart && cdEnd < abEnd && cdEnd < abStart)) return [];

    // lines are equal to each other
    if (abStart === cdStart && abEnd === cdEnd) return [abStart, abEnd];

    overlapStart = abStart >= cdStart ? abStart : cdStart;
    overlapEnd = abEnd <= cdEnd ? abEnd : cdEnd;

    if (overlapStart && overlapEnd) return [overlapStart, overlapEnd];
    return [];
};
