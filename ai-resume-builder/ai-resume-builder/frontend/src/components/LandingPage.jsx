import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Briefcase, FileText, Sparkles, CheckCircle, ArrowRight, Zap, Shield, Star } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goToModule = (type) => {
    if (user) {
      navigate('/builder', { state: { moduleType: type } });
    } else {
      navigate('/login', { state: { moduleType: type } });
    }
  };

  return (
    <div className="landing-root">
      {/* ── HERO SECTION ── */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>AI-Powered Resume Builder</span>
          </div>
          <h1 className="hero-title">
            Create Your Perfect Resume<br />
            <span className="hero-title-accent">with AI</span>
          </h1>
          <p className="hero-subtitle">
            Build professional resumes in minutes with AI tailored<br />
            for freshers and experienced professionals.
          </p>
          <div className="hero-cta-row">
            <button className="cta-btn cta-btn-primary" onClick={() => goToModule('fresher')}>
              <GraduationCap size={18} />
              For Freshers
              <ArrowRight size={16} />
            </button>
            <button className="cta-btn cta-btn-secondary" onClick={() => goToModule('experienced')}>
              <Briefcase size={18} />
              For Experienced
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Hero Visual — Illustrated Resume Mockup */}
        <div className="hero-visual">
          <div className="resume-mockup-float">
            <div className="mockup-header">
              <div className="mockup-avatar">
                <FileText size={22} color="#e11d74" />
              </div>
              <div>
                <div className="mockup-name-bar" />
                <div className="mockup-title-bar" style={{ width: '60%' }} />
              </div>
            </div>
            <div className="mockup-section-label">PROFILE</div>
            <div className="mockup-line full" />
            <div className="mockup-line full" />
            <div className="mockup-line" style={{ width: '75%' }} />
            <div className="mockup-section-label" style={{ marginTop: '1rem' }}>EDUCATION</div>
            <div className="mockup-line" style={{ width: '80%' }} />
            <div className="mockup-line full" />
            <div className="mockup-section-label" style={{ marginTop: '1rem' }}>SKILLS</div>
            <div className="mockup-skill-row">
              <div className="mockup-skill-chip" />
              <div className="mockup-skill-chip" />
              <div className="mockup-skill-chip" />
            </div>
          </div>

          <div className="hero-stats-badge stat-top">
            <Zap size={16} color="#f59e0b" />
            <span>ATS Optimized</span>
          </div>
          <div className="hero-stats-badge stat-bottom">
            <Star size={16} color="#10b981" />
            <span>AI Score: 94%</span>
          </div>
        </div>
      </section>

      {/* ── MODULE CARDS ── */}
      <section id="features" className="modules-section">
        <div className="module-card fresher-card">
          <div className="module-icon-wrap fresher-icon">
            <GraduationCap size={36} />
          </div>
          <div className="module-card-body">
            <h2 className="module-card-title">For Freshers</h2>
            <p className="module-card-desc">
              Create impactful resumes for graduates starting your careers with no experience.
            </p>
            <ul className="module-feature-list">
              <li><CheckCircle size={15} /> Education &amp; Projects Highlighted</li>
              <li><CheckCircle size={15} /> Internship Experience Support</li>
              <li><CheckCircle size={15} /> Skills-First AI Summary</li>
            </ul>
          </div>
          <button className="module-cta-btn fresher-cta" onClick={() => goToModule('fresher')}>
            <GraduationCap size={16} />
            Build for Freshers
          </button>
        </div>

        <div className="module-card exp-card">
          <div className="module-icon-wrap exp-icon">
            <Briefcase size={36} />
          </div>
          <div className="module-card-body">
            <h2 className="module-card-title">For Experienced</h2>
            <p className="module-card-desc">
              Build detailed resumes showcasing work history and deep professional expertise.
            </p>
            <ul className="module-feature-list">
              <li><CheckCircle size={15} /> Work History &amp; Achievements</li>
              <li><CheckCircle size={15} /> Industry Keyword Optimization</li>
              <li><CheckCircle size={15} /> Leadership &amp; Impact Focus</li>
            </ul>
          </div>
          <button className="module-cta-btn exp-cta" onClick={() => goToModule('experienced')}>
            <Briefcase size={16} />
            Build for Experienced
          </button>
        </div>
      </section>

      <section className="preview-strip">
        <h3 className="preview-strip-title">Professional Templates Ready to Use</h3>
        <div className="preview-cards-row">
          {['Jessica Smith', 'Rahul Sharma', 'Priya Nair'].map((name, i) => (
            <div 
              className="preview-card" 
              key={i} 
              style={{ transform: `rotate(${[-3, 0, 3][i]}deg)` }}
              onClick={() => goToModule('fresher')}
            >
              <div className="preview-card-inner">
                <div className="preview-card-header">
                  <div className="preview-avatar">
                    <FileText size={18} color={['#e11d74', '#3b82f6', '#10b981'][i]} />
                  </div>
                  <div>
                    <div className="preview-name">{name}</div>
                    <div className="preview-role">{['Graphic Designer', 'Software Engineer', 'Data Analyst'][i]}</div>
                  </div>
                </div>
                <div className="preview-section-tag">PROFILE</div>
                <div className="preview-line full" />
                <div className="preview-line" style={{ width: '80%' }} />
                <div className="preview-section-tag" style={{ marginTop: '8px' }}>EDUCATION</div>
                <div className="preview-line" style={{ width: '70%' }} />
                <div className="preview-line full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .landing-root {
          background: #f0f4ff;
          min-height: 100vh;
          color: #1e1e2e;
          font-family: 'Inter', sans-serif;
        }

        /* ── HERO ── */
        .hero-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 2rem 4rem;
        }
        .hero-content { flex: 1; }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(59,130,246,0.12);
          color: #2563eb;
          padding: 0.4rem 1rem;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(59,130,246,0.25);
        }
        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.15;
          margin: 0 0 1.2rem;
          color: #111827;
          letter-spacing: -0.02em;
        }
        .hero-title-accent {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .hero-subtitle {
          font-size: 1.05rem;
          color: #4b5563;
          line-height: 1.75;
          margin-bottom: 2.5rem;
        }
        .hero-cta-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .cta-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1.75rem;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          border: none;
          width: auto;
          letter-spacing: 0.01em;
          transition: all 0.2s ease;
        }
        .cta-btn-primary {
          background: linear-gradient(135deg, #1d4ed8, #4338ca);
          color: white;
          box-shadow: 0 4px 20px rgba(29,78,216,0.35);
        }
        .cta-btn-primary:hover { opacity: 1; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(29,78,216,0.4); }
        .cta-btn-secondary {
          background: #1e293b;
          color: white;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }
        .cta-btn-secondary:hover { opacity: 1; transform: translateY(-2px); background: #0f172a; }

        /* ── HERO VISUAL ── */
        .hero-visual {
          flex: 1;
          max-width: 400px;
          position: relative;
          display: flex;
          justify-content: center;
        }
        .resume-mockup-float {
          background: white;
          border-radius: 1.25rem;
          padding: 2rem;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08);
          width: 100%;
          animation: floatUpDown 4s ease-in-out infinite;
          border: 1px solid #e5e7eb;
        }
        @keyframes floatUpDown {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .mockup-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f3f4f6;
        }
        .mockup-avatar {
          width: 48px; height: 48px;
          background: #fff1f2;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          border: 2px solid #fecdd3;
        }
        .mockup-name-bar { height: 12px; background: #1f2937; border-radius: 4px; width: 120px; margin-bottom: 6px; }
        .mockup-title-bar { height: 9px; background: #d1d5db; border-radius: 4px; }
        .mockup-section-label {
          font-size: 0.6rem; font-weight: 800;
          color: #e11d74; letter-spacing: 2px;
          text-transform: uppercase; margin-bottom: 8px;
        }
        .mockup-line {
          height: 8px; background: #e5e7eb; border-radius: 4px;
          margin-bottom: 6px; width: 100%;
        }
        .mockup-line.full { width: 100%; }
        .mockup-skill-row { display: flex; gap: 6px; margin-top: 4px; }
        .mockup-skill-chip { height: 20px; width: 60px; background: #dbeafe; border-radius: 10px; }
        .hero-stats-badge {
          position: absolute;
          display: flex; align-items: center; gap: 6px;
          background: white;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #1f2937;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          border: 1px solid #e5e7eb;
        }
        .stat-top { top: -1rem; right: -1.5rem; }
        .stat-bottom { bottom: 0.5rem; left: -1.5rem; }

        /* ── MODULES SECTION ── */
        .modules-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto 4rem;
          padding: 0 2rem;
        }
        .module-card {
          background: white;
          border-radius: 1.5rem;
          padding: 2.5rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border: 1px solid #e5e7eb;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .module-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,0.12); }
        .module-icon-wrap {
          width: 72px; height: 72px;
          border-radius: 1rem;
          display: flex; align-items: center; justify-content: center;
        }
        .fresher-icon { background: #dbeafe; color: #2563eb; }
        .exp-icon { background: #fce7f3; color: #e11d74; }
        .module-card-body { flex: 1; }
        .module-card-title {
          font-size: 1.6rem; font-weight: 800;
          color: #111827; margin: 0 0 0.6rem;
          border: none; padding: 0; display: block;
        }
        .module-card-desc {
          color: #6b7280; font-size: 0.95rem;
          line-height: 1.7; margin: 0 0 1.25rem;
        }
        .module-feature-list {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 0.5rem;
        }
        .module-feature-list li {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.88rem; font-weight: 600; color: #374151;
        }
        .module-feature-list li svg { color: #10b981; flex-shrink: 0; }
        .module-cta-btn {
          display: flex; align-items: center; justify-content: center;
          gap: 0.6rem;
          padding: 0.85rem 1.5rem;
          border-radius: 0.75rem;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          border: none;
          width: 100%;
          transition: all 0.2s ease;
        }
        .fresher-cta { background: #1e3a8a; color: white; }
        .fresher-cta:hover { opacity: 1; background: #1d4ed8; transform: translateY(-1px); }
        .exp-cta { background: #1e293b; color: white; }
        .exp-cta:hover { opacity: 1; background: #0f172a; transform: translateY(-1px); }

        /* ── PREVIEW STRIP ── */
        .preview-strip {
          background: linear-gradient(135deg, #1e293b, #0f172a);
          padding: 4rem 2rem;
          text-align: center;
        }
        .preview-strip-title {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          letter-spacing: -0.01em;
        }
        .preview-cards-row {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .preview-card {
          background: white;
          border-radius: 0.75rem;
          width: 200px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          transition: transform 0.3s ease;
          cursor: pointer;
        }
        .preview-card:hover { transform: rotate(0deg) translateY(-8px) !important; }
        .preview-card-inner { padding: 1.25rem; }
        .preview-card-header {
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .preview-avatar {
          width: 36px; height: 36px;
          background: #f9fafb;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid #e5e7eb;
          flex-shrink: 0;
        }
        .preview-name { font-size: 0.8rem; font-weight: 700; color: #111827; }
        .preview-role { font-size: 0.68rem; color: #9ca3af; }
        .preview-section-tag {
          font-size: 0.55rem; font-weight: 800;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: #e11d74; margin-bottom: 5px;
        }
        .preview-line {
          height: 6px; background: #e5e7eb;
          border-radius: 3px; margin-bottom: 4px;
        }
        .preview-line.full { width: 100%; }

        @media (max-width: 900px) {
          .hero-section { flex-direction: column; text-align: center; padding: 3rem 1.5rem 2rem; }
          .hero-cta-row { justify-content: center; }
          .hero-visual { max-width: 340px; }
          .stat-top { right: 0; }
          .stat-bottom { left: 0; }
          .modules-section { grid-template-columns: 1fr; padding: 0 1.5rem; }
          .hero-title { font-size: 2.2rem; }
        }
      `}</style>
    </div>
  );
}
