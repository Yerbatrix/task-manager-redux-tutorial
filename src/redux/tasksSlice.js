import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks, addTask, deleteTask, toggleCompleted } from './operations';

const tasksInitialState = [
  // { id: 0, text: 'Learn HTML and CSS', completed: true },
  // { id: 1, text: 'Get good at JavaScript', completed: true },
  // { id: 2, text: 'Master React', completed: false },
  // { id: 3, text: 'Discover Redux', completed: false },
  // { id: 4, text: 'Build amazing apps', completed: false },
];

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const isPendingAction = action => {
  return action.type.endsWith('/pending');
};

const isRejectAction = action => {
  return action.type.endsWith('/rejected');
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: tasksInitialState,
    isLoading: false,
    error: null,
  },

  extraReducers: builder => {
    builder

      // Fulfilled cases
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(toggleCompleted.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        state.items[index].completed = !state.items[index].completed;
      })
      .addMatcher(isPendingAction, handlePending)
      .addMatcher(isRejectAction, handleRejected);
  },
});

export const tasksReducer = tasksSlice.reducer;
