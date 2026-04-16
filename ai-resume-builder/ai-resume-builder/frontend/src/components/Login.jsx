import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, User, Lock, AlertCircle, FileText } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(username, password);
        if (result.success) {
            navigate('/builder');
        } else {
            setError(result.message);
        }
    };

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4ff', padding: '2rem' }}>
            <div style={{ background: 'white', borderRadius: '1.5rem', padding: '3rem 2.5rem', boxShadow: '0 8px 40px rgba(0,0,0,0.10)', width: '100%', maxWidth: '420px', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ background: '#1d4ed8', borderRadius: '1rem', padding: '14px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FileText color="white" size={28} />
                    </div>
                    <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em', borderBottom: 'none', padding: 0, display: 'block' }}>Welcome Back</h2>
                    <p style={{ margin: '0.4rem 0 0', color: '#6b7280', fontSize: '0.95rem' }}>Sign in to your AI Resume Builder account</p>
                </div>

                {error && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Username</label>
                        <div style={{ position: 'relative' }}>
                            <User style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={18} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{ width: '100%', background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: '0.75rem', padding: '0.75rem 1rem 0.75rem 2.75rem', fontSize: '0.95rem', color: '#111827', boxSizing: 'border-box', outline: 'none' }}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '100%', background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: '0.75rem', padding: '0.75rem 1rem 0.75rem 2.75rem', fontSize: '0.95rem', color: '#111827', boxSizing: 'border-box', outline: 'none' }}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={{ width: '100%', background: 'linear-gradient(135deg, #1d4ed8, #4338ca)', color: 'white', border: 'none', borderRadius: '0.75rem', padding: '0.9rem', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 16px rgba(29,78,216,0.3)', marginTop: '0.5rem' }}
                    >
                        <LogIn size={18} />
                        Sign In
                    </button>
                </form>

                <p style={{ marginTop: '1.75rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem', marginBottom: 0 }}>
                    Don't have an account?{' '}
                    <Link to="/signup" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
