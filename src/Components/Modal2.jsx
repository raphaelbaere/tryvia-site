import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import raphael from '../Imagens/raphael.jpg';
import '../App.css';
import { Avatar, Link } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal2() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button sx={ { color: 'black', position: 'absolute', top: 16, left: 150 } } onClick={ handleOpen }>About</Button>
      <Modal
        open={ open }
        onClose={ handleClose }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ style }>
          <Typography sx={ { textAlign: 'center' } } id="modal-modal-title" variant="h6" component="h2">
            Tryvial Team
          </Typography>
          <div className="container">
          <Avatar alt="Remy Sharp" src={ raphael } sx={ { width: 100, height: 100 } } />
          <p class="avatar-desc"> A young man, with a deep love for programming. He came across with this project while studying at Trybe. He has 21 years and were born and lives in Brazil.</p>
          </div>
          <Link href="https://www.linkedin.com/in/raphael-baere/" target="_blank" sx={ { color: 'blue', textDecoration: 'none', marginLeft: 0.5 } }>Raphael Baere</Link>
        </Box>
      </Modal>
    </div>
  );
}
