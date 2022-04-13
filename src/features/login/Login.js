import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'

import {
  editPassword,
  editUserName,
  fetchAsyncLogin,
  fetchAsyncRegister,
  selectAuthen,
  selectLoginView,
  toggleMode,
} from './loginSlice'
import styles from './Login.module.css'

const Login = () => {
  const dispatch = useDispatch()
  const authen = useSelector(selectAuthen)
  const isLoginView = useSelector(selectLoginView)

  const btnDisabler = authen.username === '' || authen.password === ''
  const login = async () => {
    if (isLoginView) {
      await dispatch(fetchAsyncLogin(authen))
    } else {
      const result = await dispatch(fetchAsyncRegister(authen))

      if (fetchAsyncRegister.fulfilled.match(result)) {
        await dispatch(fetchAsyncLogin(authen))
      }
    }
  }

  return (
    <div className={styles.containerLogin}>
      <div className={styles.appLogin}>
        <h1>{isLoginView ? 'Login' : 'Register'}</h1>
        <span>username</span>
        <input
          type="text"
          className={styles.inputLog}
          name="username"
          placeholder=""
          onChange={(e) => dispatch(editUserName(e.target.value))}
          required
        />
        <span>password</span>
        <input
          type="password"
          className={styles.inputLog}
          name="password"
          placeholder=""
          onChange={(e) => dispatch(editPassword(e.target.value))}
          required
        />
        <div className={styles.switch}>
          <Button
            variant="contained"
            disabled={btnDisabler}
            color="primary"
            onClick={login}
          >
            {isLoginView ? 'Login' : 'Regster'}
          </Button>
        </div>
        <span
          className={styles.switchText}
          onClick={() => dispatch(toggleMode())}
        >
          {isLoginView ? 'Create Account ?' : 'Back to Login'}
        </span>
      </div>
    </div>
  )
}

export default Login
