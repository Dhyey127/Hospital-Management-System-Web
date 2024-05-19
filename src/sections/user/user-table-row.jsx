import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import { Button } from '@mui/material';

import Iconify from 'src/components/iconify';
import CommonModal from 'src/components/Modal';
import AppointmentRecord from './view/appointment-record';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  id,
  name,
  age,
  gender,
  contact,
  diagnosis,
  allergies,
  medication,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const [appointment, setAppointment] = useState(false);

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
        <TableCell>{age}</TableCell>

        <TableCell>{gender}</TableCell>

        <TableCell>{contact}</TableCell>
        <TableCell>{diagnosis}</TableCell>
        <TableCell>{medication}</TableCell>
        <TableCell>{allergies}</TableCell>
        <TableCell>
          <Button onClick={() => setAppointment(true)}>Appointment Record</Button>
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
        open={appointment}
        handleClose={() => setAppointment(false)}
        content={<AppointmentRecord handleClose={() => setAppointment(false)} id={id} />}
      />
    </>
  );
}

UserTableRow.propTypes = {
  gender: PropTypes.any,
  age: PropTypes.any,
  handleClick: PropTypes.func,
  contact: PropTypes.any,
  name: PropTypes.any,
  selected: PropTypes.any,
  diagnosis: PropTypes.any,
  allergies: PropTypes.any,
  medication: PropTypes.any,
  id: PropTypes.string,
};
