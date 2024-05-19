import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '6px',
  p: 4,
};

export default function CommonModal({ open, handleClose, content }) {
  console.log('here');
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{content}</Box>
    </Modal>
  );
}

CommonModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.any,
  content: PropTypes.any,
};
