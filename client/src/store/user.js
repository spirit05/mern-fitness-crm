import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

import { addAlert } from './alert';

const storageName = 'usrDta';

const userState = JSON.parse(localStorage.getItem(storageName));

const slice = createSlice({
    name: 'user',
    initialState: {
        isLogin:  !!userState || false,
        data: userState
    },
    reducers: {
        login: (state, action) => ({
            isLogin: true,
            data: action.payload
        }),
        logout: () => ({
            isLogin: false,
            data: {}
        })
    }
})

export const { login, logout } = slice.actions;

export const selectLogin = state => state.user.isLogin;
export const selectUser = state => state.user.data;

export const Login = data => async (dispatch, getState) => {
    if (data) {
        await axios.post('http://localhost:5000/login', {...data})
            .then(res => (dispatch(login(res.data), res)))
            .then(res => localStorage.setItem(storageName, JSON.stringify(res.payload)))
            .catch((e,m) => {
                getState();
                dispatch(addAlert({type: 'error', text: m || e.response.data}))
                console.error(e,m)
            })
    }
}

export const Logout = () => dispatch => {
    localStorage.removeItem(storageName);
    dispatch(logout());
}

export default slice.reducer;
