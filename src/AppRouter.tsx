import { Routes, Route } from 'react-router-dom';

// Marketing template
import MarketingPage from '../templates/marketing/src/MarketingPage';
import Intro from '../templates/marketing/src/Intro';
import Preview from '../templates/marketing/src/Preview';

// Authentication (signin/signup)
import SignIn from '../templates/signin/src/SignIn';
import SignUp from '../templates/signup/src/SignUp';
import KYC from '../templates/signup/src/KYC';

// Dashboard (investor/admin area)
import Dashboard from './Dashboard';
import AdminDashboard from './admin/AdminDashboard';

export default function AppRouter() {
  return (
    <Routes>
      {/* Root marketing page */}
      <Route path="/" element={<MarketingPage />} />

      {/* Authentication routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/kyc" element={<KYC />} />
      <Route path="/intro" element={<Intro />} />
      <Route path="/preview" element={<Preview />} />

      {/* Admin dashboard (separate path) */}
      <Route path="/admin/*" element={<AdminDashboard />} />
      {/* Dashboard routes mounted under /app to avoid collision with marketing internal routes */}
      <Route path="/app/*" element={<Dashboard />} />
    </Routes>
  );
}
