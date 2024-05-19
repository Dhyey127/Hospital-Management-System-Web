import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import instance from 'src/api/api';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export default function AppointmentList({ handleClose, getData, id }) {
  // Initialize the hook
  const [appointmentList, setAppointmentList] = useState();
  const [reassign, setReassign] = useState(false);
  const [selectedTime, setSelectedTime] = useState(moment());
  const [clickedData, setClickedData] = useState(null);

  const getAppointmentList = async () => {
    const data = await instance.post('/assign-patient/patient-list', { doctor_id: id });
    setAppointmentList(data.result);
  };

  useEffect(() => {
    getAppointmentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (clickedData) {
      setSelectedTime(moment(clickedData.appointment_time, 'hh:mm'));
    }
  }, [clickedData]);

  const handleOpenDialog = () => {
    setReassign(true);
  };

  const handleCloseDialog = () => {
    setReassign(false);
  };

  return (
    <>
      <Typography id="modal-modal-title" variant="h4" component="h2">
        Appointment List
      </Typography>
      <Grid container marginTop={4} rowSpacing={2}>
        <Grid item xs={4}>
          <Typography id="modal-modal-title" variant="h6" component="h6">
            Patient Name
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography id="modal-modal-title" variant="h6" component="h6">
            Appointment Date/Time
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography id="modal-modal-title" variant="h6" component="h6">
            Reassign
          </Typography>
        </Grid>
        {appointmentList?.map((appointment) => (
          <>
            <Grid item xs={4}>
              {appointment.patient.name}
            </Grid>
            <Grid item xs={6}>
              {moment(appointment.appointment_time).format('DD MMM HH:mm a')}
            </Grid>
            <Grid item xs={2}>
              <Button
                onClick={() => {
                  handleOpenDialog();
                  setClickedData(appointment);
                }}
              >
                Reassign
              </Button>
            </Grid>
          </>
        ))}
      </Grid>
      <Dialog open={reassign} onClose={handleCloseDialog}>
        <DialogTitle>Reassign Appointment</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <TimePicker
              label="Select Time"
              value={selectedTime}
              onChange={(newValue) => {
                setSelectedTime(newValue);
              }}
              format="hh:mm a"
              minTime={moment()}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              instance.put(`/assign-patient/reassign/${clickedData._id}`, {
                appointment_time: selectedTime,
              });
              getAppointmentList();
              handleCloseDialog();
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

AppointmentList.propTypes = {
  handleClose: PropTypes.any,
  getData: PropTypes.any,
  id: PropTypes.string,
};
