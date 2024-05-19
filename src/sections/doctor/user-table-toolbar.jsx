import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';
import { useEffect, useState } from 'react';
import { Button, Checkbox, ListItemText, Menu, MenuItem } from '@mui/material';

// ----------------------------------------------------------------------

export default function UserTableToolbar({ numSelected, filterName, onFilterName, getData }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [specializationData, setSpecializationData] = useState([]);

  useEffect(() => {
    setSpecializationData(JSON.parse(localStorage.getItem('specialization')));
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Search Doctors..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton onClick={handleClick}>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem dense>
          <Typography variant="h6" component="h6">
            Specialization
          </Typography>
        </MenuItem>
        {specializationData.map((spe, i) => (
          <MenuItem
            dense
            onClick={() => {
              const data = [...specializationData];
              data[i].checked = !spe.checked;
              setSpecializationData([...data]);
            }}
          >
            <Checkbox checked={spe.checked} />
            <ListItemText primary={spe.name} />
          </MenuItem>
        ))}
        <MenuItem dense>
          <Button
            type="primary"
            variant="contained"
            onClick={() => {
              getData(specializationData.filter((data) => data.checked).map((data) => data.name));
            }}
          >
            Apply Filter
          </Button>
        </MenuItem>
      </Menu>
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  getData: PropTypes.func,
};
