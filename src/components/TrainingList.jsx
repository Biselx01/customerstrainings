import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { fetchTrainings, deleteTraining } from "../services/api";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import AddTraining from "./AddTraining";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';

function TrainingList() {
    const [training, setTraining] = useState([]);
    const [open, setOpen] = useState(false);
    const [colDefs] = useState([
        { field: "date", filter: true, cellRenderer: (params) => dayjs(params.value).format('DD.MM.YYYY HH:mm') },
        { field: "duration", filter: true },
        { field: "activity", filter: true},
        { field: "customer", filter: true },
        {
            cellRenderer: params => <Button 
                color="error" 
                size="small"
                onClick={() => handleDelete(params.data._links.self.href)}> 
                Delete 
            </Button>,
            width: 120
        }
    ]);

        useEffect(() => {
        handleFetch();
    }, []);


    const handleFetch = () => {
        fetchTrainings()
            .then((data) => {
                const trainings = data._embedded.trainings;

                const trainingWithCustomer = Promise.all(
                    trainings.map(async (training) => {
                        const customerResponse = await fetch(training._links.customer.href);
                        const customerData = await customerResponse.json();
                        return {
                            ...training,
                            customer: `${customerData.firstname} ${customerData.lastname}`
                        };
                    })
                );

                trainingWithCustomer.then((result) => setTraining(result));
            })
            .catch((err) => console.error(err));
    };

    const handleDelete = (url) => {
        if (window.confirm("Are you sure you want to delete?")) {
            deleteTraining(url)
            .then (() => {
                handleFetch()
                setOpen(true)
            })
            .catch(err => console.error(err))
        }
    }

    return (
        <>
        <AddTraining handleFetch={handleFetch}/>
        <div className="ag-theme-material" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                columnDefs={colDefs}
                rowData={training}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
        <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Training deleted"
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
        </>
    );
}

export default TrainingList;