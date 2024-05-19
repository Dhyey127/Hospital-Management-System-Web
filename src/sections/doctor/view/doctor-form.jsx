import { Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import instance from 'src/api/api';
import PropTypes from 'prop-types';

export default function DoctorForm({ handleClose, getData }) {
  // Initialize the hook
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await instance.post('/doctor/add', data);
      handleClose();
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add Doctor
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: 'Name is required' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Name"
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
              fullWidth
              margin="dense"
              size="small"
            />
          )}
        />
        <Controller
          name="specialization"
          control={control}
          defaultValue=""
          rules={{ required: 'Specialization is required' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Specialization"
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
              fullWidth
              margin="dense"
              size="small"
            />
          )}
        />
        <Controller
          name="contact"
          control={control}
          defaultValue=""
          rules={{ required: 'ContactNo is required' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Contact No."
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
              fullWidth
              margin="dense"
              size="small"
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
          Add Doctor
        </Button>
      </form>
    </>
  );
}

DoctorForm.propTypes = {
  handleClose: PropTypes.any,
  getData: PropTypes.any,
};
