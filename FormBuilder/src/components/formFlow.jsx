import React, { useState } from 'react'
import styles from './formFlow.module.css'
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
import API from '../services/api'

function formFlow({ theme, formId }) {
    const [formElements, setFormElements] = useState([])

    useEffect(() => {
        const fetchForm = async () => {
          try {
            console.log(formId)
            const response = await API.get(`/api/form/${formId}`);
            console.log(response.data)
            const { fields } = response.data; // Assuming `fields` is the array of pre-stored fields
            setFormElements(fields);
          } catch (error) {
            console.error('Error fetching form:', error);
          }
        };
    
        fetchForm();
      }, [formId])

    const handleAddElement = (type) => {
        setFormElements([...formElements, { type, id: Date.now() }])
    }

    const handleDeleteElement = (id) => {
        setFormElements(formElements.filter((el) => el.id !== id))
    }

    return (
        <div className={`${styles.flowSection} ${styles[theme]}`}>
            {/* Left Section (Bubbles) */}
            <div className={styles.leftSection}>
                <p>Bubbles</p>
                <div className={styles.bubbles}>
                    <div onClick={() => handleAddElement('text')} className={styles.box}>
                        <img src={textInput} alt="Text Input" />
                        Text
                    </div>
                    <div onClick={() => handleAddElement('image')} className={styles.box}>
                        <img src={imgInput} alt="Image Input" />
                        Image
                    </div>
                    <div className={styles.box}>
                        <img src={videoInput} alt="Video Input" />
                        Video
                    </div>
                    <div className={styles.box}>
                        <img src={gifInput} alt="GIF Input" />
                        GIF
                    </div>
                </div>

                <p>Inputs</p>
                <div className={styles.inputsSection}>
                    <div onClick={() => handleAddElement('textInput')} className={styles.box}>
                        <img src={tIcon} alt="Text" />
                        Text
                    </div>
                    <div onClick={() => handleAddElement('number')} className={styles.box}>
                        <img src={numIcon} alt="Number Input" />
                        Number
                    </div>
                    <div onClick={() => handleAddElement('email')} className={styles.box}>
                        <img src={atIcon} alt="Email Input" />
                        Email
                    </div>
                    <div onClick={() => handleAddElement('phone')} className={styles.box}>
                        <img src={phoneIcon} alt="Phone Input" />
                        Phone
                    </div>
                    <div onClick={() => handleAddElement('date')} className={styles.box}>
                        <img src={dateIcon} alt="Date Input" />
                        Date
                    </div>
                    <div onClick={() => handleAddElement('rating')} className={styles.box}>
                        <img src={ratingIcon} alt="Rating Input" />
                        Rating
                    </div>
                    <div onClick={() => handleAddElement('button')} className={styles.box}>
                        <img src={btnIcon} alt="Button Input" />
                        Button
                    </div>
                </div>
            </div>

            {/* Right Section (Canvas) */}
            <div className={styles.rightSection}>
                <div className={styles.startBox}>
                    <img src={theme === 'dark' ? flagWhite : flagIcon} alt="Start" className={styles.flagIcon} />
                    Start
                    </div>
                {formElements.map((element) => (
                    <div key={element.id} className={styles.elementBox}>
                        <p>{element.type.charAt(0).toUpperCase() + element.type.slice(1)}</p>
                        {element.type === 'text' && (
                            <input
                                type="text"
                                placeholder="Click here to edit"
                                className={styles.inputBox}
                                required
                            />
                        )}
                        {element.type === 'image' && (
                            <input
                                type="text"
                                placeholder="Click to add link"
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
    )
}

export default formFlow