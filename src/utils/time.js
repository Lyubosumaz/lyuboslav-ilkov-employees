const getNumberOfDays = (inputDate) => {
    const date = new Date(inputDate);
    const oneDay = 1000 * 60 * 60 * 24;

    return Math.round(date.getTime() / oneDay);
};

export const getDifferenceOfDays = (start, end) => {
    const dateStart = getNumberOfDays(start);
    const dateEnd = getNumberOfDays(end);

    return dateEnd - dateStart;
};

export const getStartEndTogetherDates = (firstTimeStart, firstTimeEnd, secondTimeStart, secondTimeEnd) => {
    let startTogether;
    let endTogether;

    if (firstTimeStart >= secondTimeStart && firstTimeStart <= secondTimeEnd) startTogether = firstTimeStart;
    if (firstTimeEnd >= secondTimeStart && firstTimeEnd <= secondTimeEnd) startTogether = firstTimeEnd;

    if (secondTimeStart >= firstTimeStart && secondTimeStart <= firstTimeEnd) endTogether = secondTimeStart;
    if (secondTimeEnd >= firstTimeStart && secondTimeEnd <= firstTimeEnd) endTogether = secondTimeEnd;


    if (startTogether && endTogether) {
        return [Math.min(startTogether, endTogether), Math.max(startTogether, endTogether)];
    }

    return [];
};
