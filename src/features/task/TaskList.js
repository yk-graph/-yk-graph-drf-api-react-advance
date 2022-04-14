import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectTasks, fetchAsyncGet } from './taskSlice'
import { fetchAsyncProfile } from '../login/loginSlice'
import TaskItem from './TaskItem'
import styles from './TaskList.module.css'

const TaskList = () => {
  const dispatch = useDispatch()
  const tasks = useSelector(selectTasks)

  useEffect(() => {
    const fetchInitData = async () => {
      await dispatch(fetchAsyncGet())
      await dispatch(fetchAsyncProfile())
    }
    fetchInitData()
  }, [])

  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}

export default TaskList
