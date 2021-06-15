import React, { createRef, useEffect } from 'react';
import "./SelectFile.css";

const getNumberOfDays = (inputDate) => {
    const date = new Date(inputDate);
    const oneDay = 1000 * 60 * 60 * 24;

    return Math.round(date.getTime() / oneDay);
};

const getDifferenceOfDays = (start, end) => {
    const dateStart = getNumberOfDays(start);
    const dateEnd = getNumberOfDays(end);

    return dateEnd - dateStart;
};

const getStartEndTogetherDates = (firstTimeStart, firstTimeEnd, secondTimeStart, secondTimeEnd) => {
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

const formatMyDate = (date) => {
    const dTime = date ? new Date(date) : new Date();
    const dateString = `${dTime.getUTCFullYear()}-${("0" + (dTime.getUTCMonth() + 1)).slice(-2)}-${("0" + dTime.getUTCDate()).slice(-2)}`;

    return dateString;
};

const formatSelectFileToObj = (file) => {
    return file
        .trim()
        .split('\n')
        .reduce((accumulator, employeeRecord) => {
            let [employeeID, projectID, dateFrom, dateTo] = employeeRecord.trim().split(", ");

            if (dateTo === "NULL") dateTo = formatMyDate(new Date());
            dateFrom = new Date(dateFrom);
            dateTo = new Date(dateTo);

            if (accumulator[projectID]) {
                const combineEmployees = { ...accumulator[projectID], [employeeID]: [dateFrom, dateTo] };
                return accumulator = { ...accumulator, [projectID]: combineEmployees };
            };

            return Object.assign(accumulator, { [projectID]: { [employeeID]: [dateFrom, dateTo] } });
        }, {});
};

const formatDatagridArr = (projects) => {
    let togetherArr = [];

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
                            firstDayTogether: formatMyDate(start),
                            lastDayTogether: formatMyDate(end),
                        };
                    }
                }
            }
        }

        if (Object.keys(projectBest).length) {
            togetherArr.push(projectBest);
            projectBest = {};
        }
    }

    return togetherArr;
};

const SelectFile = ({ callbackFileData, myTest, testMY }) => {
    const ref = createRef();

    useEffect(() => {
        if (myTest === 1) {
            ref.current.value = "";
            testMY();
        }
    }, [myTest, ref, testMY]);

    const handleSelectFile = (ev) => {
        const file = ev.target.files[0];

        const reader = new FileReader();

        reader.onload = () => {
            const initialDataOnj = formatSelectFileToObj(reader.result);
            const datagridObj = formatDatagridArr(initialDataOnj);

            callbackFileData(datagridObj);
            console.table(datagridObj);
        }

        if (!file) return;
        reader.readAsText(file);
    }

    return (
        <input ref={ref} type="file" name="file" className="custom-file-input" onChange={(ev) => handleSelectFile(ev)} />
    );
}

export default SelectFile;