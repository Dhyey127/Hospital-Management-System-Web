import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import instance from 'src/api/api';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

export default function AssignPatients({ handleClose, getData, id }) {
  // Initialize the hook
  const { control, handleSubmit } = useForm();
  const [patientData, setPatientData] = useState(null);

  const getAllPatientList = async () => {
    const data = await instance.get('/patient/get-patients');
    setPatientData(data.result);
  };

  useEffect(() => {
    getAllPatientList();
  }, []);

  const onSubmit = async (data) => {
    data.doctor = id;
    try {
      await instance.post('/assign-patient', data);
      handleClose();
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Assign Patients
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="patient"
          control={control}
          defaultValue=""
          rules={{ required: 'patient is required' }}
          render={({ field, fieldState }) => (
            <FormControl
              fullWidth
              margin="dense"
              size="small"
              variant="outlined"
              error={!!fieldState.error}
            >
              <InputLabel>Patient</InputLabel>
              <Select {...field} label="Patient">
                {patientData?.map((patient) => (
                  <MenuItem value={patient._id}>{patient.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{fieldState.error ? fieldState.error.message : null}</FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="appointment_time"
          control={control}
          rules={{ required: 'Time is required' }}
          render={({ field, fieldState }) => (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <TimePicker
                label="Appointment Time"
                value={field.value}
                onChange={field.onChange}
                format="hh:mm a"
                minTime={moment()}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="dense"
                    error={!!fieldState.error}
                    helperText={fieldState.error ? fieldState.error.message : null}
                  />
                )}
              />
            </LocalizationProvider>
          )}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 1, ml: 4 }}>
          Assign
        </Button>
      </form>
    </>
  );
}

AssignPatients.propTypes = {
  handleClose: PropTypes.any,
  getData: PropTypes.any,
  id: PropTypes.string,
};
