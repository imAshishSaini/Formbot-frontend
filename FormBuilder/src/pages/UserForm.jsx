import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../services/api'

function UserForm() {
  const { id } = useParams()
  const [form, setForm] = useState(null)
  const [userInputs, setUserInputs] = useState({})
  const [error, setError] = useState(null)
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0)  // Track which field is currently visible
  const [loading, setLoading] = useState(true)  // To manage loading state of fields
  const [userFieldsFilled, setUserFieldsFilled] = useState({}) // Track fields the user has filled

  useEffect(() => {
    const fetchForm = async () => {
      try {
        console.log(id)
        const response = await API.get(`/api/form/${id}`)
        setForm(response.data)
        console.log(response.data)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch form:', err)
        setError(err.message || 'Unexpected error occurred')
      }
    }

    fetchForm()
  }, [id])

  // Function to handle field change
  const handleChange = (field, value) => {
    setUserInputs((prevInputs) => ({ ...prevInputs, [field]: value }))
  }

  // Handle field submission
  const handleSubmit = async () => {
    try {
      const response = await API.post(`/api/form/${id}/fill`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInputs),
      })

      if (response.ok) {
        alert('Form submitted successfully!')
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  // Effect for showing fields with a delay
  useEffect(() => {
    if (form && !loading) {
      const intervalId = setInterval(() => {
        setCurrentFieldIndex((prevIndex) => {
          // Show the next field after 1 second for non-user input fields
          if (prevIndex < form.fields.length - 1) {
            return prevIndex + 1 // Move to next field
          }
          clearInterval(intervalId) // Stop when all fields are shown
          return prevIndex
        })
      }, 1000)

      return () => clearInterval(intervalId) // Cleanup interval on unmount
    }
  }, [form, loading])

  // Handle when the user clicks 'Save' for an input field
  const handleSave = (field) => {
    setUserFieldsFilled((prev) => ({ ...prev, [field]: true }))
    setCurrentFieldIndex((prevIndex) => prevIndex + 1) // Move to next field
  }

  if (error) return <p>Error: {error}</p>
  if (!form) return <p>Loading...</p>

  return (
    <div>
      <h1>{form.name}</h1>
      {form.fields.map((field, idx) => {
        if (idx > currentFieldIndex) {
          return null // Don't show fields that haven't been revealed yet
        }

        if (field.isUserInput) {
          // For user input fields, we need to wait until the user has entered data and clicked 'Save'
          return (
            <div key={idx}>
              <label>{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                onChange={(e) => handleChange(field.label, e.target.value)}
              />
              {userFieldsFilled[field.label] ? (
                <button onClick={() => handleSave(field.label)}>Save</button>
              ) : null}
            </div>
          )
        } else {
          // Non-user input fields will show automatically with a 1-second gap
          return (
            <div key={idx}>
              <label>{field.label}</label>
              <p>{field.label}</p>
            </div>
          )
        }
      })}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default UserForm
