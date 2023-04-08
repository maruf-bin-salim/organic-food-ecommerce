import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import { useState } from 'react';




const AuthUI = ({ InnerComponent }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState('signin');
    const { user, isLoading, signUp, signIn } = useFirebaseAuth();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleModeChange = (event) => {
        setMode(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (mode === 'signup') {
            await signUp(email, password);
        } else {
            await signIn(email, password);
        }
    };

    if (user) {
        return (
            <InnerComponent />
        );
    }

    return (
        <div>
            <h2>{mode === 'signup' ? 'Sign Up' : 'Sign In'}</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={handleEmailChange} />
                <input type="password" value={password} onChange={handlePasswordChange} />
                <button type="submit">{mode === 'signup' ? 'Sign Up' : 'Sign In'}</button>
            </form>
            <button onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}>
                {mode === 'signup' ? 'Already have an account? Sign in' : 'Don\'t have an account? Sign up'}
            </button>
        </div>
    );
}



export default AuthUI;
