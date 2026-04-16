import { useState } from 'react';
import { User, Briefcase, GraduationCap, Award, Mail, Phone, MapPin, Search, CheckCircle } from 'lucide-react';

// Shared light-theme styles
const cardStyle = {
  background: 'white',
  borderRadius: '1.25rem',
  padding: '2rem',
  boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
  border: '1px solid #e5e7eb',
};

const inputStyle = {
  width: '100%',
  background: '#f9fafb',
  border: '1.5px solid #e5e7eb',
  borderRadius: '0.65rem',
  padding: '0.75rem 1rem',
  fontSize: '0.92rem',
  color: '#111827',
  boxSizing: 'border-box',
  outline: 'none',
  fontFamily: 'inherit',
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.35rem',
  fontSize: '0.82rem',
  fontWeight: 600,
  color: '#374151',
};

const sectionHeadStyle = {
  display: 'flex', alignItems: 'center', gap: '0.5rem',
  fontSize: '1rem', fontWeight: 700, color: '#1d4ed8',
  margin: '1.5rem 0 1rem',
  paddingTop: '1.25rem',
  borderTop: '1.5px solid #e5e7eb',
};

function ResumeForm({ onAnalyze }) {
  const [resumeType, setResumeType] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '', currentTitle: '', experienceYears: 0, skills: '',
    targetRole: 'Software Engineer', email: '', phone: '', location: '',
    companyName: '', jobTitle: '', jobDuration: '', jobLocation: '', jobDescription: '',
    course: '', otherCourse: '', college: '', year: '', cgpa: '', certifications: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsList = formData.skills.split(',').slice(0, 3).join(', ');
    let autoSummary = '';
    if (resumeType === 'fresher') {
      autoSummary = `Aspiring ${formData.targetRole} with a strong foundation in ${skillsList || 'various technologies'}. Recently graduated from ${formData.college} specializing in ${formData.course === 'Others' ? formData.otherCourse : formData.course}. Eager to contribute and grow in a professional environment.`;
    } else {
      autoSummary = `Performance-driven ${formData.currentTitle} with ${formData.experienceYears}+ years of expertise in ${skillsList || 'leading technologies'}. Proven track record in ${formData.targetRole} roles with a focus on delivering scalable solutions and driving business impact.`;
    }
    const finalCourse = formData.course === 'Others' ? formData.otherCourse : formData.course;
    const payload = {
      ...formData,
      course: finalCourse,
      profileSummary: autoSummary,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      experienceYears: parseInt(formData.experienceYears) || 0,
      resumeType,
    };
    onAnalyze(payload);
  };

  const engineeringDepts = [
    'B.E. Computer Science and Engineering',
    'B.E. Electronics and Communication Engineering',
    'B.E. Electrical and Electronics Engineering',
    'B.E. Mechanical Engineering',
    'B.E. Civil Engineering',
    'B.Tech Information Technology',
    'B.E. Biomedical Engineering',
    'B.E. Mechatronics Engineering',
    'B.Tech Artificial Intelligence and Data Science',
    'B.Tech Chemical Engineering',
    'B.E. Automobile Engineering',
    'B.E. Aeronautical Engineering',
    'Others',
  ];

  // ─── Path Selection Screen ───
  if (!resumeType) {
    return (
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.6rem', fontWeight: 800, color: '#111827', borderBottom: 'none', padding: 0, display: 'block' }}>
            Select Your Path
          </h2>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem' }}>Choose the module that best fits your experience level</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          {/* Fresher Card */}
          <div
            onClick={() => { setResumeType('fresher'); setFormData(p => ({ ...p, currentTitle: 'Fresher / Recent Graduate', experienceYears: 0 })); }}
            style={{ background: '#eff6ff', border: '2px solid #bfdbfe', borderRadius: '1rem', padding: '1.75rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.25s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(29,78,216,0.15)'; e.currentTarget.style.borderColor = '#2563eb'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#bfdbfe'; }}
          >
            <div style={{ width: '72px', height: '72px', background: '#dbeafe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: '#2563eb' }}>
              <GraduationCap size={36} />
            </div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.3rem', fontWeight: 800, color: '#111827' }}>Fresher</h3>
            <p style={{ margin: '0 0 1.25rem', color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.6 }}>Students or recent graduates with little or no work experience.</p>
            <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, margin: 0, fontSize: '0.82rem', color: '#374151', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle size={13} color="#2563eb" /> Education Highlighted</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle size={13} color="#2563eb" /> Projects &amp; Skills Focus</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle size={13} color="#2563eb" /> Internship Support</li>
            </ul>
          </div>

          {/* Experienced Card */}
          <div
            onClick={() => { setResumeType('experienced'); setFormData(p => ({ ...p, currentTitle: '', experienceYears: 1 })); }}
            style={{ background: '#fdf2f8', border: '2px solid #fbcfe8', borderRadius: '1rem', padding: '1.75rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.25s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(225,29,116,0.15)'; e.currentTarget.style.borderColor = '#e11d74'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#fbcfe8'; }}
          >
            <div style={{ width: '72px', height: '72px', background: '#fce7f3', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: '#e11d74' }}>
              <Briefcase size={36} />
            </div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.3rem', fontWeight: 800, color: '#111827' }}>Experienced</h3>
            <p style={{ margin: '0 0 1.25rem', color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.6 }}>Professionals with 1+ years of work experience in their field.</p>
            <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, margin: 0, fontSize: '0.82rem', color: '#374151', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle size={13} color="#e11d74" /> Job Experience Focus</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle size={13} color="#e11d74" /> Key Achievements</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle size={13} color="#e11d74" /> Industry Expertise</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const accentColor = resumeType === 'fresher' ? '#2563eb' : '#e11d74';

  return (
    <div style={cardStyle}>
      {/* Form Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '0.75rem', background: resumeType === 'fresher' ? '#dbeafe' : '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor }}>
            {resumeType === 'fresher' ? <GraduationCap size={22} /> : <Briefcase size={22} />}
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#111827', borderBottom: 'none', padding: 0, display: 'block' }}>
              {resumeType === 'fresher' ? 'Fresher Module' : 'Experienced Module'}
            </h2>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>Fill all fields to generate your resume</p>
          </div>
        </div>
        <button
          onClick={() => setResumeType(null)}
          style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#374151', borderRadius: '0.5rem', padding: '0.45rem 0.9rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', width: 'auto' }}
        >
          ← Change
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {/* Personal Info */}
        <div style={sectionHeadStyle}><User size={17} /> Personal Information</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={labelStyle}>Full Name</label>
            <input style={inputStyle} type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
          </div>
          <div>
            <label style={labelStyle}>Phone</label>
            <input style={inputStyle} type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(123) 456-7890" required />
          </div>
          <div>
            <label style={labelStyle}>Location</label>
            <input style={inputStyle} type="text" name="location" value={formData.location} onChange={handleChange} placeholder="City, State" required />
          </div>
        </div>

        {/* Experienced-Only: Job Info */}
        {resumeType === 'experienced' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>Current Job Title</label>
                <input style={inputStyle} type="text" name="currentTitle" value={formData.currentTitle} onChange={handleChange} placeholder="Senior Developer" required />
              </div>
              <div>
                <label style={labelStyle}>Experience (Years)</label>
                <input style={inputStyle} type="number" name="experienceYears" value={formData.experienceYears} onChange={handleChange} min="0" required />
              </div>
            </div>

            <div style={sectionHeadStyle}><Briefcase size={17} /> Work Experience</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>Company Name</label>
                <input style={inputStyle} type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Tech Solutions Inc." required />
              </div>
              <div>
                <label style={labelStyle}>Job Title</label>
                <input style={inputStyle} type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Software Developer" required />
              </div>
              <div>
                <label style={labelStyle}>Duration</label>
                <input style={inputStyle} type="text" name="jobDuration" value={formData.jobDuration} onChange={handleChange} placeholder="2021 - Present" required />
              </div>
              <div>
                <label style={labelStyle}>Job Location</label>
                <input style={inputStyle} type="text" name="jobLocation" value={formData.jobLocation} onChange={handleChange} placeholder="City, State" required />
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Key Responsibilities &amp; Achievements</label>
              <textarea style={{ ...inputStyle, resize: 'vertical' }} name="jobDescription" rows="4" value={formData.jobDescription} onChange={handleChange} placeholder="• Led development of microservices...&#10;• Improved system performance by 25%..." required />
            </div>
          </>
        )}

        {/* Target Role */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}><Search size={14} style={{ display: 'inline', marginRight: '4px' }} />Target Role for AI Analysis</label>
          <select style={inputStyle} name="targetRole" value={formData.targetRole} onChange={handleChange}>
            <option>Software Engineer</option>
            <option>Data Scientist</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Product Manager</option>
            <option>DevOps Engineer</option>
            <option>UX Designer</option>
          </select>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}><Award size={14} style={{ display: 'inline', marginRight: '4px' }} />Skills (comma separated)</label>
          <textarea style={{ ...inputStyle, resize: 'vertical' }} name="skills" rows="2" value={formData.skills} onChange={handleChange} placeholder="Java, React, SQL, Project Management..." required />
        </div>

        {/* Education */}
        <div style={sectionHeadStyle}><GraduationCap size={17} /> Education Details</div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Course / Department</label>
          <select style={inputStyle} name="course" value={formData.course} onChange={handleChange} required>
            <option value="">Select Department</option>
            {engineeringDepts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {formData.course === 'Others' && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Specify Department</label>
            <input style={inputStyle} type="text" name="otherCourse" value={formData.otherCourse} onChange={handleChange} placeholder="Enter your course" required />
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>College / University</label>
          <input style={inputStyle} type="text" name="college" value={formData.college} onChange={handleChange} placeholder="University of Technology" required />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={labelStyle}>Graduation Year</label>
            <input style={inputStyle} type="text" name="year" value={formData.year} onChange={handleChange} placeholder="2024" required />
          </div>
          <div>
            <label style={labelStyle}>CGPA / Percentage</label>
            <input style={inputStyle} type="text" name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="8.5 CGPA" required />
          </div>
        </div>

        {/* Certifications / Highlights */}
        <div style={{ background: '#f0f4ff', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #dbeafe' }}>
          <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.95rem', fontWeight: 700, color: '#1d4ed8' }}>Additional Highlights</h3>
          <label style={labelStyle}>Certifications / Main Projects</label>
          <textarea
            style={{ ...inputStyle, background: 'white', resize: 'vertical' }}
            name="certifications" rows="3"
            value={formData.certifications} onChange={handleChange}
            placeholder={resumeType === 'fresher'
              ? '• Final Year Project: AI Chatbot\n• AWS Cloud Practitioner Certification'
              : '• Oracle Certified Professional\n• Led high-scale architecture migration'}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          style={{ background: `linear-gradient(135deg, ${accentColor}, ${resumeType === 'fresher' ? '#4338ca' : '#be185d'})`, color: 'white', border: 'none', borderRadius: '0.75rem', padding: '1rem', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', boxShadow: `0 4px 18px ${accentColor}40`, width: '100%' }}
        >
          <Search size={20} />
          Analyze &amp; Build {resumeType === 'fresher' ? 'Fresher' : 'Professional'} Resume
        </button>
      </form>
    </div>
  );
}

export default ResumeForm;
