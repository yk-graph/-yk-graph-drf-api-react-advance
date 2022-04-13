import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import taskSliceer from "../features/task/taskSlice";
import fetchSlicer from "../features/fetch/FetchSlice";

// ⑦ configureStore -> sliceを集約して、1つのstoreとしてまとめる（集約する）役割
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    task: taskSliceer,
    fetch: fetchSlicer,
  },
});
