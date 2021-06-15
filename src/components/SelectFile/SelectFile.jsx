import { createRef, useEffect } from 'react';
import { formatDatagridToArr, formatSelectedFileToArr } from "../../utils/format";
import "./SelectFile.css";

const SelectFile = ({ callbackFileData, resetBtnStatus, callbackResetBtnStatus }) => {
    const ref = createRef();

    useEffect(() => {
        if (resetBtnStatus === 1) {
            ref.current.value = "";
            callbackResetBtnStatus();
        }
    }, [ref, resetBtnStatus, callbackResetBtnStatus]);

    const handleSelectFile = (ev) => {
        const file = ev.target.files[0];

        const reader = new FileReader();

        reader.onload = () => {
            const initialDataArr = formatSelectedFileToArr(reader.result);
            const datagridArr = formatDatagridToArr(initialDataArr);

            callbackFileData(datagridArr);
            console.table(datagridArr);
        }

        if (!file) return;
        reader.readAsText(file);
    };

    return (
        <input ref={ref} type="file" name="file" className="custom-file-input" onChange={(ev) => handleSelectFile(ev)} />
    );
}

export default SelectFile;