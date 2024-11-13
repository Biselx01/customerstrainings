import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import Autocomplete from '@mui/material/Autocomplete';
import { saveTraining, fetchCustomers } from '../services/api';

dayjs.locale('en-gb');

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [training, setTraining] = useState({
    date: "",
    duration: "",
    activity: "",
    customer: ""
  });

  useEffect(() => {
    fetchCustomers()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const resetForm = () => {
    setTraining({
      date: "",
      duration: "",
      activity: "",
      customer: ""
    });
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const handleChange = (event) => {
    setTraining({...training, [event.target.name]: event.target.value});
  };

  const handleDateChange = (date) => {
    setTraining({ ...training, date: date.toISOString() });
  };

  const handleCustomerChange = (event, value) => {
    setTraining({ ...training, customer: value ? value._links.self.href : "" });
  };

  const handleSave = () => {
    saveTraining(training)
    .then(() => {
      // eslint-disable-next-line react/prop-types
      props.handleFetch();
      handleClose();
    })
    .catch(err => console.error(err))
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <Box mt={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
              <DateTimePicker
                label="Date"
                value={dayjs(training.date)}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} variant='standard' />}
              />
              </LocalizationProvider>
          </Box>
          <TextField
            margin="dense"
            name="duration"
            label="Duration"
            value={training.duration}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="activity"
            label="Activity"
            value={training.activity}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <Box mt={3}>
            <Autocomplete
              options={customers}
              getOptionLabel={(customer) => `${customer.firstname} ${customer.lastname}`}
              renderInput={(params) => <TextField {...params} label="Customer" variant="standard" />}
              onChange={handleCustomerChange}
              value={customers.find(customer => customer._links.self.href === training.customer) || null}
              isOptionEqualToValue={(option, value) => option._links.self.href === value._links.self.href}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
