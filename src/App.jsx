import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Calendar from './components/CalendarPage';
import Statistics from './components/StatisticsPage';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Container maxWidth="xxl"> 
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Personal Trainer
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Customers" {...a11yProps(0)} />
              <Tab label="Trainings" {...a11yProps(1)} />
              <Tab label="Calendar" {...a11yProps(2)} />
              <Tab label="Statistics" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <CustomerList />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <TrainingList />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Calendar />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Statistics />
          </CustomTabPanel>
        </Box>
        <Outlet />
        <CssBaseline />
      </Container>
    </>
  )
}

export default App