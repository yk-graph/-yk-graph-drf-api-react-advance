import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiUrl = 'http://localhost:8000/'
const token = localStorage.localJWT
const initialState = {
  authen: {
    username: '',
    password: '',
  },
  isLoginView: true,
  profile: {
    id: 0,
    username: '',
  },
}

export const fetchAsyncLogin = createAsyncThunk('login/post', async (auth) => {
  const res = await axios.post(`${apiUrl}authen/jwt/create/`, auth, {
    headers: {
      'content-Type': 'application/json',
    },
  })
  return res.data
})

export const fetchAsyncRegister = createAsyncThunk(
  'login/register',
  async (auth) => {
    const res = await axios.post(`${apiUrl}authen/jwt/register/`, auth, {
      headers: {
        'content-Type': 'application/json',
      },
    })
    return res.data
  }
)

export const fetchAsyncProfile = createAsyncThunk('login/get', async () => {
  const res = await axios.post(`${apiUrl}api/myself/`, {
    Authorization: `JWT ${token}`,
  })
  return res.data
})

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    editUserName(state, action) {
      state.authen.username = action.payload
    },
    editPassword(state, action) {
      state.authen.password = action.payload
    },
    toggleMode(state) {
      state.isLoginView = !state.isLoginView
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem('localJWT', action.payload.access)
      action.payload.access && (window.location.href = '/tasks')
    })
    builder.addCase(fetchAsyncProfile.fulfilled, (state, action) => {
      state.profile = action.payload
    })
  },
})

export const { editUserName, editPassword, toggleMode } = loginSlice.actions
export const selectAuthen = (state) => state.login.authen
export const selectLoginView = (state) => state.login.isLoginView
export const selectProfile = (state) => state.login.profile

export default loginSlice.reducer
