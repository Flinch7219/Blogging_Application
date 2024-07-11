import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Styles from './EditBlog.module.css'

export function EditBlog() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/blog/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setTitle(response.data.title)
                setDescription(response.data.description)
            } catch (error) {
                console.error('Error fetching blog:', error)
                setError('Error fetching blog')
            }
        }
        fetchBlog()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            await axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/blog/${id}`, 
                { title, description },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            navigate(`/blog/${id}`)
        } catch (error) {
            console.error('Error updating blog:', error)
            setError('Error updating blog')
        }
    }

    const handleCancel = () => {
        navigate(`/blog/${id}`)
    }

    if (error) return <div>Error: {error}</div>

    return (
        <div className={Styles.editBlogContainer}>
            <h1>Edit Blog</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <div className={Styles.buttonContainer}>
                    <button type="button" onClick={handleCancel} className={Styles.cancelButton}>Cancel</button>
                    <button type="submit">Update Blog</button>
                </div>
            </form>
        </div>
    )
}