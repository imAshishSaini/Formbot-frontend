import React, { useState } from 'react';
import styles from './createFolder.module.css';
import {Toaster, toast} from 'react-hot-toast'

function CreateFolder({ onClose, onCreate }) {
    const [folderName, setFolderName] = useState('');

    const handleDone = () => {
        if (folderName.trim()) {
            onCreate(folderName)
            onClose()
        } else {
            toast.error('Please enter a folder name');
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.createFolderHeader}>
                    <p className={styles.title}>Create New Folder</p>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Enter folder name"
                        className={styles.input}
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                    />
                </div>

                <div className={styles.actions}>
                    <button className={styles.doneBtn} onClick={handleDone}>
                        Done
                    </button>
                    <span className={styles.divider} />
                    <button className={styles.cancelBtn} onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
            <Toaster position="top-right" />
        </div>
    );
}

export default CreateFolder;
