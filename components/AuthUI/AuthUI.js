import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import { useState } from 'react';
import styles from './AuthUI.module.css';




const AuthUI = ({ InnerComponent }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState('signin');
    const { user, isLoading, signUp, signIn, error, setError } = useFirebaseAuth();

    const handleEmailChange = (event) => {
        setError(null);
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setError(null);
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (mode === 'signup') {
            await signUp(email, password);
        } else {
            await signIn(email, password);
        }
    };

    if (isLoading) {
        return (
            <div className={styles.loading}>Loading...</div>
        );
    }

    if (user) {
        return (
            <InnerComponent />
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h2>{mode === 'signup' ? 'Sign Up' : 'Sign In'}</h2>
                <div className={styles.main}>
                    <input type="email" value={email} onChange={handleEmailChange} />
                    <input type="password" value={password} onChange={handlePasswordChange} />
                    <button onClick={handleSubmit}>{mode === 'signup' ? 'Sign Up' : 'Sign In'}</button>
                </div>
                {error && <p>{error}</p>}
                <button onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}>
                    {mode === 'signup' ? 'Already have an account? Sign in' : 'Don\'t have an account? Sign up'}
                </button>
            </div>

        </div>
    );
}



export default AuthUI;
