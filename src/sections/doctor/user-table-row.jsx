import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';

import Iconify from 'src/components/iconify';
import { Button } from '@mui/material';
import CommonModal from 'src/components/Modal';
import AssignPatients from './assign-patients';
import AppointmentList from './view/appointment-list';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  specialization,
  contact,
  handleClick,
  id,
  department,
}) {
  const [open, setOpen] = useState(null);
  const [modal, setModal] = useState(false);
  const [appointment, setAppointment] = useState(false);

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{specialization}</TableCell>
        <TableCell>{contact}</TableCell>
        <TableCell>{department}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setModal(true);
            }}
          >
            Assign Patients
          </Button>
        </TableCell>
        <TableCell>
          <Button
            onClick={() => {
              setAppointment(true);
            }}
          >
            Appointments
          </Button>
        </TableCell>
        {/* <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell> */}

        {/* <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <CommonModal
        open={modal}
        handleClose={() => setModal(false)}
        content={<AssignPatients handleClose={() => setModal(false)} id={id} />}
      />
      <CommonModal
        open={appointment}
        handleClose={() => setAppointment(false)}
        content={<AppointmentList handleClose={() => setAppointment(false)} id={id} />}
      />
    </>
  );
}

UserTableRow.propTypes = {
  specialization: PropTypes.any,
  handleClick: PropTypes.func,
  contact: PropTypes.any,
  name: PropTypes.any,
  selected: PropTypes.any,
  id: PropTypes.string,
  department: PropTypes.string,
};
