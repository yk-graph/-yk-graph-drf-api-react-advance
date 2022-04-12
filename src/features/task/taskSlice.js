import { createSlice } from "@reduxjs/toolkit";

// ② initialState -> stateの中身の初期設定
const initialState = {
  idCount: 3,
  tasks: [
    { id: 1, title: "Task A", completed: false },
    { id: 2, title: "Task B", completed: true },
    { id: 3, title: "Task C", completed: false },
  ],
};

// ① createSlice -> sliceを作成する関数
export const taskSlice = createSlice({
  name: "task",
  initialState,
  // ③ reducers -> actionの定義と、処理の内容を記述
  reducers: {
    newTask: (state, action) => {
      state.idCount++;
      const newItem = {
        id: state.idCount,
        title: action.payload,
        completed: false,
      };
      state.tasks = [newItem, ...state.tasks];
    },
    completeTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) task.completed = !task.completed;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
  },
});

// ④ reducers内で定義したactionをexportして、外部ファイルから呼び出せるようにする
export const { newTask, completeTask, deleteTask } = taskSlice.actions;

// ⑤ 現在のstateの値を取得する関数をexportして、外部ファイルから呼び出せるようにする
export const selectTasks = (state) => state.task.takss;

// ⑥ exportしたcounterSliceを src/app/store.js でimportする　※stoer.jsのファイル内でconfigureStore関数を使って他で定義したsliceを集約している
export default taskSlice.reducer;
