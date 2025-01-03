import React, { useState, useEffect } from 'react'
import styles from './Workspace.module.css'
import WorkspaceNavbar from '../components/workspaceNavbar'
import folderIcon from '../assets/folder.png'
import deleteIcon from '../assets/delete.png'
import CreateFolder from '../modal/createFolder'
import DeleteFolder from '../modal/deleteFolder'
import DeleteForm from '../modal/deleteForm'
import API from '../services/api'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


function Workspace({ handleLogout }) {
    const [folders, setFolders] = useState([])
    const [selectedFolder, setSelectedFolder] = useState(folders[0])
    const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null)
    const [typebots, setTypebots] = useState([])
    const [isDarkMode, setIsDarkMode] = useState(true)
    const [createFolderModal, setCreateFolderModal] = useState(false)
    const [deleteFolderModal, setDeleteFolderModal] = useState(false)
    const [deleteFormModal, setDeleteFormModal] = useState(false)
    const [deleteFolderID, setDeleteFolderID] = useState(null)
    const [formToDelete, setFormToDelete] = useState(null)
    const [permission, setPermission] = useState('edit')

    const navigate = useNavigate()

    const createFolder = async (name) => {
        try {
            const { data } = await API.post('api/folder/create', { name, selectedWorkspaceId })
            setFolders([...folders, data])
            setCreateFolderModal(false)
        } catch (error) {
            console.log(error)
        }
    }

    const createTypebot = async () => {
        try {
            const name = `Form ${typebots.length + 1}`
            const fields = []
            const payload = {
                name,
                fields,
                folderId: selectedFolder ? selectedFolder._id : null,
                workspaceId: !selectedFolder ? selectedWorkspaceId : null,
            }

            const { data } = await API.post('api/form/create', payload)
            setTypebots([...typebots, data])
        } catch (error) {
            console.error('Error creating form:', error.message)
        }
    }

    useEffect(() => {
        const fetchForms = async () => {
            try {
                if (selectedFolder) {
                    const { data } = await API.get(`api/form?folderId=${selectedFolder._id}`)
                    setTypebots(data)
                } else if (selectedWorkspaceId) {
                    const { data } = await API.get(`api/form?workspaceId=${selectedWorkspaceId}`)
                    setTypebots(data)
                }
            } catch (error) {
                console.error('Error fetching forms:', error.message)
            }
        }

        fetchForms()
    }, [selectedFolder, selectedWorkspaceId])

    const deleteFolder = async () => {
        try {
            await API.delete(`api/folder/${deleteFolderID}`)
            setFolders(folders.filter((folder) => folder._id !== deleteFolderID))
            setDeleteFolderModal(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleFolderSelect = (folder) => {
        if (selectedFolder == folder) {
            setSelectedFolder(null)
        } else {
            setSelectedFolder(folder)
        }
    }

    const handleDeleteForm = async () => {
        try {
            await API.delete(`api/form/${formToDelete}`)
            setTypebots(typebots.filter((form) => form._id !== formToDelete))
            setDeleteFormModal(false)
        } catch (error) {
            console.error('Error deleting form:', error.message)
        }
    }

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode)
    }

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const { data } = await API.get(`api/folder?workspaceId=${selectedWorkspaceId}`)
                setFolders(data)
            } catch (error) {
                console.error('Error fetching folders:', error.message)
            }
        }
        fetchFolders()
    }, [selectedWorkspaceId])

    const handleFormClick = (formId) => {
        navigate(`/form?id=${formId}`)
    }

    return (
        <div className={`${styles.workspaceContainer} ${isDarkMode ? styles.dark : styles.light}`}>
            <WorkspaceNavbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} handleLogout={handleLogout} setSelectedWorkspaceId={setSelectedWorkspaceId} setPermission={setPermission} />
            <div className={styles.gridContainer}>
                <div className={styles.folders}>
                    <button className={styles.createFolderButton} onClick={() => setCreateFolderModal(true)}>
                        <img src={folderIcon} alt="" />
                        Create a folder
                    </button>
                    {folders.map((folder, index) => (
                        <div
                            key={index}
                            className={`${styles.folderGrid} ${styles.folder} ${selectedFolder?._id === folder._id ? styles.selectedFolder : ''
                                }`}
                            onClick={() => handleFolderSelect(folder)}
                        >
                            <span className={styles.folderLabel}>{folder.name}</span>
                            <img src={deleteIcon} alt="" onClick={(e) => { e.stopPropagation(); setDeleteFolderModal(true); setDeleteFolderID(folder._id) }} />
                        </div>
                    ))}
                </div>
                <div className={styles.forms}>
                    <div className={styles.createFormButton} onClick={createTypebot}>
                        <h2>+</h2>
                        <p>Create a typebot</p>
                    </div>
                    {typebots.map((typebot, index) => (
                        <div
                            key={index}
                            className={`${styles.botGrid} ${styles.typebot}`}
                            onClick={() => handleFormClick(typebot._id)}
                        >
                            <span className={styles.typebotLabel}>{typebot.name}</span>
                            <img src={deleteIcon} alt="" onClick={() => { setDeleteFormModal(true); setFormToDelete(typebot._id) }} className={styles.deleteForm} />
                        </div>
                    ))}
                </div>
            </div>
            {createFolderModal && <CreateFolder onClose={() => setCreateFolderModal(false)} onCreate={createFolder} />}
            {deleteFolderModal && <DeleteFolder onClose={() => setDeleteFolderModal(false)} onDelete={deleteFolder} />}
            {deleteFormModal && <DeleteForm onClose={() => setDeleteFormModal(false)} onDelete={handleDeleteForm} />}
            <Toaster position='top-right' />
        </div>
    )
}

export default Workspace
