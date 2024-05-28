import { createSlice, nanoid } from '@reduxjs/toolkit';

const tasksInitialState = [
  // { id: 0, text: 'Learn HTML and CSS', completed: true },
  // { id: 1, text: 'Get good at JavaScript', completed: true },
  // { id: 2, text: 'Master React', completed: false },
  // { id: 3, text: 'Discover Redux', completed: false },
  // { id: 4, text: 'Build amazing apps', completed: false },
];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: tasksInitialState,
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchingInProgress(state) {
      state.isLoading = true;
    },
    fetchingSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    fetchingError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addTask: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            text,
            id: nanoid(),
            completed: false,
          },
        };
      },
    },
    deleteTask(state, action) {
      const index = state.items.findIndex(task => task.id === action.payload);
      state.items.splice(index, 1);
    },
    toggleCompleted(state, action) {
      for (const task of state.items) {
        if (task.id === action.payload) {
          task.completed = !task.completed;
          break;
        }
      }
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleCompleted,
  fetchingInProgress,
  fetchingSuccess,
  fetchingError,
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
