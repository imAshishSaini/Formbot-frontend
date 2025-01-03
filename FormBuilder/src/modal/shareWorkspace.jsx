import React, { useState } from 'react'
import styles from './shareWorkspace.module.css'
import API from '../services/api'
import toast, { Toaster } from 'react-hot-toast'

function shareWorkspace({onClose, workspaceId}) {
    const [email, setEmail] = useState('')
    const [permission, setPermission] = useState('edit')

    const sendInvite = async () => {
        try {
            // Ensure the workspaceId is properly inserted in the URL
            console.log(workspaceId)
            await API.post(`/api/workspace/${workspaceId}/invite`, {
                email,
                permission,
            })
            toast.success('Invite sent successfully!')
            onClose() // Close the modal after sending the invite
        } catch (error) {
            console.error('Error sending invite:', error)
            toast.error('Failed to send invite')
        }
    }
    

    const shareWorkspace = async () => {
        try {
            const { data } = await API.post(`/api/workspace/${workspaceId}/share`, {
                permission,
            })
            navigator.clipboard.writeText(data.link)
            toast.success('Link copied to clipboard!')
            onClose()
        } catch (error) {
            console.error('Error sharing workspace:', error)
            toast.error('Link not generated')
        }
    }
    
  return (
    <div className={styles.shareWorkspace}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                <div className={styles.shareHeader}>
                <h3>Invite by Email</h3>
                <select
                        value={permission}
                        onChange={(e) => setPermission(e.target.value)}
                        className={styles.permissionDropdown}
                    >
                        <option value='edit'>Edit</option>
                        <option value='view'>View</option>
                    </select>
                    </div>
                <div className={styles.inputGroup}>
                    <input
                        type='email'
                        placeholder='Enter email id'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.inputField}
                    />
                </div>
                <button className={styles.sendButton} onClick={sendInvite}>
                    Send Invite
                </button>
                <h3>Invite by Link</h3>
                <button className={styles.copyLinkButton} onClick={shareWorkspace}>
                    Copy Link
                </button>
            </div>
            <Toaster position='top-right' />
        </div>
  )
}

export default shareWorkspace