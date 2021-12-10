import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { addAlert } from './alert';

const URI = 'http://localhost:5000/api/clients';

const slice = createSlice({
    name: 'client',
    initialState: {
        isLoading: true,
        data: []
    },
    reducers: {
        setClient: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload
        }),
        setLoading: (state) => ({
            ...state,
            isLoading: true
        })
    }
})

export const { setClient, setLoading } = slice.actions;

export const selectClient = state => state.client.data;
export const selectLoading = state => state.client.isLoading;

export const getClientsAsync = () => async (dispatch, getState) => {
    getState();
    dispatch(setLoading());
    await axios.get(URI)
            .then(res => dispatch(setClient(res.data)))
            .catch((e,m) => {
                dispatch(addAlert({type: 'error', text: m || e.response.data}))
                console.error(e,m)
            })
}

export const getClientAsync = id => async dispatch => {
    let client = {};
    await axios.get(`${URI}/${id}`)
                        .then(res => client = res.data)
                        .catch((e,m) => {
                            dispatch(addAlert({type: 'error', text: m || e.response.data}))
                            console.error(e,m)
                        });
    return client;
}

export const deleteClientAsync = id => async dispatch => {
    await axios.delete(`${URI}/${id}`)
               .then(res => addAlert({type: 'success', text: res.data}))
               .catch((e,m) => {
                    dispatch(addAlert({type: 'error', text: m || e.response.data}))
                    console.error(e,m)
                })
    await dispatch(getClientsAsync());
}

export const addClientAsync = data => async dispatch => {
    await axios.post(URI, {...data})
                .then(res => addAlert({type: 'success', text: res.data}))
                .catch((e,m) => {
                    dispatch(addAlert({type: 'error', text: m || e.response.data}))
                    console.error(e,m)
                })
    await dispatch(getClientsAsync());
}

export const setClientAsync = data => async dispatch => {
    await axios.put(`${URI}/${data._id}`, {...data})
                .then(res => addAlert({type: 'success', text: res.data}))
                .catch((e,m) => {
                    dispatch(addAlert({type: 'error', text: m || e.response.data}))
                    console.error(e,m)
                })
    await dispatch(getClientsAsync());
}

export default slice.reducer;
