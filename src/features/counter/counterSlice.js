import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "./counterAPI";

// ② initialState -> stateの中身の初期設定
const initialState = {
  value: 0,
  status: "idle",
};

export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// ① createSlice -> sliceを作成する関数
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // ③ reducers -> actionの定義と、処理の内容を記述
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  // extraReducers -> 他の場所・スライスで定義されたアクションを処理できるようにする※createAsyncThunkや他のスライスで生成されたアクションを含む
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload;
      });
  },
});

// ④ reducers内で定義したactionをexportして、外部ファイルから呼び出せるようにする
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// ⑤ 現在のstateの値を取得する関数をexportして、外部ファイルから呼び出せるようにする
export const selectCount = (state) => state.counter.value;

// 同期処理・非同期処理を内容を記述できる※ここでは、現在の状態に応じて条件付きでアクションをディスパッチする例
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

// ⑥ exportしたcounterSliceを src/app/store.js でimportする　※stoer.jsのファイル内でconfigureStore関数を使って他で定義したsliceを集約している
export default counterSlice.reducer;
