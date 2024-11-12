import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { fetchCustomers, deleteCustomer } from "../services/api";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';

function CustomerList() {
    const [customer, setCustomer] = useState([]);
    const [open, setOpen] = useState(false);
    const [colDefs] = useState([
        { field: "firstname", filter: true },
        { field: "lastname", filter: true },
        { field: "streetaddress", filter: true},
        { field: "postcode", filter: true},
        { field: "city", filter: true },
        { field: "email", filter: true},
        { field: "phone", filter: true },
        {
            cellRenderer: params => <EditCustomer handleFetch={handleFetch} data={params.data} />,
            width: 120
        },
        
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
        fetchCustomers()
        .then((data) => {setCustomer(data._embedded.customers)})
        .catch((err) => console.error(err));
    }

        const handleDelete = (url) => {
        if (window.confirm("Are you sure you want to delete?")) {
            deleteCustomer(url)
            .then (() => {
                handleFetch()
                setOpen(true)
            })
            .catch(err => console.error(err))
        }
    }

    return (
        <>
        <AddCustomer handleFetch={handleFetch}/>
        <div className="ag-theme-material" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                columnDefs={colDefs}
                rowData={customer}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Customer deleted"
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
        </>
    );
}

export default CustomerList;