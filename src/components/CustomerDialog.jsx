/* eslint-disable react/prop-types */
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';

export default function CustomerDialog({ customer, handleChange }) {
  return (
    <>
      <DialogContent>
        <TextField
          margin="dense"
          name="firstname"
          label="Firstname"
          value={customer.firstname}
          onChange={handleChange}
          fullWidth
          variant="standard"
        />
        <TextField
            margin="dense"
            name="lastname"
            label="Lastname"
            value={customer.lastname}
            onChange={handleChange}
            fullWidth
            variant="standard"
        />
        <TextField
            margin="dense"
            name="streetaddress"
            label="Street Address"
            value={customer.streetaddress}
            onChange={handleChange}
            fullWidth
            variant="standard"
        />
        <TextField
            margin="dense"
            name="postcode"
            label="Postcode"
            value={customer.postcode}
            onChange={handleChange}
            fullWidth
            variant="standard"
        />
        <TextField
            margin="dense"
            name="city"
            label="City"
            value={customer.city}
            onChange={handleChange}
            fullWidth
            variant="standard"
        />
        <TextField
            margin="dense"
            name="email"
            label="Email"
            value={customer.email}
            onChange={handleChange}
            fullWidth
            variant="standard"
        />
        <TextField
            margin="dense"
            name="phone"
            label="Phone"
            value={customer.phone}
            onChange={handleChange}
            fullWidth
            variant="standard"
        />  
      </DialogContent>
    </>
  );
};