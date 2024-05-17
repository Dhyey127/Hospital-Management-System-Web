import { Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';

export default function PatientForm() {
  // Initialize the hook
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add Patient
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="Name"
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
          name="Age"
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
          name="ContactNo"
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
          name="previous"
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
          name="medications"
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
