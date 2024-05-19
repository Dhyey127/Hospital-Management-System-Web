import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import instance from 'src/api/api';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import moment from 'moment';

export default function AppointmentRecord({ handleClose, getData, id }) {
  // Initialize the hook
  const [appointmentList, setAppointmentList] = useState();

  const getAppointmentList = async () => {
    const data = await instance.post('/assign-patient/appointment-record', { patient_id: id });
    setAppointmentList(data.result);
  };

  useEffect(() => {
    getAppointmentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography id="modal-modal-title" variant="h4" component="h2">
        Appointment Record
      </Typography>
      <Grid container marginTop={4} rowSpacing={2}>
        <Grid item xs={4}>
          <Typography id="modal-modal-title" variant="h6" component="h6">
            Doctor Name
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography id="modal-modal-title" variant="h6" component="h6">
            Specialization
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography id="modal-modal-title" variant="h6" component="h6">
            Appointment Date
          </Typography>
        </Grid>
        {appointmentList?.map((appointment) => (
          <>
            <Grid item xs={4}>
              {appointment.doctor.name}
            </Grid>
            <Grid item xs={4}>
              {appointment.doctor.specialization}
            </Grid>
            <Grid item xs={4}>
              {moment(appointment.appointment_time).format('DD MMM HH:mm a')}
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
}

AppointmentRecord.propTypes = {
  handleClose: PropTypes.any,
  getData: PropTypes.any,
  id: PropTypes.string,
};
