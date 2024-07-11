import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './AUTH.module.css'
import axios from 'axios'

export function AUTH() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = isLogin 
            ? `${process.env.REACT_APP_SERVER_URL}/api/login`
            : `${process.env.REACT_APP_SERVER_URL}/api/register`
        
        console.log("Sending request to: ", url);
        const data = isLogin 
            ? { username, password }
            : { email, username, password }

        try {
            const response = await axios.post(url, data, {
                headers: { accept: "application/json" }
            })
            console.log(response.data)
            if (isLogin) {
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('username', username)
                    setMessage("Login successful! Redirecting...")
                    setTimeout(() => {
                        navigate('/blogs')
                        window.location.reload()
                    }, 1500)
                }
            } else {
                setMessage("Registration successful! Please log in.")
                setIsLogin(true)
                setUsername('')
                setPassword('')
                setEmail('')
            }
        } catch (error) {
            console.log(error)
            setMessage(error.response?.data?.message || "An error occurred")
        }
    }

    return (
        <div className={Styles.ancestorContainer}>
            <div className={Styles.headerContainer}>
                <h1>{isLogin ? "Login" : "Register"}</h1>
            </div>
            <form onSubmit={handleSubmit} className={Styles.authContainer}>
                {!isLogin && (
                    <input
                        className={Styles.authInput}
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                )}
                <input
                    className={Styles.authInput}
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    className={Styles.authInput}
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className={Styles.addButton}>
                    {isLogin ? "Login" : "Register"}
                </button>
            </form>
            <p>{message}</p>
            <button onClick={() => {
                setIsLogin(!isLogin)
                setMessage('')
                setUsername('')
                setPassword('')
                setEmail('')
            }} className={Styles.addButton}>
                {isLogin ? "Need to register?" : "Already have an account?"}
            </button>
        </div>
    )
}