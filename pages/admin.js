import React, { useState, useEffect } from 'react';

function AdminPage() {
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const adminLoggedIn = localStorage.getItem('adminLoggedIn');
        setIsLoggedIn(adminLoggedIn === 'true');
    }, []);

    const handlePasswordChange = (event) => {
        setError(null);
        setPassword(event.target.value);
    };

    const handleLoginFormSubmit = async (event) => {
        event.preventDefault();
        if (password !== '12345') {
            setError('Incorrect password');
            return;
        }
        localStorage.setItem('adminLoggedIn', 'true');
        setIsLoggedIn(true);
    };

    const handleLogoutButtonClick = () => {
        localStorage.removeItem('adminLoggedIn');
        setIsLoggedIn(false);
    };

    
    if (isLoggedIn) {
        return (
            <div>
                <p>Hello, admin!</p>
                <button onClick={handleLogoutButtonClick}>Logout</button>
            </div>
        );
    }

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#f5f5f5',
        }}>
            <label htmlFor="password"
                style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                }}

            >Enter password To Login As Admin</label>
            <input
                type="password"
                value={password}
                onChange={handlePasswordChange}

                style={{
                    fontSize: '20px',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid black',
                }}

            />
            {error &&
                <p style={{
                    color: 'red',
                    fontSize: '20px',
                    fontWeight: 'bold',
                }} >
                    {error}
                </p>
            }
            <button onClick={handleLoginFormSubmit}
                style={{
                    fontSize: '20px',
                    padding: '10px',
                    borderRadius: '5px',
                    backgroundColor: '#73b651',
                    color: 'white',
                }}
            >Login
            </button>
        </div>
    );



}

export default AdminPage;
