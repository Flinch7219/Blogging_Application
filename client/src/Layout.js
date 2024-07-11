import { BrowserRouter, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MyURLs from './Routes/Routes';
import Styles from './Layout.module.css';
import { ProtectedRoute } from './Components/ProtectedRoute';

export function MyRoutes(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    {MyURLs.map((view, index) => (
                        <Route 
                            key={view.path} 
                            path={view.path} 
                            element={
                                view.path === '/blogs' ? (
                                    <ProtectedRoute>
                                        <view.view />
                                    </ProtectedRoute>
                                ) : (
                                    <view.view />
                                )
                            } 
                        />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default function Layout(props) {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername('');
        window.location.href = '/';
    };

    return (
        <>
            <nav className={Styles.header}>
                <span>
                    My BLOG App
                </span>
                <div className={Styles.headerLinks}>
                    {username ? (
                        <div className={Styles.userGreeting}>
                            Hello, {username}!
                            <button onClick={handleLogout} className={Styles.logoutButton}>Logout</button>
                        </div>
                    ) : (
                        <Link to="/" className={Styles.navLink}>Sign In / Sign Up</Link>
                    )}
                </div>
            </nav>
            <div className={Styles.primaryContainer}>
                <Outlet />
            </div>
        </>
    )
}