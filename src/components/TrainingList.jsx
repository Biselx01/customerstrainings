import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { fetchTrainings } from "../services/api";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';

function TrainingList() {
    const [training, setTraining] = useState([]);
    //const [open, setOpen] = useState(false);
    const [colDefs] = useState([
        { field: "date", filter: true, cellRenderer: (params) => dayjs(params.value).format('DD.MM.YYYY HH:mm') },
        { field: "duration", filter: true },
        { field: "activity", filter: true}
    ]);

        useEffect(() => {
        handleFetch();
    }, []);

        const handleFetch = () => {
        fetchTrainings()
        .then((data) => {setTraining(data._embedded.trainings)})
        .catch((err) => console.error(err));
    }

    return (
        <div className="ag-theme-material" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                columnDefs={colDefs}
                rowData={training}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
    );
}

export default TrainingList;