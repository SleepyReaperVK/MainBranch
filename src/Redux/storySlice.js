import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storyIndex: 0,
};

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    setStoryIndex: (state, action) => {
      state.storyIndex = action.payload;
    },
  },
});

export const { setStoryIndex } = storySlice.actions;

export default storySlice.reducer;
