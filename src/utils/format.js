import { getDifferenceOfDays, getNewUTCDate, getStartEndTogetherDates } from "./time";

const formatToYearMonthDay = (dTime) => {
    return `${dTime.getUTCFullYear()}-${("0" + (dTime.getUTCMonth() + 1)).slice(-2)}-${("0" + dTime.getUTCDate()).slice(-2)}`;
};

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
        let projectBest = {};

        for (const compereProject of projects) {
            if (employeeID === compereProject.employeeID) continue;

            const {
                employeeID: compereEmployeeID,
                projectID: compereProjectID,
                dateFrom: compereDateFrom,
                dateTo: compereDateTo
            } = compereProject;

            if (projectID === compereProjectID) {
                const togetherDatesArr = getStartEndTogetherDates(dateFrom, dateTo, compereDateFrom, compereDateTo);

                if (Array.isArray(togetherDatesArr) && togetherDatesArr.length) {
                    const [start, end] = togetherDatesArr;
                    const togetherDays = getDifferenceOfDays(start, end);
                    if (!togetherDays) return;

                    if (projectBest.togetherDays >= togetherDays) {
                        projectBest = { ...projectBest };
                    } else {
                        projectBest = {
                            employeeOne: employeeID,
                            employeeTwo: compereEmployeeID,
                            projectID,
                            togetherDays,
                            firstDayTogether: formatToYearMonthDay(getNewUTCDate(start)),
                            lastDayTogether: formatToYearMonthDay(getNewUTCDate(end)),
                        };
                    }
                }
            }
        }

        if (Object.keys(projectBest).length && !datagridObj[projectBest.projectID]) {
            datagridObj[projectBest.projectID] = projectBest;
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

export const formatDatagridToArr = (selectedFileRecords) => {
    const everyPairWorkingDays = getPairsDaysPerProject(selectedFileRecords);
    const longestTime = getLongestTimeTogether(everyPairWorkingDays);

    return everyPairWorkingDays.filter((record) => record.togetherDays === longestTime);
}