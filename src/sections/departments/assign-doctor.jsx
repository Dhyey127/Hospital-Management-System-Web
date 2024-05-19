import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import instance from 'src/api/api';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function AssignDoctor({ handleClose, getData, id }) {
  // Initialize the hook
  const { control, handleSubmit } = useForm();
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    const data = await instance.get('/doctor/get-doctors');
    setDoctors(data.result);
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const onSubmit = async (data) => {
    data.department_id = id;
    try {
      await instance.put('/doctor/assign-department', data);
      handleClose();
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Assign Doctor
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="doctor_id"
          control={control}
          defaultValue=""
          rules={{ required: 'Select doctor' }}
          render={({ field, fieldState }) => (
            <FormControl
              fullWidth
              margin="dense"
              size="small"
              variant="outlined"
              error={!!fieldState.error}
            >
              <InputLabel>Doctor</InputLabel>
              <Select {...field} label="Patient">
                {doctors?.map((doctor) => (
                  <MenuItem value={doctor._id}>{doctor.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{fieldState.error ? fieldState.error.message : null}</FormHelperText>
            </FormControl>
          )}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
          Assign Doctor
        </Button>
      </form>
    </>
  );
}

AssignDoctor.propTypes = {
  handleClose: PropTypes.any,
  getData: PropTypes.any,
  id: PropTypes.string,
};
