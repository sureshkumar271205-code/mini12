import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import ResumeArchitect from './components/ResumeArchitect';
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen text-zinc-50 selection:bg-rose-500/30">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/builder"
                element={
                  <ProtectedRoute>
                    <ResumeArchitect />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <footer style={{ textAlign: 'center', padding: '2rem 0', color: '#6b7280', fontSize: '0.85rem', background: '#0f172a' }}>
            <p>&copy; 2026 AI Resume Builder. Create professional resumes powered by AI.</p>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
