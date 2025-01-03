import React from 'react'
import styles from './deleteFolder.module.css'

function deleteFolder({ onClose, onDelete }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.deleteFolderModal}>
                <div className={styles.deleteFolderHeader}>
                    <p className={styles.title}>Are you sure you want to
                        delete this folder ?</p>
                </div>

                <div className={styles.actions}>
                    <button className={styles.confirmBtn} onClick={onDelete} >
                        Confirm
                    </button>
                    <span className={styles.divider} />
                    <button className={styles.cancelBtn} onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default deleteFolder