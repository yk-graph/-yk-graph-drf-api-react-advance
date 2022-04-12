import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

// ⑦ configureStore -> sliceを集約して、1つのstoreとしてまとめる（集約する）役割
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
