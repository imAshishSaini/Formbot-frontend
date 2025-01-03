import React, { useState } from 'react'
import styles from './Login.module.css'
import GoogleIcon from '../assets/Google.png'
import API from '../services/api'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Login({setIsLogin, setIsAuthenticated}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const {data} = await API.post('api/user/login', {email, password})
      localStorage.setItem('token', data.token)
      toast.success('Login successful')
      setIsAuthenticated(true)
      navigate('/workspace')
    } catch (error) {
      console.log(error)
      toast.error('Invalid email or password')
    }
  }

  return (
    <div className={styles.loginForm}>
        <div>
            <p>Email</p>
            <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter your email' required/>
        </div>
        <div>
            <p>Password</p>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='**********' required/>
        </div>
        <button type='submit' onClick={handleLogin} className={styles.loginButton}>Log In</button>
        <p>OR</p>
        <button className={styles.googleButton}><img src={GoogleIcon} alt="" />Sign In with Google</button>
        <p className={styles.registerText}>Don't have an account? <span onClick={() => setIsLogin(false)} className={styles.registerLink}>Register now</span></p>
        <Toaster position='top-right'/>
    </div>
  )
}

export default Login