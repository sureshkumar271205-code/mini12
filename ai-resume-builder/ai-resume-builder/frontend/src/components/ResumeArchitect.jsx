import { useRef, useState } from 'react';
import ResumeForm from './ResumeForm';
import ResumeAnalysis from './ResumeAnalysis';
import ResumeTemplate from './ResumeTemplate';
import { useReactToPrint } from 'react-to-print';
import { generateWord } from '../utils/generateWord';
import { LayoutTemplate, Sparkles, FileText, CheckCircle, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ResumeArchitect = () => {
    const { user } = useAuth();
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState('modern');
    const [showPreview, setShowPreview] = useState(false);

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `Resume_${formData?.fullName || 'Untitled'}`,
    });

    const handleDownloadWord = () => {
        if (formData) generateWord(formData, selectedTemplate);
    };

    const handleAnalyze = async (data) => {
        setFormData(data);
        setLoading(true);
        setAnalysis(null);
        setShowPreview(true);

        try {
            const response = await fetch('/api/resume/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            setAnalysis(result);
        } catch (error) {
            console.error('Error fetching analysis:', error);
            const skillCount = data.skills.length;
            const calculated = Math.min(98, Math.max(65, 70 + (skillCount * 2) + Math.floor(Math.random() * 15)));
            setAnalysis({
                isDemo: true,
                matchScore: calculated,
                missingKeywords: ['Leadership', 'Agile', 'Cloud Architecture'],
                profileSummaryAndSuggestions: 'Strong technical foundation. Consider adding more soft skills and quantifiable achievements.'
            });
        } finally {
            setLoading(false);
        }
    };

    const templates = [
        { id: 'modern', name: 'Modern', desc: 'Clean & Professional', color: '#e11d74' },
        { id: 'classic', name: 'Classic', desc: 'Timeless & Generic', color: '#374151' },
        { id: 'creative', name: 'Creative', desc: 'Bold & Unique', color: '#7c3aed' },
    ];

    return (
        <div style={{ background: '#f0f4ff', minHeight: '100vh' }}>
            {/* Page Header */}
            <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '2rem', textAlign: 'center' }}>
                <h1 style={{ margin: 0, fontSize: '2.25rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>
                    AI Resume Architect
                </h1>
                <p style={{ margin: '0.5rem 0 0', color: '#6b7280', fontSize: '1rem' }}>
                    Hello, <strong style={{ color: '#1d4ed8' }}>{user?.username}</strong>! Fill in your details to generate your resume.
                </p>
            </div>

            <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '2.5rem 2rem', display: 'grid', gridTemplateColumns: showPreview ? '1fr 1fr' : '650px', gap: '2rem', justifyContent: 'center' }}>
                {/* LEFT: Form + Analysis */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <ResumeForm onAnalyze={handleAnalyze} />
                    <ResumeAnalysis analysis={analysis} isLoading={loading} />
                </div>

                {/* RIGHT: Template Picker + Preview */}
                {showPreview && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Template Selector Card */}
                        <div style={{ background: 'white', borderRadius: '1.25rem', padding: '1.75rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: 'none', padding: 0 }}>
                                    <LayoutTemplate size={22} color="#1d4ed8" />
                                    Choose Template
                                </h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#fefce8', padding: '0.3rem 0.8rem', borderRadius: '999px', border: '1px solid #fde68a', fontSize: '0.78rem', fontWeight: 600, color: '#92400e' }}>
                                    <Sparkles size={12} color="#d97706" />
                                    AI Enhanced
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                                {templates.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => setSelectedTemplate(t.id)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '1rem',
                                            padding: '0.9rem 1.1rem', borderRadius: '0.75rem', border: 'none',
                                            cursor: 'pointer', textAlign: 'left', width: '100%',
                                            background: selectedTemplate === t.id ? '#eff6ff' : '#f9fafb',
                                            outline: selectedTemplate === t.id ? `2px solid ${t.color}` : '2px solid transparent',
                                            transition: 'all 0.18s ease',
                                        }}
                                    >
                                        <div style={{ width: '10px', height: '38px', borderRadius: '4px', background: t.color, flexShrink: 0 }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem' }}>{t.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{t.desc}</div>
                                        </div>
                                        {selectedTemplate === t.id && <CheckCircle size={18} color={t.color} />}
                                    </button>
                                ))}
                            </div>

                            {/* Download Buttons */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.25rem', background: '#f0f4ff', borderRadius: '0.75rem', border: '1px solid #dbeafe' }}>
                                <p style={{ margin: 0, fontWeight: 700, color: '#111827', fontSize: '0.95rem' }}>Ready to Download</p>
                                <p style={{ margin: 0, color: '#6b7280', fontSize: '0.82rem' }}>Your resume is formatted and ATS-ready.</p>
                                <button
                                    onClick={handleDownloadWord}
                                    style={{ background: 'linear-gradient(135deg, #1d4ed8, #4338ca)', color: 'white', border: 'none', borderRadius: '0.65rem', padding: '0.85rem', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(29,78,216,0.3)', width: '100%' }}
                                >
                                    <Download size={18} />
                                    Download Word Document
                                </button>
                                <button
                                    onClick={handlePrint}
                                    style={{ background: 'white', color: '#1d4ed8', border: '1.5px solid #1d4ed8', borderRadius: '0.65rem', padding: '0.7rem', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}
                                >
                                    <FileText size={16} />
                                    Print / Save as PDF
                                </button>
                            </div>
                        </div>

                        {/* Resume Preview */}
                        <div style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
                            <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 700, color: '#374151', borderBottom: 'none', padding: 0 }}>Live Preview</h2>
                            <div style={{ background: '#f8fafc', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', justifyContent: 'center', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                                <div style={{ transform: 'scale(0.6)', transformOrigin: 'top center', width: '210mm', background: 'white', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}>
                                    <div ref={componentRef} style={{ backgroundColor: 'white' }}>
                                        <ResumeTemplate data={formData} template={selectedTemplate} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeArchitect;
