import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, User, Lock, AlertCircle, CheckCircle2, FileText } from 'lucide-react';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const result = await signup(username, password);
        if (result.success) {
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } else {
            setError(result.message);
        }
    };

    const inputStyle = {
        width: '100%',
        background: '#f9fafb',
        border: '1.5px solid #e5e7eb',
        borderRadius: '0.75rem',
        padding: '0.75rem 1rem 0.75rem 2.75rem',
        fontSize: '0.95rem',
        color: '#111827',
        boxSizing: 'border-box',
        outline: 'none',
    };

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4ff', padding: '2rem' }}>
            <div style={{ background: 'white', borderRadius: '1.5rem', padding: '3rem 2.5rem', boxShadow: '0 8px 40px rgba(0,0,0,0.10)', width: '100%', maxWidth: '420px', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ background: 'linear-gradient(135deg, #1d4ed8, #4338ca)', borderRadius: '1rem', padding: '14px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FileText color="white" size={28} />
                    </div>
                    <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em', borderBottom: 'none', padding: 0, display: 'block' }}>Create Account</h2>
                    <p style={{ margin: '0.4rem 0 0', color: '#6b7280', fontSize: '0.95rem' }}>Join AI Resume Builder today</p>
                </div>

                {error && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', padding: '0.75rem 1rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        <CheckCircle2 size={16} />
                        <span>Account created! Redirecting to login...</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Username</label>
                        <div style={{ position: 'relative' }}>
                            <User style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={18} />
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} placeholder="Choose a username" required />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={18} />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} placeholder="••••••••" required />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Confirm Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={18} />
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={inputStyle} placeholder="••••••••" required />
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={{ width: '100%', background: 'linear-gradient(135deg, #1d4ed8, #4338ca)', color: 'white', border: 'none', borderRadius: '0.75rem', padding: '0.9rem', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 16px rgba(29,78,216,0.3)', marginTop: '0.5rem' }}
                    >
                        <UserPlus size={18} />
                        Sign Up
                    </button>
                </form>

                <p style={{ marginTop: '1.75rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem', marginBottom: 0 }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
