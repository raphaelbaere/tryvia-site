import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button sx={ { color: 'black', position: 'absolute', top: 16, left: 212 } } onClick={ handleOpen }>How to play?</Button>
      <Modal
        open={ open }
        onClose={ handleClose }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ style }>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Como jogar?
          </Typography>
          <Typography id="modal-modal-description" sx={ { mt: 2 } }>
            O jogo é simples. Ele possui uma básica mecânica de pergunta e resposta. Quando você acerta, pontos são somados ao seu score de acordo com a dificuldade da pergunta e o tempo levado para que você a respondesse. Quão rápido você responder e mais difícil a pergunta for, mais pontos você somará no placar. No botão SETTINGS, você pode configurar o TRYVIA do jeito que mais lhe agrada. Espero que goste!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
