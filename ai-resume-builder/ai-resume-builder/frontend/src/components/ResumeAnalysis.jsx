import { Sparkles, AlertTriangle } from 'lucide-react';

const cardStyle = {
    background: 'white',
    borderRadius: '1.25rem',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
    border: '1px solid #e5e7eb',
};

function ResumeAnalysis({ analysis, isLoading }) {
    if (isLoading) {
        return (
            <div style={cardStyle}>
                <h2 style={{ margin: '0 0 1.5rem', fontSize: '1.2rem', fontWeight: 800, color: '#111827', borderBottom: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={20} color="#1d4ed8" /> AI Analysis
                </h2>
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <div style={{ width: '48px', height: '48px', border: '4px solid #dbeafe', borderTop: '4px solid #2563eb', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
                    <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: 0 }}>Analyzing your profile against millions of data points...</p>
                </div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (!analysis) {
        return (
            <div style={cardStyle}>
                <h2 style={{ margin: '0 0 1rem', fontSize: '1.2rem', fontWeight: 800, color: '#111827', borderBottom: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={20} color="#1d4ed8" /> AI Analysis
                </h2>
                <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: '0 0 1.5rem' }}>
                    Submit your resume details to get an instant AI-powered critique and score.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                    {['ATS Optimization', 'Keyword Matching', 'Score Analysis'].map(tag => (
                        <span key={tag} style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', padding: '0.35rem 0.85rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600 }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        );
    }

    const { matchScore, missingKeywords, profileSummaryAndSuggestions } = analysis;
    const scoreColor = matchScore >= 85 ? '#16a34a' : matchScore >= 70 ? '#d97706' : '#dc2626';
    const scoreBg = matchScore >= 85 ? '#f0fdf4' : matchScore >= 70 ? '#fffbeb' : '#fef2f2';
    const scoreBorder = matchScore >= 85 ? '#bbf7d0' : matchScore >= 70 ? '#fde68a' : '#fecaca';

    return (
        <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#111827', borderBottom: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={20} color="#1d4ed8" /> AI Resume Score
                </h2>
                {analysis.isDemo && (
                    <span style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
                        Demo Mode
                    </span>
                )}
            </div>

            {/* Score Display */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: scoreBg, border: `1px solid ${scoreBorder}`, borderRadius: '1rem', padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: `conic-gradient(${scoreColor} ${matchScore * 3.6}deg, #e5e7eb 0)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0 }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: scoreBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', color: scoreColor }}>
                        {matchScore}%
                    </div>
                </div>
                <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: '#111827', marginBottom: '0.25rem' }}>
                        ATS Match Score
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.5 }}>
                        {matchScore >= 85 ? '🎉 Excellent! Your resume is well-optimized.' : matchScore >= 70 ? '👍 Good score. A few tweaks can improve it.' : '⚠️ Needs improvement to pass ATS filters.'}
                    </div>
                </div>
            </div>

            {/* Suggestions */}
            {profileSummaryAndSuggestions && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: '0 0 0.6rem', fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>AI Suggestions</h3>
                    <p style={{ whiteSpace: 'pre-line', color: '#4b5563', fontSize: '0.88rem', lineHeight: 1.7, margin: 0, background: '#f9fafb', padding: '1rem', borderRadius: '0.65rem', border: '1px solid #e5e7eb' }}>
                        {profileSummaryAndSuggestions}
                    </p>
                </div>
            )}

            {/* Missing Keywords */}
            {missingKeywords && missingKeywords.length > 0 && (
                <div>
                    <h3 style={{ margin: '0 0 0.4rem', fontSize: '0.95rem', fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <AlertTriangle size={15} color="#d97706" /> Missing Keywords
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: '#6b7280', margin: '0 0 0.75rem' }}>
                        Add these skills if applicable to boost your score:
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {missingKeywords.map(kw => (
                            <span key={kw} style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '0.3rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600 }}>
                                + {kw}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResumeAnalysis;
