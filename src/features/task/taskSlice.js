import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiUrl = 'http://localhost:8000/tasks/'
const token = localStorage.localJWT
const initialState = {
  tasks: [
    {
      id: 0,
      title: '',
      created_at: '',
      updated_at: '',
    },
  ],
  editedTask: {
    id: 0,
    title: '',
    created_at: '',
    updated_at: '',
  },
  selectedTask: {
    id: 0,
    title: '',
    created_at: '',
    updated_at: '',
  },
}

export const fetchAsyncGet = createAsyncThunk('task/get', async () => {
  const res = await axios.get(apiUrl, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })
  return res.data
})

export const fetchAsyncCreate = createAsyncThunk('task/post', async (task) => {
  const res = await axios.post(apiUrl, task, {
    headers: {
      'content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
  })
  return res.data
})

export const fetchAsyncUpdate = createAsyncThunk('task/put', async (task) => {
  const res = await axios.put(`${apiUrl}${task.id}/`, task, {
    headers: {
      'content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
  })
  return res.data
})

export const fetchAsyncDelete = createAsyncThunk('task/delete', async (id) => {
  await axios.delete(`${apiUrl}${id}/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })
  return id
})

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    editTask(state, action) {
      state.editedTask = action.payload
    },
    selectedTask(state, action) {
      state.selectedTask = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: action.payload,
      }
    })
    builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      }
    })
    builder.addCase(fetchAsyncUpdate.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        selectedTask: action.payload,
      }
    })
    builder.addCase(fetchAsyncDelete.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
        selectedTask: { id: 0, title: '', created_at: '', updated_at: '' },
      }
    })
  },
})

export const { editTask, selectedTask } = taskSlice.actions
export const selectTasks = (state) => state.task.tasks
export const selectSelectTask = (state) => state.task.selectSelectTask
export const selectEditTask = (state) => state.task.editTask

export default taskSlice.reducer
