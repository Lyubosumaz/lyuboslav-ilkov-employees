import { formatToYearMonthDay, getDifferenceInDays, getNewUTCDate, getStartEndTogetherDates } from "./time";

export const formatSelectedFileToArr = (selectedFile) => {
    return selectedFile
        .trim()
        .split('\n')
        .filter((employeeRecord) => employeeRecord)
        .map((employeeRecord) => {
            let [employeeID, projectID, dateFrom, dateTo] = employeeRecord.trim().split(", ");

            if (dateTo === "NULL") dateTo = formatToYearMonthDay(getNewUTCDate());
            dateFrom = getNewUTCDate(dateFrom);
            dateTo = getNewUTCDate(dateTo);

            return { employeeID, projectID, dateFrom, dateTo };
        });
};

const getPairsDaysPerProject = (projects) => {
    let datagridObj = {};

    for (const currentProject of projects) {
        const { employeeID, projectID, dateFrom, dateTo } = currentProject;

        for (const compereProject of projects) {
            if (employeeID === compereProject.employeeID) continue;

            const {
                employeeID: compereEmployeeID,
                projectID: compereProjectID,
                dateFrom: compereDateFrom,
                dateTo: compereDateTo
            } = compereProject;

            if (projectID === compereProjectID) {
                const [start, end] = getStartEndTogetherDates(dateFrom, dateTo, compereDateFrom, compereDateTo);
                if (!start || !end) continue;

                const togetherDays = getDifferenceInDays(start, end);
                if (!togetherDays) continue;

                const datagridRecord = {
                    employeeOne: employeeID,
                    employeeTwo: compereEmployeeID,
                    projectID,
                    togetherDays,
                    firstDayTogether: formatToYearMonthDay(getNewUTCDate(start)),
                    lastDayTogether: formatToYearMonthDay(getNewUTCDate(end)),
                };

                if (!datagridObj[projectID]) {
                    datagridObj[projectID] = datagridRecord;
                } else if (datagridObj[projectID].togetherDays < togetherDays) {
                    datagridObj[projectID] = datagridRecord;
                }
            }
        }
    }

    return Object.values(datagridObj);
};

const getLongestTimeTogether = (selectedFileArr) => {
    let longestTime = 0;

    for (const record of selectedFileArr) {
        if (longestTime < record.togetherDays) {
            longestTime = record.togetherDays;
        }
    }

    return longestTime;
}

export const formatDatagridToArr = (selectedFileArr) => {
    const everyPairWorkDays = getPairsDaysPerProject(selectedFileArr);
    const longestTime = getLongestTimeTogether(everyPairWorkDays);

    return everyPairWorkDays.filter((record) => record.togetherDays === longestTime);
}