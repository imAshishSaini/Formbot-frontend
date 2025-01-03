import React from 'react'
import styles from './deleteForm.module.css'

function deleteForm({ onClose, onDelete }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.deleteFormModal}>
                <div className={styles.deleteFormHeader}>
                    <p className={styles.title}>Are you sure you want to
                        delete this form ?</p>
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

export default deleteForm