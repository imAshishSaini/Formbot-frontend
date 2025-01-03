import React, { useState, useEffect } from 'react'
import styles from './workspaceNavbar.module.css'
import ShareWorkspace from '../modal/shareWorkspace'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

function WorkspaceNavbar({ isDarkMode, toggleTheme, handleLogout, setSelectedWorkspaceId }) {
    const [showShareModal, setShowShareModal] = useState(false)
    const [workspaceId, setWorkspaceId] = useState(null)
    const [userWorkspaces, setUserWorkspaces] = useState([])
    const [sharedWorkspaces, setSharedWorkspaces] = useState([])
    const [selectedWorkspace, setSelectedWorkspace] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                const { data } = await API.get('/api/workspace', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                } )
                setUserWorkspaces(data.userWorkspaces)
                setSharedWorkspaces(data.sharedWorkspaces)
                setSelectedWorkspaceId(data.userWorkspaces[0].id)
                setWorkspaceId(data.userWorkspaces[0].id)
                console.log(data.userWorkspaces[0].id)
            } catch (error) {
                console.error('Error fetching workspaces:', error.message)
            }
        }

        fetchWorkspaces()
    }, [])

    const handleWorkspaceSelect = (e) => {
        const value = e.target.value
        setSelectedWorkspace(value)

        if (value === 'settings') {
            navigate('/settings')
        } else if (value === 'logout') {
            handleLogout()
        } else {
            setSelectedWorkspaceId(value)
            setWorkspaceId(value)
        }
    }

    return (
        <div className={styles.header}>
            <div></div>
            <div className={styles.title}>
                <select
                    value={selectedWorkspace}
                    onChange={handleWorkspaceSelect}
                    className={styles.filterDropDown}
                >
                    {userWorkspaces.map((workspace) => (
                        <option key={workspace} value={workspace.id}>
                            {workspace.ownerName}'s Workspace
                        </option>
                    ))}
                    {sharedWorkspaces.map((workspace) => (
                        <option key={workspace} value={workspace.id}>
                            {workspace.ownerName}'s Workspace
                        </option>
                    ))}
                    <option value="settings">Settings</option>
                    <option value="logout">Logout</option>
                </select>
            </div>

<div className={styles.navLeft}>
            <div className={styles.themeToggle}>
                <label>
                    Light
                    <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
                    <span className={styles.toggleSwitch}></span>
                    Dark
                </label>
            </div>

            <button className={styles.shareButton} onClick={() => setShowShareModal(true)}>
                Share
            </button>
            </div>

            {showShareModal && (
                <ShareWorkspace onClose={() => setShowShareModal(false)} workspaceId={workspaceId} />
            )}
        </div>
    )
}

export default WorkspaceNavbar
