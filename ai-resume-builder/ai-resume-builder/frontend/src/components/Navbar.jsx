import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, FileText } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const isLanding = location.pathname === '/';

    const navStyle = isLanding ? {
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)'
    } : {
        background: 'rgba(9,9,11,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
    };

    const linkColor = isLanding ? '#374151' : '#d4d4d8';
    const logoTextColor = isLanding ? '#111827' : 'white';

    const scrollTo = (id) => {
        if (!isLanding) {
            navigate('/');
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav style={navStyle}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
                    <div style={{ background: '#1d4ed8', padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FileText color="white" size={20} />
                    </div>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: logoTextColor, letterSpacing: '-0.02em' }}>
                        AI Resume Builder
                    </span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    {isLanding && (
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <button onClick={() => scrollTo('hero')} style={{ background: 'none', border: 'none', color: linkColor, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', padding: 0 }}>Home</button>
                            <button onClick={() => scrollTo('features')} style={{ background: 'none', border: 'none', color: linkColor, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', padding: 0 }}>Features</button>
                        </div>
                    )}

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.9rem', background: isLanding ? '#f3f4f6' : 'rgba(255,255,255,0.1)', borderRadius: '999px' }}>
                                <User size={16} color={isLanding ? '#374151' : '#e11d74'} />
                                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isLanding ? '#111827' : 'white' }}>{user.username}</span>
                            </div>
                            <Link to="/builder" style={{
                                background: 'linear-gradient(135deg, #1d4ed8, #4338ca)',
                                color: 'white',
                                padding: '0.5rem 1.1rem',
                                borderRadius: '0.5rem',
                                textDecoration: 'none',
                                fontSize: '0.88rem',
                                fontWeight: 700
                            }}>
                                Build Resume
                            </Link>
                            <button
                                onClick={logout}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', color: linkColor, fontWeight: 600, fontSize: '0.85rem', padding: '0.4rem', width: 'auto' }}
                            >
                                <LogOut size={16} />
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Link to="/login" style={{ color: linkColor, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                style={{
                                    background: 'linear-gradient(135deg, #1d4ed8, #4338ca)',
                                    color: 'white',
                                    padding: '0.55rem 1.25rem',
                                    borderRadius: '0.6rem',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    boxShadow: '0 2px 10px rgba(29,78,216,0.3)'
                                }}
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
