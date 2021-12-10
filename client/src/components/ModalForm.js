import { useEffect, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import CustomForm from './FormField';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalForm({
    isOpen,
    name,
    form,
    fields = [], 
    handleForm
  }) {
    const { open, setOpen } = isOpen;
    const [handleSet = undefined, handleAdd = undefined ] = handleForm;

  useEffect(() => {
    setOpen(open);
  }, [open, setOpen])

  const handleClose = () => setOpen(!open);

  const handleSendForm = () => !!form[0]._id 
                              ? (handleAdd && handleAdd(form[0]))
                              : (handleSet && handleSet(form[0])); 

  return (
    <div>
      <Dialog
        fullScreen
        open={ open }
        onClose={ handleClose }
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
              <Typography sx={{ ml: 2, flex: 1, textAlign: 'center' }} variant="h6" component="div">
                  { name }
              </Typography>
            <Button autoFocus color="inherit" onClick={ handleSendForm }>
                { !!form[0]._id ? 'Сохранить' : 'Добавить' }
            </Button>
          </Toolbar>
        </AppBar>
        <Stack
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <CustomForm fields={ fields } form={ form[0] } onForm={ form[1] }/>
        </Stack>
      </Dialog>
    </div>
  );
}
