import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './FormPage.module.css'
import closeIcon from '../assets/closeIcon.png'
import textInput from '../assets/textInput.png'
import imgInput from '../assets/imgInput.png'
import videoInput from '../assets/videoInput.png'
import gifInput from '../assets/gifInput.png'
import tIcon from '../assets/tIcon.png'
import numIcon from '../assets/numIcon.png'
import atIcon from '../assets/atIcon.png'
import phoneIcon from '../assets/phoneIcon.png'
import dateIcon from '../assets/dateIcon.png'
import ratingIcon from '../assets/ratingIcon.png'
import btnIcon from '../assets/btnIcon.png'
import flagIcon from '../assets/flag.png'
import flagWhite from '../assets/flagWhite.png'
import deleteIcon from '../assets/delete.png'
import { Doughnut } from 'react-chartjs-2'
import 'chart.js/auto'
import API from '../services/api'
import { Toaster, toast } from 'react-hot-toast'

function FormBuilder() {
    const [theme, setTheme] = useState('dark')
    const [activeTab, setActiveTab] = useState('flow')
    const [searchParams] = useSearchParams()
    const formId = searchParams.get('id')
    const [formDetails, setFormDetails] = useState(null)
    const [formElements, setFormElements] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchForm = async () => {
          try {
            const response = await API.get(`/api/form/${formId}`)
            const { fields } = response.data // Assuming `fields` is the array of pre-stored fields
            console.log(fields)
            setFormElements(fields)
          } catch (error) {
            console.error('Error fetching form:', error)
          }
        }
    
        fetchForm()
      }, [formId])

    const handleAddElement = (type) => {
        setFormElements([...formElements, { type, id: Date.now() }])
    }

    const handleDeleteElement = (id) => {
        setFormElements(formElements.filter((el) => el.id !== id))
    }

    const stats = {
        views: 6,
        starts: 100,
        completed: 33,
        completionRate: (33 / 100) * 100,
    }

    const chartData = {
        datasets: [
            {
                data: [stats.completed, stats.starts - stats.completed],
                backgroundColor: ['#3498db', '#d3d3d3'],
                borderWidth: 0,
            },
        ],
        labels: ['Completed', 'Incomplete'],
    }

    const handleShare = () => {
        const sharableLink = `${window.location.origin}/user-form/${formId}`
        navigator.clipboard.writeText(sharableLink)
            .then(() => {
                toast.success('Link copied to clipboard!')
            })
            .catch((err) => {
                console.error('Failed to copy link:', err)
            })
    }

    const handleSave = async () => {
        const payload = {
            formId: formId,
            name: formDetails?.name || 'Untitled Form',
            fields: formElements.map(el => ({
                label: el.type === 'text' || el.type === 'image' ? el.label || '' : '', // Customize as needed
                type: el.type,
                isUserInput: el.type !== 'text' && el.type !== 'image' && el.type !== 'video' && el.type !== 'gif',
            })),
        }
    
        try {
            console.log(payload)
            const response = await API.post('/api/form/save', payload, {
                headers: { 'Content-Type': 'application/json' },
            })
    
        } catch (error) {
            console.error('Error saving form:', error)
        }
    }
    
    return (
        <div className={`${styles.container} ${styles[theme]}`}>
            <div className={`${styles.navBar} ${styles[theme]}`}>
                <div className={styles.formName}>
                    <input
                        type='text'
                        value={formDetails?.name || ''}
                        onChange={(e) => setFormDetails({ ...formDetails, name: e.target.value })}
                        placeholder='Enter Form Name'
                        className={styles.formNameInput}
                    />
                </div>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'flow' ? styles.activeTab : ''
                            }`}
                        onClick={() => setActiveTab('flow')}
                    >
                        Flow
                    </button>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'response' ? styles.activeTab : ''
                            }`}
                        onClick={() => setActiveTab('response')}
                    >
                        Response
                    </button>
                </div>
                <div className={styles.actionSection}>
                    <div className={styles.themeToggle}>
                        <label>
                            Light
                            <input
                                type='checkbox'
                                checked={theme === 'dark'}
                                onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                            />
                            <span className={styles.toggleSwitch}></span>
                            Dark
                        </label>
                    </div>
                    <button className={styles.shareButton} onClick={handleShare}>Share</button>
                    <button className={styles.saveButton} onClick={handleSave}>Save</button>
                    <img src={closeIcon} alt='Close Icon' className={styles.closeIcon} />
                </div>
            </div>
            {/* <FormNavBar setActiveTab={setActiveTab} activeTab={activeTab} theme={theme} setTheme={setTheme} /> */}
            <div className={styles.content}>
                {activeTab === 'flow' &&
                    <div className={`${styles.flowSection} ${styles[theme]}`}>
                        {/* Left Section (Bubbles) */}
                        <div className={styles.leftSection}>
                            <p>Bubbles</p>
                            <div className={styles.bubbles}>
                                <div onClick={() => handleAddElement('text')} className={styles.box}>
                                    <img src={textInput} alt='Text Input' />
                                    Text
                                </div>
                                <div onClick={() => handleAddElement('image')} className={styles.box}>
                                    <img src={imgInput} alt='Image Input' />
                                    Image
                                </div>
                                <div className={styles.box}>
                                    <img src={videoInput} alt='Video Input' />
                                    Video
                                </div>
                                <div className={styles.box}>
                                    <img src={gifInput} alt='GIF Input' />
                                    GIF
                                </div>
                            </div>

                            <p>Inputs</p>
                            <div className={styles.inputsSection}>
                                <div onClick={() => handleAddElement('textInput')} className={styles.box}>
                                    <img src={tIcon} alt='Text' />
                                    Text
                                </div>
                                <div onClick={() => handleAddElement('number')} className={styles.box}>
                                    <img src={numIcon} alt='Number Input' />
                                    Number
                                </div>
                                <div onClick={() => handleAddElement('email')} className={styles.box}>
                                    <img src={atIcon} alt='Email Input' />
                                    Email
                                </div>
                                <div onClick={() => handleAddElement('phone')} className={styles.box}>
                                    <img src={phoneIcon} alt='Phone Input' />
                                    Phone
                                </div>
                                <div onClick={() => handleAddElement('date')} className={styles.box}>
                                    <img src={dateIcon} alt='Date Input' />
                                    Date
                                </div>
                                <div onClick={() => handleAddElement('rating')} className={styles.box}>
                                    <img src={ratingIcon} alt='Rating Input' />
                                    Rating
                                </div>
                                <div onClick={() => handleAddElement('button')} className={styles.box}>
                                    <img src={btnIcon} alt='Button Input' />
                                    Button
                                </div>
                            </div>
                        </div>

                        {/* Right Section (Canvas) */}
                        <div className={styles.rightSection}>
                            <div className={styles.startBox}>
                                <img src={theme === 'dark' ? flagWhite : flagIcon} alt='Start' className={styles.flagIcon} />
                                Start
                            </div>
                            {formElements.map((element) => (
                                <div key={element.id} className={styles.elementBox}>
                                    <p>{element.type.charAt(0).toUpperCase() + element.type.slice(1)}</p>
                                    {element.type === 'text' && (
                                        <input
                                            type='text'
                                            value={element.label || ''}
                                            placeholder='Click here to edit'
                                            className={styles.inputBox}
                                            onChange={(e) =>
                                                setFormElements(formElements.map(el =>
                                                    el.id === element.id ? { ...el, label: e.target.value } : el
                                                ))
                                            }
                                            required
                                        />
                                    )}
                                    {element.type === 'image' && (
                                        <input
                                            type='text'
                                            value={element.label || ''}
                                            placeholder='Click to add link'
                                            onChange={(e) =>
                                                setFormElements(formElements.map(el =>
                                                    el.id === element.id ? { ...el, label: e.target.value } : el
                                                ))
                                            }
                                            className={styles.inputBox}
                                            required
                                        />
                                    )}
                                    {element.type === 'textInput' && (
                                        <p className={styles.inputBox}>
                                            Hint : User will input a text on his form
                                        </p>
                                    )}
                                    {element.type === 'number' && (
                                        <p className={styles.inputBox}>
                                            Hint : User will input a number on his form
                                        </p>
                                    )}
                                    {element.type === 'email' && (
                                        <p className={styles.inputBox}>
                                            Hint : User will input an email on his form
                                        </p>
                                    )}
                                    {element.type === 'phone' && (
                                        <p className={styles.inputBox}>
                                            Hint : User will input a text on his form
                                        </p>
                                    )}
                                    {element.type === 'date' && (
                                        <p className={styles.inputBox}>
                                            Hint : User will input a text on his form
                                        </p>
                                    )}
                                    {element.type === 'rating' && (
                                        <p className={styles.inputBox}>
                                            Hint : User will tap to rate out of 5
                                        </p>
                                    )}
                                    {element.type === 'button' && (
                                        <input
                                            className={styles.inputBox}
                                        />
                                    )}

                                    <img
                                        src={deleteIcon}
                                        className={styles.deleteButton}
                                        onClick={() => handleDeleteElement(element.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                }

                {activeTab === 'response' && (
                    <div className={`${styles.responseSection} ${theme === 'dark' ? styles.dark : ''}`}>
                        {/* Stats Section */}
                        <div className={styles.statsSection}>
                            <div className={styles.statCard}>
                                <h3>Views</h3>
                                <p>{stats.views}</p>
                            </div>
                            <div className={styles.statCard}>
                                <h3>Starts</h3>
                                <p>{stats.starts}</p>
                            </div>
                            <div className={styles.statCard}>
                                <h3>Completed</h3>
                                <p>{stats.completed}</p>
                            </div>
                        </div>

                        {/* Table Section */}
                        <table className={styles.responseTable}>
                            <thead>
                                <tr>
                                    <th>Submitted at</th>
                                    <th>Email</th>
                                    <th>Text</th>
                                    <th>Button</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((response, index) => (
                                    <tr key={index}>
                                        <td>{response.submittedAt}</td>
                                        <td>{response.email}</td>
                                        <td>{response.text}</td>
                                        <td>{response.button}</td>
                                        <td>{response.rating}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Completion Chart */}
                        <div className={styles.chartSection}>
                            <Doughnut data={chartData} />
                            <div className={styles.chartLabel}>
                                <p>Completion rate</p>
                                <p>{stats.completionRate.toFixed(2)}%</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Toaster position='top-right' />
        </div>
    )
}

export default FormBuilder
