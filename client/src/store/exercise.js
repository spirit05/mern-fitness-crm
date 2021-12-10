import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { addAlert } from './alert';

const URL = 'http://localhost:5000/api/exercise';

const slice = createSlice({
    name: 'exercise',
    initialState: {
        isLoading: true,
        data: []
    },
    reducers: {
        isLoading: state => ({
            ...state,
            isLoading: true,
        }),
        setExercise: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        })
    }
});

export const { isLoading, setExercise } = slice.actions;

export const selectLoading = state => state.exercise.isLoading;
export const selectExercises = state => state.exercise.data;

export const getExercisesAsync = (type) => async (dispatch, getState) => {
    dispatch(isLoading());
    await axios.get(`${URL}/${type}`)
                .then(res => dispatch(setExercise(res.data)))
                .catch((e,m) => {
                    dispatch(addAlert({type: 'error', text: m || e.response.data}))
                    console.error(e,m)
                })
}

export const getExerciseAsync = id => async (dispatch, getState) => {
    let exercise;
    await axios.get(`${URL}/${id}`)
                .then(res => exercise = res.data)
                .catch((e,m) => {
                    dispatch(addAlert({type: 'error', text: m || e.response.data}))
                    console.error(e,m)
                })
    return exercise;
}

export const deleteExerciseAsync = id => async (dispatch, getState) => {dispatch(isLoading());
    await axios.delete(`${URL}/${id}`)
                .then(res => addAlert({type: 'success', text: res.data}))
                .catch((e,m) => {
                    dispatch(addAlert({type: 'error', text: m || e.response.data}))
                    console.error(e,m)
                })
    await dispatch(getExercisesAsync());
}

export const addExerciseAsync = form => async (dispatch, getState) => {dispatch(isLoading());
    await axios.post(URL, {...form})
                .then(res => addAlert({type: 'success', text: res.data}))
                .catch((e,m) => {
                    dispatch(addAlert({type: 'error', text: m || e.response.data}))
                    console.error(e,m)
                })
    await dispatch(getExercisesAsync(form.type));
}

export const setExerciseAsync = form => async (dispatch, getState) => {dispatch(isLoading());
    if (form) {
        await axios.put(`${URL}/${form._id}`, {...form})
                .then(res => addAlert({type: 'success', text: res.data}))
                .catch((e,m) => {
                    dispatch(addAlert({type: 'error', text: m || e.response.data}))
                    console.error(e,m)
                })
    await dispatch(getExercisesAsync(form.type));
    }
}


export default slice.reducer;