import { useState } from "react";
import Datagrid from "../components/Datagrid/Datagrid";
import SelectFile from "../components/SelectFile/SelectFile";
import './App.css';

const App = () => {
    const [employeesDataArr, setEmployeesData] = useState([]);
    const [resetBtn, setResetBtn] = useState(0);
    const dataArrStatus = Array.isArray(employeesDataArr) && employeesDataArr.length;

    const callbackFileData = (fileData) => {
        setEmployeesData(fileData);
    };

    const callbackForResetBtn = () => {
        setResetBtn(0);
    };

    const onClickResetBtn = () => {
        setEmployeesData([]);
        setResetBtn(1);
    }

    return (
        <div className="app">
            <header className="app-header">
                <h1>Employees</h1>
                <p>load text file to display pair of employees who worked together on common project for longest time</p>
            </header>

            <main className="app-main">
                <section className="app-controls-wrapper">
                    <SelectFile callbackFileData={callbackFileData} resetBtnStatus={resetBtn} callbackResetBtnStatus={callbackForResetBtn} />

                    {dataArrStatus ? <button className="app-remove-btn" onClick={() => onClickResetBtn()}>Reset</button> : null}
                </section>

                {dataArrStatus ? <Datagrid employeesData={employeesDataArr} /> : null}
            </main>

            <footer className="app-footer">
                <p>GitHub repository:</p>
                <a href="https://github.com/Lyubosumaz/lyuboslav-ilkov-employees" target="_blank" rel="noreferrer">lyuboslav-ilkov-employees</a>
            </footer>
        </div>
    );
}

export default App;