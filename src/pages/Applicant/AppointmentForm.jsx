import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {
  Container, TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import isWeekend from 'date-fns/isWeekend';
import isSameDay from 'date-fns/isSameDay';
import format from 'date-fns/format';



// Example holidays
const holidays = [
  new Date(2024, 0, 1), // New Year
  new Date(2024, 11, 25) // Christmas
];

const AppointmentForm = () => {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState(null);
  const [summary, setSummary] = useState({});

  const handleAddAppointment = () => {
    if (!date) return;
    const formattedDate = format(date, 'yyyy-MM-dd');
    const newAppointments = [...appointments, formattedDate];
    setAppointments(newAppointments);
    const newSummary = { ...summary };
    newSummary[formattedDate] = (newSummary[formattedDate] || 0) + 1;
    setSummary(newSummary);
    setDate(null);
  };

  const isHoliday = (date) => holidays.some(holiday => isSameDay(holiday, date));

  const disableDate = (date) => {
    return isWeekend(date) || isHoliday(date);
  };

  const handleSaveToAPI = () => {
    // Replace with your API call logic
    console.log('Saving to API:', appointments);

    Swal.fire({
        title: "Custom width, padding, color, background.",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      });

    // Swal.fire({
    //     title: "Custom width, padding, color, background.",
    //     width: 600,
    //     padding: "3em",
    //     color: "#716add",
    //     background: "#fff url(/images/trees.png)",
    //     backdrop: `
    //       rgba(0,0,123,0.4)
    //       url("/images/nyan-cat.gif")
    //       left top
    //       no-repeat
    //     `
    //   });
    // Swal.fire({
    //     title: "Successfully save!",
    //     text: "Click OK to continue.",
    //     icon: "success"
    //   });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Appointment Form
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select Date"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          shouldDisableDate={disableDate}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </LocalizationProvider>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddAppointment}
        sx={{ mt: 2 }}
      >
        Add Appointment
      </Button>
      <Button
        variant="contained"
        // color="secondary"
        color="success"
        onClick={handleSaveToAPI}
        sx={{ mt: 2, ml: 2 }}
      >
        Save to API
      </Button>
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Summary of Appointments
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Total Appointments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(summary).map(([date, total]) => (
              <TableRow key={date}>
                <TableCell>{date}</TableCell>
                <TableCell>{total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AppointmentForm;
