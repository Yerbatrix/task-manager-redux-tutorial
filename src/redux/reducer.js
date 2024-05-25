import { createReducer, createSlice } from '@reduxjs/toolkit';
import { statusFilters } from './constants';
import {
  addTask,
  deleteTask,
  toggleCompleted,
  setStatusFilter,
} from './actions';
