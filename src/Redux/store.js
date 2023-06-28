import { configureStore } from '@reduxjs/toolkit';
import storyReducer from './storySlice';

const store = configureStore({
  reducer: {
    story: storyReducer,
    // Add other reducers here if needed
  },
});

export default store;