import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box
} from '@mui/material';
import { useState } from 'react';
import { Login } from '../../store/user';

const flexCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

const AuthPage = () => {
    const [ form, setForm ] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const loginHandler = async e => {
        e.preventDefault();
        await dispatch(Login(form));
        navigate('/');
    }

    return (
        <Container sx={{...flexCenter, height: '90vh'}}>
            <Box sx={{ ...flexCenter,
                    flexDirection: 'column',
                    '& .MuiTextField-root': { m: 3, width: '25ch' },
                }} 
                component='form' 
                noValidate 
                autoComplite='off'
            >
                <Typography variant='h6'>Онлайн CRM система фитнесс-клуба CleanBody</Typography>
                <div>
                    <TextField
                        id="outlined"
                        label="Логин"
                        type="login"
                        name="login"
                        onChange={ changeHandler }
                        autoComplete="username"
                    />
                    <TextField
                        id="outlined-password"
                        label="Пароль"
                        type="password"
                        name="password"
                        onChange={ changeHandler }
                        autoComplete="current-password"
                    />
                </div>
                <Button variant='outlined' onClick={ loginHandler }>Войти</Button>
            </Box>
        </Container>
    )
};

export default AuthPage;