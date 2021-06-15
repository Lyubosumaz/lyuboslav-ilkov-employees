import { getDifferenceOfDays, getStartEndTogetherDates } from "./time";

const formatToYearMonthDay = (date) => {
    const dTime = date ? new Date(date) : new Date();
    return `${dTime.getUTCFullYear()}-${("0" + (dTime.getUTCMonth() + 1)).slice(-2)}-${("0" + dTime.getUTCDate()).slice(-2)}`;
};

export const formatSelectedFileToObj = (selectedFile) => {
    return selectedFile
        .trim()
        .split('\n')
        .reduce((accumulator, employeeRecord) => {
            let [employeeID, projectID, dateFrom, dateTo] = employeeRecord.trim().split(", ");

            if (dateTo === "NULL") dateTo = formatToYearMonthDay(new Date());
            dateFrom = new Date(dateFrom);
            dateTo = new Date(dateTo);

            if (accumulator[projectID]) {
                const combineEmployees = { ...accumulator[projectID], [employeeID]: [dateFrom, dateTo] };
                return accumulator = { ...accumulator, [projectID]: combineEmployees };
            };

            return Object.assign(accumulator, { [projectID]: { [employeeID]: [dateFrom, dateTo] } });
        }, {});
};

export const formatDatagridToArr = (projects) => {
    let datagridArr = [];

    for (const projectID in projects) {
        const currentProject = projects[projectID];
        let projectBest = {};

        for (const employeeID in currentProject) {
            const [mainStart, mainEnd] = currentProject[employeeID];

            for (const compereEmployeeID in currentProject) {
                if (employeeID === compereEmployeeID) continue;

                const [secondaryStart, secondaryEnd] = currentProject[compereEmployeeID];
                const togetherDatesArr = getStartEndTogetherDates(mainStart, mainEnd, secondaryStart, secondaryEnd);

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
                            firstDayTogether: formatToYearMonthDay(start),
                            lastDayTogether: formatToYearMonthDay(end),
                        };
                    }
                }
            }
        }

        if (Object.keys(projectBest).length) {
            datagridArr.push(projectBest);
            projectBest = {};
        }
    }

    return datagridArr;
};
