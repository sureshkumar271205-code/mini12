import React from 'react';

const ResumeTemplate = ({ data, template }) => {
    // Current Styles
    const activeTemplate = template || 'modern';
    const isFresher = data.resumeType === 'fresher' || !data.jobTitle;
    
    // Skills processing
    const skillsArray = Array.isArray(data.skills)
        ? data.skills
        : (typeof data.skills === 'string' ? data.skills.split(',').filter(s => s.trim()) : []);

    const certsArray = data.certifications 
        ? data.certifications.split('\n').filter(line => line.trim()) 
        : [];

    // --- TEMPLATE DEFINITIONS ---

    // 1. MODERN (AI ENHANCED - PINK THEME)
    if (activeTemplate === 'modern') {
        const primaryColor = '#e11d74';
        const textColor = '#1f2937';
        const lightText = '#4b5563';
        
        const sectionStyle = { display: 'flex', alignItems: 'center', marginTop: '30px', marginBottom: '15px' };
        const titleStyle = { fontSize: '14px', fontWeight: '900', color: primaryColor, textTransform: 'uppercase', margin: 0, letterSpacing: '2.5px' };
        const lineStyle = { flexGrow: 1, height: '2px', backgroundColor: '#fbcfe8', marginLeft: '12px' };

        // Split skills into two columns
        const halfSkills = Math.ceil(skillsArray.length / 2);
        const col1 = skillsArray.slice(0, halfSkills);
        const col2 = skillsArray.slice(halfSkills);

        return (
            <div id="resume-preview" style={{ width: '210mm', minHeight: '297mm', backgroundColor: 'white', color: textColor, padding: '50px', margin: '0 auto', boxSizing: 'border-box', borderTop: `8px solid ${primaryColor}`, borderLeft: '1px solid #eee', borderRight: '1px solid #eee', borderBottom: '1px solid #eee', fontFamily: "'Inter', sans-serif" }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '35px', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1.5 }}>
                        <h1 style={{ fontSize: '38px', fontWeight: '900', color: primaryColor, margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '4px', borderBottom: `4px solid ${primaryColor}`, display: 'block', width: 'fit-content' }}>{data.fullName || "YOUR NAME"}</h1>
                        <h2 style={{ fontSize: '20px', fontWeight: '500', color: '#111827', textTransform: 'uppercase', letterSpacing: '5px', marginTop: '5px' }}>{data.currentTitle || "Professional Title"}</h2>
                    </div>
                    <div style={{ flex: 1, textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                        <div style={{ padding: '4px 12px', border: `1px solid ${primaryColor}`, borderRadius: '6px', background: '#fff1f2', color: '#111827', fontWeight: '700', fontSize: '11px', minWidth: '150px' }}>
                            {data.email}
                        </div>
                        <div style={{ padding: '4px 12px', border: `1px solid ${primaryColor}`, borderRadius: '6px', background: '#fff1f2', color: '#111827', fontWeight: '700', fontSize: '11px', minWidth: '150px' }}>
                            {data.phone}
                        </div>
                        <div style={{ padding: '4px 12px', border: `1px solid ${primaryColor}`, borderRadius: '6px', background: '#fff1f2', color: primaryColor, fontWeight: '700', fontSize: '11px', minWidth: '150px' }}>
                            {data.location}
                        </div>
                    </div>
                </header>

                <section>
                    <div style={sectionStyle}><h3 style={titleStyle}>Profile Summary</h3><div style={lineStyle}></div></div>
                    <p style={{ fontSize: '12.5px', lineHeight: '1.8', color: lightText, textAlign: 'justify', margin: '0' }}>{data.profileSummary}</p>
                </section>

                {(data.jobTitle || data.companyName) && (
                    <section>
                        <div style={sectionStyle}><h3 style={titleStyle}>{isFresher ? 'Internships & Projects' : 'Experience'}</h3><div style={lineStyle}></div></div>
                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '15px', color: '#111827' }}>
                                <span>{data.jobTitle} <span style={{ color: primaryColor }}>@</span> {data.companyName}</span>
                                <span style={{ fontSize: '12px', fontStyle: 'italic', fontWeight: '600', color: lightText }}>{data.jobDuration}</span>
                            </div>
                            <div style={{ fontSize: '12px', color: primaryColor, marginBottom: '10px', fontWeight: '700', textTransform: 'uppercase' }}>{data.jobLocation}</div>
                            <ul style={{ paddingLeft: '22px', fontSize: '12.5px', color: lightText }}>
                                {(data.jobDescription || "").split('\n').filter(l => l.trim()).map((l, i) => (
                                    <li key={i} style={{ marginBottom: '6px' }}>{l.replace(/^[•\-\*]\s*/, '')}</li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

                <section>
                    <div style={sectionStyle}><h3 style={titleStyle}>Education</h3><div style={lineStyle}></div></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', alignItems: 'baseline' }}>
                        <div>
                            <div style={{ fontWeight: '800', color: '#111827' }}>{data.course}</div>
                            <div style={{ fontSize: '12px', color: lightText, marginTop: '2px' }}>{data.college}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: '700', color: '#111827' }}>{data.year}</div>
                            <div style={{ fontSize: '12px', color: primaryColor, fontWeight: 'bold' }}>GPA: {data.cgpa}</div>
                        </div>
                    </div>
                </section>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', marginTop: '10px' }}>
                    <section>
                        <div style={sectionStyle}><h3 style={titleStyle}>Skills</h3><div style={lineStyle}></div></div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '12px', color: lightText }}>
                                {col1.map((s, i) => <li key={i} style={{ marginBottom: '4px', fontWeight: '500' }}>{s}</li>)}
                            </ul>
                            <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '12px', color: lightText }}>
                                {col2.map((s, i) => <li key={i} style={{ marginBottom: '4px', fontWeight: '500' }}>{s}</li>)}
                            </ul>
                        </div>
                    </section>

                    {certsArray.length > 0 && (
                        <section>
                            <div style={sectionStyle}><h3 style={titleStyle}>{isFresher ? 'Highlights' : 'Certifications'}</h3><div style={lineStyle}></div></div>
                            <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '12px', color: lightText }}>
                                {certsArray.map((c, i) => <li key={i} style={{ marginBottom: '4px', fontWeight: '500' }}>{c}</li>)}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        );
    }

    // Default Fallback
    return (
        <div id="resume-preview" style={{ width: '210mm', minHeight: '297mm', backgroundColor: 'white', display: 'flex', margin: '0 auto', boxSizing: 'border-box', fontFamily: "'Inter', sans-serif" }}>
            <div style={{ width: '30%', backgroundColor: '#18181b', color: 'white', padding: '40px 20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', borderBottom: '2px solid #e11d74', marginBottom: '20px', textTransform: 'uppercase' }}>{data.fullName}</h1>
                <div style={{ fontSize: '11px', marginBottom: '30px', wordBreak: 'break-all' }}>
                    <p style={{ marginBottom: '10px' }}><strong>Email:</strong><br />{data.email}</p>
                    <p style={{ marginBottom: '10px' }}><strong>Phone:</strong><br />{data.phone}</p>
                    <p style={{ marginBottom: '10px' }}><strong>Location:</strong><br />{data.location}</p>
                </div>
                
                <h3 style={{ fontSize: '13px', color: '#e11d74', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '1px' }}>Technical Skills</h3>
                {skillsArray.map((s, i) => <div key={i} style={{ fontSize: '11px', marginBottom: '6px' }}>• {s}</div>)}
            </div>
            <div style={{ width: '70%', padding: '40px', color: '#18181b' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#18181b', marginBottom: '5px' }}>{data.currentTitle}</h2>
                <hr style={{ border: 'none', borderTop: '2px solid #f4f4f5', marginBottom: '25px' }} />
                
                <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px', color: '#e11d74' }}>Profile</h3>
                <p style={{ fontSize: '12px', lineHeight: '1.7', marginBottom: '30px', textAlign: 'justify' }}>{data.profileSummary}</p>

                {(data.jobTitle || data.companyName) && (
                    <>
                        <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px', color: '#e11d74' }}>{isFresher ? 'Internships & Projects' : 'Experience'}</h3>
                        <div style={{ fontSize: '12px', marginBottom: '30px' }}>
                            <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                                <span>{data.jobTitle}</span>
                                <span style={{ color: '#71717a' }}>{data.jobDuration}</span>
                            </div>
                            <div style={{ color: '#e11d74', marginBottom: '8px', fontWeight: '600' }}>{data.companyName}</div>
                            <p style={{ whiteSpace: 'pre-line', color: '#4b5563', lineHeight: '1.6' }}>{data.jobDescription}</p>
                        </div>
                    </>
                )}

                <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px', color: '#e11d74' }}>Education</h3>
                <div style={{ fontSize: '12px', marginBottom: '30px' }}>
                    <div style={{ fontWeight: 'bold' }}>{data.course}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{data.college}</span>
                        <span>{data.year}</span>
                    </div>
                    {data.cgpa && <div style={{ color: '#e11d74', fontStyle: 'italic' }}>Grade: {data.cgpa}</div>}
                </div>

                {certsArray.length > 0 && (
                    <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px', color: '#e11d74' }}>{isFresher ? 'Highlights' : 'Certifications'}</h3>
                        <div style={{ fontSize: '12px' }}>
                            {certsArray.map((c, i) => <div key={i} style={{ marginBottom: '5px' }}>• {c}</div>)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeTemplate;

