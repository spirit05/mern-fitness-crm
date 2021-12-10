import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { addAlert } from './alert';

const URL = 'http://localhost:5000/api/coaches';

const slice = createSlice({
    name: 'coach',
    initialState: {
        isLoading: true,
        data: []
    },
    reducers: {
        isLoading: state => ({
            ...state,
            isLoading: true,
        }),
        setCoaches: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        })
    }
});

export const { isLoading, setCoaches } = slice.actions;

export const selectLoading = state => state.coach.isLoading;
export const selectCoaches = state => state.coach.data;

export const getCoachesAsync = () => async (dispatch, getState) => {
    dispatch(isLoading());
    await axios.get(URL)
                .then(res => dispatch(setCoaches(res.data)))
                .catch((e,m) => {
                    dispatch(addAlert({type: 'error', text: m || e.response.data}))
                    console.error(e,m)
                })
}

export const getCoachAsync = id => async (dispatch, getState) => {
    let coach;
    await axios.get(`${URL}/${id}`)
                .then(res => coach = res.data)
                .catch((e,m) => {
                    dispatch(addAlert({type: 'error', text: m || e.response.data}))
                    console.error(e,m)
                })
    dispatch(getCoachesAsync());
    return coach;
}

export const deleteCoachAsync = id => async (dispatch, getState) => {dispatch(isLoading());
    await axios.delete(`${URL}/${id}`)
                .then(res => addAlert({type: 'success', text: res.data}))
                .catch((e,m) => {
                    dispatch(addAlert({type: 'error', text: m || e.response.data}))
                    console.error(e,m)
                })
    dispatch(getCoachesAsync());
}

export const addCoachAsync = form => async (dispatch, getState) => {dispatch(isLoading());
    await axios.post(URL, {...form})
                .then(res => addAlert({type: 'success', text: res.data}))
                .catch((e,m) => {
                    dispatch(addAlert({type: 'error', text: m || e.response.data}))
                    console.error(e,m)
                })
    dispatch(getCoachesAsync());
}

export const setCoachAsync = form => async (dispatch, getState) => {dispatch(isLoading());
    await axios.put(`${URL}/${form.id}`, {...form})
                .then(res => addAlert({type: 'success', text: res.data}))
                .catch((e,m) => {
                    dispatch(addAlert({type: 'error', text: m || e.response.data}))
                    console.error(e,m)
                })
    dispatch(getCoachesAsync());
}


export default slice.reducer;