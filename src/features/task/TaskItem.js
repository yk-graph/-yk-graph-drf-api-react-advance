import React from 'react'
import { useDispatch } from 'react-redux'

import { fetchAsyncDelete, editTask, selectTask } from './taskSlice'
import { BsTrash } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import styles from './TaskItem.module.css'

const TaskItem = ({ task }) => {
  const dispatch = useDispatch()

  return (
    <li className={styles.listItem}>
      <span
        className={styles.cursol}
        onClick={() => dispatch(selectTask(task))}
      >
        {task.title}
      </span>
      <div>
        <button
          className={styles.taskIcon}
          onClick={() => dispatch(fetchAsyncDelete(task.id))}
        >
          <BsTrash />
        </button>
        <button
          className={styles.taskIcon}
          onClick={() => dispatch(editTask(task))}
        >
          <FaEdit />
        </button>
      </div>
    </li>
  )
}

export default TaskItem
