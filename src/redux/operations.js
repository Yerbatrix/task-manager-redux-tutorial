import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchingInProgress,
  fetchingSuccess,
  fetchingError,
} from './tasksSlice';

axios.defaults.baseURL = 'https://6652debd813d78e6d6d67116.mockapi.io';

export const fetchTasks = () => async dispatch => {
  try {
    dispatch(fetchingInProgress());
    const response = await axios.get('/contacts');
    dispatch(fetchingSuccess(response.data));
  } catch (e) {
    dispatch(fetchingError(e.message));
  }
};

// export const addTask = createAsyncThunk(
//   'tasks/addTask',
//   async (text, thunkAPI) => {
//     try {
//       const response = await axios.post('/tasks', { text });
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );
