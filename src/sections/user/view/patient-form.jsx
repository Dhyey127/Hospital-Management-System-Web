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

export default function PatientForm({ handleClose, getData }) {
  // Initialize the hook
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await instance.post('/patient/add', data);
      handleClose();
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add Patient
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
          name="age"
          control={control}
          defaultValue=""
          rules={{ required: 'Age is required' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Age"
              type="number"
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
          name="gender"
          control={control}
          defaultValue=""
          rules={{ required: 'Gender is required' }}
          render={({ field, fieldState }) => (
            <FormControl
              fullWidth
              margin="dense"
              size="small"
              variant="outlined"
              error={!!fieldState.error}
            >
              <InputLabel>Gender</InputLabel>
              <Select {...field} label="Gender">
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              <FormHelperText>{fieldState.error ? fieldState.error.message : null}</FormHelperText>
            </FormControl>
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
        <Controller
          name="diagnosis"
          control={control}
          defaultValue=""
          // rules={{ required: 'Previous is required' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Previous Diagnoses"
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
              fullWidth
              margin="dense"
              size="small"
              multiline
              rows={2}
            />
          )}
        />
        <Controller
          name="allergies"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Allergies"
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
              fullWidth
              margin="dense"
              size="small"
              multiline
              rows={2}
            />
          )}
        />
        <Controller
          name="medication"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Medications"
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
              fullWidth
              margin="dense"
              size="small"
              multiline
              rows={2}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
          Add Patient
        </Button>
      </form>
    </>
  );
}

PatientForm.propTypes = {
  handleClose: PropTypes.any,
  getData: PropTypes.any,
};
