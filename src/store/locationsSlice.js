import { createSlice } from "@reduxjs/toolkit";

const locationsSlice = createSlice({
  name: "local",
  initialState: {
    locations: [],
    selectedLocation: null,
  },
  reducers: {
    addLocation: (state, action) => {
      state.locations.push(action.payload);
    },
    removeLocation: (state, action) => {
      state.locations = state.locations.filter(
        (location) => location.id !== action.payload.id
      );
    },
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
  },
});

export const {
  addLocation,
  removeLocation,
  setSelectedLocation,
  setLocations,
} = locationsSlice.actions;
export default locationsSlice.reducer;
