import React, { useState } from 'react'
import styles from './LoginRegister.module.css'
import triangle from '../assets/triangle.png'
import circle1 from '../assets/circle1.png'
import circle2 from '../assets/circle2.png'
import Login from '../components/Login'
import Register from '../components/Register'

function LoginRegister({setIsAuthenticated}) {
    const [isLogin, setIsLogin] = useState(true)
  return (
    <div className={styles.loginRegContainer}>
        <img src={triangle} alt="" className={styles.triangle} />
        <img src={circle1} alt="" className={styles.circle1}/>
        <img src={circle2} alt="" className={styles.circle2}/>
        {isLogin ? <Login className={styles.formContainer} setIsLogin={setIsLogin} setIsAuthenticated={setIsAuthenticated} /> : <Register className={styles.formContainer} setIsLogin={setIsLogin} />}
    </div>
  )
}

export default LoginRegister