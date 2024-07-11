import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Styles from './BlogDetail.module.css'

export function BlogDetail() {
    const [blog, setBlog] = useState(null)
    const [isAuthor, setIsAuthor] = useState(false)
    const [error, setError] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    const fetchBlog = useCallback(async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/blog/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setBlog(response.data)
            setIsAuthor(response.data.author === localStorage.getItem('username'))
            console.log("Blog data:", response.data)
            console.log("Is author:", response.data.author === localStorage.getItem('username'))
        } catch (error) {
            console.error('Error fetching blog:', error)
            setError('Error fetching blog')
        }
    }, [id])

    useEffect(() => {
        fetchBlog()
    }, [fetchBlog])

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token')
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/blog/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            navigate('/blogs')
        } catch (error) {
            console.error('Error deleting blog:', error)
            setError('Error deleting blog')
        }
    }

    const handleEdit = () => {
        navigate(`/edit-blog/${id}`)
    }

    if (error) return <div className={Styles.error}>Error: {error}</div>
    if (!blog) return <div className={Styles.loading}>Loading...</div>

    return (
        <div className={Styles.pageContainer}>
            <div className={Styles.navigationBar}>
                <Link to="/blogs" className={Styles.backLink}>
                    ← Back to Blogs
                </Link>
            </div>
            <div className={Styles.blogDetailContainer}>
                <h1>{blog.title}</h1>
                <p className={Styles.author}>By {blog.author || 'Unknown'}</p>
                <p className={Styles.description}>{blog.description}</p>
            </div>
            {isAuthor && (
                <div className={Styles.authorActions}>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    )
}