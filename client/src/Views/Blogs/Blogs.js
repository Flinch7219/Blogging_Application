import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Styles from './Blogs.module.css'

export function Blogs() {
    const [blogs, setBlogs] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredBlogs, setFilteredBlogs] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/blog`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const sortedBlogs = response.data.sort((a, b) => {
                const dateA = new Date(a.updatedAt > a.createdAt ? a.updatedAt : a.createdAt);
                const dateB = new Date(b.updatedAt > b.createdAt ? b.updatedAt : b.createdAt);
                return dateB - dateA;
            });
            setBlogs(sortedBlogs)
            setFilteredBlogs(sortedBlogs)
        } catch (error) {
            console.error('Error fetching blogs:', error)
        }
    }

    const handleCreateNew = () => {
        navigate('/create-blog')
    }

    const handleSearch = () => {
        const filtered = blogs.filter(blog =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredBlogs(filtered)
    }

    const calculateReadTime = (text) => {
        const wordsPerMinute = 200;
        const wordCount = text.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        return `${readTime} min read`;
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
        <div className={Styles.blogsPageContainer}>
            <div className={Styles.leftPanel}>
                <div className={Styles.blogList}>
                    {filteredBlogs.map(blog => (
                        <Link to={`/blog/${blog._id}`} key={blog._id} className={Styles.blogLink}>
                            <div className={Styles.blogItem}>
                                <div className={Styles.blogHeader}>
                                    <span className={Styles.author}>By {blog.author || 'Unknown'}</span>
                                    <span className={Styles.readTime}>{calculateReadTime(blog.description)}</span>
                                </div>
                                <h2>{blog.title}</h2>
                                <p className={Styles.description}>{blog.description.substring(0, 100)}...</p>
                                <p className={Styles.date}>
                                    {blog.updatedAt !== blog.createdAt ? 'Edited' : 'Created'}: {formatDate(blog.updatedAt || blog.createdAt || new Date())}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={Styles.rightPanel}>
                <div className={Styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={Styles.searchBar}
                    />
                    <button onClick={handleSearch} className={Styles.searchButton}>
                        Search
                    </button>
                </div>
                <div className={Styles.createButtonContainer}>
                    <button onClick={handleCreateNew} className={Styles.createButton}>
                        Create New Blog
                    </button>
                </div>
            </div>
        </div>
    )
}