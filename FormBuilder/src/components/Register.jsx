import React, {useState} from 'react'
import styles from './Register.module.css'
import GoogleIcon from '../assets/Google.png'
import API from '../services/api'
import { Toaster, toast } from 'react-hot-toast'

function Register({ setIsLogin }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState()

    const handleRegister = async () => {
        try {
            if(password !== confirmPassword) {
                toast.error('Passwords do not match')
            } else {
                const {data} = await API.post('api/user/register', {name, email, password})
                toast.success('User registered successfully')
                setIsLogin(true)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

    return (
        <div className={styles.registerForm}>
            <div>
                <p>Username</p>
                <input type='text' value={name} onChange={e => setName(e.target.value)} placeholder='Enter your username' required />
            </div>
            <div>
                <p>Email</p>
                <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter your email' required />
            </div>
            <div>
                <p>Password</p>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='**********' required />
            </div>
            <div>
                <p>Confirm Password</p>
                <input type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='**********' required />
            </div>
            <button type='submit' className={styles.signupButton} onClick={handleRegister}>Sign Up</button>
            <p>OR</p>
            <button className={styles.googleButton}><img src={GoogleIcon} alt="" />Sign Up with Google</button>
            <p className={styles.loginText}>Already have an account? <span onClick={() => setIsLogin(true)} className={styles.loginLink}>Login</span></p>
            <Toaster position='top-right' />
        </div>
    )
}

export default Register