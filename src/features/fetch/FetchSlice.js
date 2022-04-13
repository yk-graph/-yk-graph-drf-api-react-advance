// ① 非同期処理を実装するときはcreateAsyncThunkをimportする
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://jsonplaceholder.typicode.com/users";

// ③ 非同期処理を書く場合はsliceの外に処理の内容を記述する
// createAsyncThunk関数 -> 第一引数：アクション名 ※スライスの名前/メソッド名 で命名する慣習あり
// createAsyncThunk関数 -> 第二引数：async () => {} として非同期関数を作成
export const fetchAsyncGet = createAsyncThunk("fetch/get", async () => {
  const res = await axios.get(apiUrl);
  return res.data;
});

// ② createSlice関数を使ってsliceを作成する
const fetchSlice = createSlice({
  // name -> sliceの命名。state.命名したslice名.参照したいプロパティ でstateを参照できる
  name: "fetch",
  initialState: { users: [] },
  reducers: {},
  // ④ createAsyncThunkを使った非同期処理をした場合、処理後の挙動をextraReducersを使って記述する必要がある
  // extraReducers関数 -> はbuilderという引数を受け取って、builderに対してメソッドを当てていく
  extraReducers: (builder) => {
    // builder.addCaseの中の記述 -> 第一引数：createAsyncThunkの返り値に対して[ fulfilled ][ pending ][ rejected ]などの処理を指定する
    // fulfilled -> 非同期処理が成功した時の挙動を指定する場合
    // pending -> 非同期処理が処理中の時の挙動を指定する場合
    // rejected -> 非同期処理が失敗した時の挙動を指定する場合
    // builder.addCaseの中の記述 -> 第二引数：stateとactionを受け取ってstateを更新する処理を記述
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        // action.payloadの中身はfetchAsyncGetでreturnしてるres.dataの値
        users: action.payload,
      };
    });
  },
});

// ⑤ 現在のstateの値を取得する関数をexportして、外部ファイルから呼び出せるようにする
export const selectUsers = (state) => state.fetch.users;

// ⑥ exportしたfetchSliceを src/app/store.js でimportする　※stoer.jsのファイル内でconfigureStore関数を使って他で定義したsliceを集約している
export default fetchSlice.reducer;
