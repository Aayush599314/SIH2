import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Research from '@/pages/Research';
import ResearchDetail from '@/pages/ResearchDetail';
import DataExplorer from '@/pages/DataExplorer';
import DatasetDetail from '@/pages/DatasetDetail';
import LandInsights from '@/pages/LandInsights';
import Policy from '@/pages/Policy';
import CaseStudies from '@/pages/CaseStudies';
import KnowledgeCentre from '@/pages/KnowledgeCentre';
import About from '@/pages/About';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import PolicyRepository from '@/pages/PolicyRepository';
import PolicySimulation from '@/pages/PolicySimulation';
import GovernanceInsights from '@/pages/GovernanceInsights';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/research/:id" element={<ResearchDetail />} />
            <Route path="/data" element={<DataExplorer />} />
            <Route path="/data/:id" element={<DatasetDetail />} />
            <Route path="/land-insights" element={<LandInsights />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/knowledge" element={<KnowledgeCentre />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Policy & Research Hub — SIH 2026 */}
            <Route path="/repository" element={<PolicyRepository />} />
            <Route path="/simulation" element={<PolicySimulation />} />
            <Route path="/insights" element={<GovernanceInsights />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

