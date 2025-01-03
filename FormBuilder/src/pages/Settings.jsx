import React, { useState, useEffect } from 'react'
import styles from './Settings.module.css'
import personIcon from '../assets/personIcon.png'
import emailIcon from '../assets/emailIcon.png'
import passwordIcon from '../assets/lock.png'
import eye from '../assets/eye.png'
import eyeSlash from '../assets/eyeSlash.png'
import { FiLogOut } from 'react-icons/fi'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


function Settings({ handleLogout }) {
    const [name, setName] = useState('')
    const [updateEmail, setUpdateEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [error, setError] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    navigate('/login-register')
                }

                const { data } = await API.get('api/user/settings', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                setName(data.name)
                setUpdateEmail(data.email)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [navigate])

    const handleUpdate = async () => {
        let validationErrors = {}

        if (newPassword) {
            if (!oldPassword) {
                validationErrors.oldPassword = 'Must enter old password'
            }

            if (newPassword.length < 6) {
                validationErrors.newPassword = 'New password must be at least 6 characters long.'
            }
        }

        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors)
            toast.error('Please correct the highlighted errors.')
            return
        }

        try {
            const token = localStorage.getItem('token')
            const { data } = await API.post('api/user/update',
                { name, updateEmail, oldPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            setError({})
            toast.success(data.message)
            handleLogout()
        } catch (error) {
            const field = error.response?.data?.message.toLowerCase().includes('email')
                ? 'email'
                : error.response?.data?.message.toLowerCase().includes('name')
                    ? 'name'
                    : error.response?.data?.message.toLowerCase().includes('new password')
                        ? 'newPassword'
                        : 'oldPassword'
            setError({ [field]: error.response?.data?.message })
            toast.error(error.response?.data?.message || 'Update failed.')
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>Settings</p>
            
            <div className={styles.inputWrapper}>
                <img src={personIcon} className={styles.icon} alt="Name Icon" />
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
            </div>
            {error.name && <p className={styles.error}>{error.name}</p>}

            <div className={styles.inputWrapper}>
                <img src={emailIcon} className={styles.icon} alt="Email Icon" />
                <input
                    type="email"
                    value={updateEmail}
                    onChange={(e) => setUpdateEmail(e.target.value)}
                    placeholder="Update Email"
                />
            </div>
            {error.email && <p className={styles.error}>{error.email}</p>}

            <div>
            <div className={styles.inputWrapper}>
                <img src={passwordIcon} className={styles.icon} alt="Old Password Icon" />
                <input
                    type={showOldPassword ? 'text' : 'password'}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Old Password"
                />
                <span
                    className={styles.eyeIcon}
                    onClick={() => setShowOldPassword(!showOldPassword)}
                >
                    <img
                        src={showOldPassword ? eyeSlash : eye}
                        alt="Toggle Old Password Visibility"
                    />
                </span>
            </div>
            {error.oldPassword && (<p className={styles.error}>{error.oldPassword}</p>)}
            </div>
            <div className={styles.inputWrapper}>
                <img src={passwordIcon} className={styles.icon} alt="New Password Icon" />
                <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                />
                <span
                    className={styles.eyeIcon}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                >
                    <img
                        src={showNewPassword ? eyeSlash : eye}
                        alt="Toggle New Password Visibility"
                    />
                </span>
            </div>
            {error.newPassword && (<p className={styles.error}>{error.newPassword}</p>)}

            <button className={styles.updateBtn} onClick={handleUpdate}>Update</button>

            <button className={styles.logoutBtn} onClick={handleLogout} >
                <FiLogOut className={styles.logoutIcon} /> Log out
            </button>
        </div>
    )
}

export default Settings
