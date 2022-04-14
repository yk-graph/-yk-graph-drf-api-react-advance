import React from 'react'

import TaskList from './features/task/TaskList'
import TaskDetails from './features/task/TaskDetails'
import styles from './App.module.css'
import { FaSignOutAlt } from 'react-icons/fa'

const App = () => {
  const logout = () => {
    localStorage.removeItem('localJWT')
    window.location.href = '/'
  }

  return (
    <div className={styles.containerTasks}>
      <div className={styles.appTasks}>
        <button onClick={logout} className={styles.signBtn}>
          <FaSignOutAlt />
        </button>
        <TaskList />
      </div>
      <div className={styles.appDetails}>
        <TaskDetails />
      </div>
    </div>
  )
}

export default App
