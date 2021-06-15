import "./Datagrid.css";

const Datagrid = ({ employeesData }) => {
    const datagridArr = employeesData.length ? employeesData : [];

    const datagridBody = datagridArr.map((record, index) => {
        return (
            <tr key={index}>
                <td>{record.employeeOne}</td>
                <td>{record.employeeTwo}</td>
                <td>{record.projectID}</td>
                <td>{record.togetherDays}</td>
            </tr>
        )
    });

    return (
        <table className="styled-table">
            <thead>
                <tr>
                    <th>Employee ID #1</th>
                    <th>Employee ID #2</th>
                    <th>Project ID</th>
                    <th>Days worked</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(datagridArr) && datagridArr.length
                    ? datagridBody
                    : null
                }
            </tbody>
        </table>
    );
}

export default Datagrid;