import { useState } from "react";
import Datagrid from "../components/Datagrid/Datagrid";
import SelectFile from "../components/SelectFile/SelectFile";
import './App.css';

const App = () => {
    const [employeesDataArr, setEmployeesData] = useState([]);
    const dataArrStatus = Array.isArray(employeesDataArr) && employeesDataArr.length;
    const [resetBtn, setResetBtn] = useState(0);

    const handleCallback = (fileData) => {
        setEmployeesData(fileData);
    };

    const handleResetBtn = () => {
        setEmployeesData([]);
        setResetBtn(1);
    }

    const handleCallbackResetBtn = () => {
        setResetBtn(0);
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>Employees</h1>
                <p>load text file to display pair of employees who worked together on common project for longest time</p>
            </header>

            <main className="app-main">
                <section className="app-controls-wrapper">
                    <SelectFile callbackFileData={handleCallback} myTest={resetBtn} testMY={handleCallbackResetBtn} />

                    {dataArrStatus ? <button className="app-remove-btn" onClick={() => handleResetBtn()}>Reset</button> : null}
                </section>

                {dataArrStatus ? <Datagrid employeesData={employeesDataArr} /> : null}
            </main>

            <footer className="app-footer">
                <p>GitHub repository:</p>
                <a href="https://github.com/Lyubosumaz" target="_blank">lyuboslav-ilkov-employees</a>
            </footer>
        </div>
    );
}

export default App;
