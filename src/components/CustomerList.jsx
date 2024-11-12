import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { fetchCustomers } from "../services/api";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function CustomerList() {
    const [customer, setCustomer] = useState([]);
    //const [open, setOpen] = useState(false);
    const [colDefs] = useState([
        { field: "firstname", filter: true },
        { field: "lastname", filter: true },
        { field: "streetaddress", filter: true},
        { field: "postcode", filter: true},
        { field: "city", filter: true },
        { field: "email", filter: true},
        { field: "phone", filter: true }
    ]);

        useEffect(() => {
        handleFetch();
    }, []);

        const handleFetch = () => {
        fetchCustomers()
        .then((data) => {setCustomer(data._embedded.customers)})
        .catch((err) => console.error(err));
    }

    return (
        <div className="ag-theme-material" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                columnDefs={colDefs}
                rowData={customer}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
    );
}

export default CustomerList;