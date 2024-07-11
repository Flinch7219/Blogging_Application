import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Styles from './CreateBlog.module.css'

export function CreateBlog() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/blog`, 
                { title, description },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            navigate('/blogs')
        } catch (error) {
            console.error('Error creating blog:', error)
        }
    }

    return (
        <div className={Styles.createBlogContainer}>
            <h1>Create New Blog</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit">Create Blog</button>
            </form>
        </div>
    )
}