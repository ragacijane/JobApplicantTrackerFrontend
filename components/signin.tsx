// app/signin.tsx

import { signIn } from 'next-auth/react';
import { useState } from 'react';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await signIn('credentials', { redirect: false, username, password });
        if (result?.error) {
            setError('Failed to sign in. Please check your credentials.')
        }
        else {
            window.location.href = '/'
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>
            <div>
                <p>Don't have an account?</p>
                <button onClick={() => signIn('credentials/signup')}>
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default SignIn;
