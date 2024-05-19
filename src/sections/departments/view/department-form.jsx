import { Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import instance from 'src/api/api';
import PropTypes from 'prop-types';

export default function DepartmentForm({ handleClose, getData }) {
  // Initialize the hook
  const { control, handleSubmit } = useForm();
  // const [doctors, setDoctors] = useState([]);

  // const getDoctors = async () => {
  //   const data = await instance.get('/doctor/get-doctors');
  //   setDoctors(data.result);
  // };

  // useEffect(() => {
  //   getDoctors();
  // }, []);

  const onSubmit = async (data) => {
    try {
      await instance.post('/department/add', data);
      handleClose();
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add Department
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
              label="Department Name"
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
          name="service"
          control={control}
          defaultValue=""
          rules={{ required: 'Service Offered is required' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Service Offered"
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
              fullWidth
              margin="dense"
              size="small"
            />
          )}
        />
        {/* <Controller
          name="assignedDoctors"
          control={control}
          rules={{ required: 'At least one doctor must be selected' }}
          render={({ field, fieldState }) => (
            <FormControl fullWidth margin="dense" error={!!fieldState.error}>
              <InputLabel id="doctor-select-label">Assign Doctors</InputLabel>
              <Select
                {...field}
                labelId="doctor-select-label"
                multiple
                value={field.value || []} // Ensure the value is always an array
                renderValue={(selected) => selected.join(', ')}
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              >
                {doctors.map((doctor) => (
                  <MenuItem value={doctor._id}>{doctor.name}</MenuItem>
                ))}
              </Select>
              {fieldState.error && (
                <p style={{ color: 'red', fontSize: '0.8rem' }}>{fieldState.error.message}</p>
              )}
            </FormControl>
          )}
        /> */}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
          Add Department
        </Button>
      </form>
    </>
  );
}

DepartmentForm.propTypes = {
  handleClose: PropTypes.any,
  getData: PropTypes.any,
};
