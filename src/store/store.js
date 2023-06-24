import { configureStore } from "@reduxjs/toolkit";
import locationsReducer from "./locationsSlice";

export default configureStore({
  reducer: {
    local: locationsReducer,
  },
});
