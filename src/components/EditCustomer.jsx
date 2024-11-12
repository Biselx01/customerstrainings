/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { updateCustomer } from '../services/api';
import CustomerDialog from './CustomerDialog';

export default function EditCustomer(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: ""
  })

  const handleClickOpen = () => {
    setOpen(true);
    console.log(props.data);
    setCustomer({
        firstname: props.data.firstname,
        lastname: props.data.lastname,
        streetaddress: props.data.streetaddress,
        postcode: props.data.postcode,
        city: props.data.city,
        email: props.data.email,
        phone: props.data.phone
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value});
  }

  const handleSave = () => {
    updateCustomer(props.data._links.customer.href, customer)
    .then(() => {
        props.handleFetch();
        handleClose();
    })
    .catch(err => console.error(err))
  }

  return (
    <>
      <Button size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Update Customer</DialogTitle>
        <CustomerDialog customer={customer} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
