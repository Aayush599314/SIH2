import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Globe,
  Menu,
  X,
  LayoutDashboard,
  LogIn,
  LogOut,
  ChevronDown,
  BookOpen,
  Sliders,
  BarChart3,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Research Hub', path: '/research' },
  { label: 'Data & Evidence', path: '/data' },
  { label: 'Land Insights', path: '/land-insights' },
  { label: 'Policy Innovation', path: '/policy' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'Knowledge Centre', path: '/knowledge' },
  { label: 'About', path: '/about' },
];

const hubLinks = [
  { label: 'Research & Policy Repository', path: '/repository', icon: BookOpen, description: 'Search papers & policies' },
  { label: 'Policy Simulation Lab', path: '/simulation', icon: Sliders, description: 'What-If scenario engine' },
  { label: 'Governance Insights', path: '/insights', icon: BarChart3, description: 'Analytics & KPIs' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [hubMenuOpen, setHubMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const hubRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    setHubMenuOpen(false);
  }, [location.pathname]);

  // Close hub dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (hubRef.current && !hubRef.current.contains(e.target as Node)) {
        setHubMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isHubActive = ['/repository', '/simulation', '/insights'].includes(location.pathname);

  return (
    <>
      {/* Top government bar */}
      <div className="bg-navy-900 text-cream-100 text-xs py-1.5 hidden sm:block">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-saffron-400" />
            Government of India | Ministry of Rural Development
          </span>
          <span className="text-cream-300">भूमि सेतु · National Land Governance Platform</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur shadow-soft' : 'bg-white'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-700 text-cream-50 transition-transform group-hover:scale-105">
                <Globe className="w-6 h-6" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-lg font-bold text-forest-800">BhoomiSetu</span>
                <span className="text-[10px] text-navy-500 uppercase tracking-wider">Land Governance Platform</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    location.pathname === link.path
                      ? 'bg-forest-50 text-forest-800'
                      : 'text-navy-600 hover:text-forest-700 hover:bg-forest-50/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Policy & Research Hub dropdown */}
              <div className="relative" ref={hubRef}>
                <button
                  onClick={() => setHubMenuOpen(!hubMenuOpen)}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    isHubActive
                      ? 'bg-saffron-50 text-saffron-800 ring-1 ring-saffron-400/30'
                      : 'text-navy-600 hover:text-forest-700 hover:bg-forest-50/50'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  Policy Hub
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${hubMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {hubMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-xl border border-forest-900/10 bg-white shadow-lift py-2 animate-scale-in origin-top-right z-50">
                    <div className="px-4 py-2 border-b border-forest-900/10">
                      <p className="text-xs font-semibold text-saffron-700 uppercase tracking-wider">Policy & Research Hub</p>
                      <p className="text-[10px] text-navy-400 mt-0.5">SIH 2026 · Digital Land Governance</p>
                    </div>
                    {hubLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                            location.pathname === link.path
                              ? 'bg-forest-50 text-forest-800 font-medium'
                              : 'text-navy-700 hover:bg-forest-50'
                          }`}
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-50 shrink-0">
                            <Icon className="w-4 h-4 text-forest-700" />
                          </div>
                          <div>
                            <span className="block text-sm font-medium leading-tight">{link.label}</span>
                            <span className="block text-[10px] text-navy-400">{link.description}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* User actions */}
            <div className="flex items-center gap-2">
              {user ? (
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 rounded-lg border border-forest-900/15 px-3 py-2 text-sm font-medium text-navy-700 hover:bg-forest-50 transition-all"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-700 text-cream-50 text-xs font-semibold">
                      {user.email.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown className="w-4 h-4 text-navy-400" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-forest-900/10 bg-white shadow-lift py-2 animate-scale-in origin-top-right">
                      <div className="px-4 py-2 border-b border-forest-900/10">
                        <p className="text-xs text-navy-400">Signed in as</p>
                        <p className="text-sm font-medium text-navy-800 truncate">{user.email}</p>
                        <span className="badge bg-forest-50 text-forest-700 mt-1">{user.role}</span>
                      </div>
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy-700 hover:bg-forest-50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="hidden sm:inline-flex btn-primary">
                  <LogIn className="w-4 h-4" /> Sign In
                </Link>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-navy-700 hover:bg-forest-50"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-forest-900/10 bg-white animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    location.pathname === link.path
                      ? 'bg-forest-50 text-forest-800'
                      : 'text-navy-600 hover:bg-forest-50/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile: Policy & Research Hub section */}
              <div className="pt-2 border-t border-forest-900/10">
                <p className="px-3 py-1.5 text-[10px] font-semibold text-saffron-700 uppercase tracking-wider">Policy & Research Hub</p>
                {hubLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                        location.pathname === link.path
                          ? 'bg-saffron-50 text-saffron-800'
                          : 'text-navy-600 hover:bg-forest-50/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-forest-900/10">
                {user ? (
                  <>
                    <Link to="/dashboard" className="block px-3 py-2.5 text-sm font-medium text-navy-700 hover:bg-forest-50 rounded-lg">
                      Dashboard
                    </Link>
                    <button onClick={handleSignOut} className="block w-full text-left px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="block px-3 py-2.5 text-sm font-medium text-forest-700 hover:bg-forest-50 rounded-lg">
                    Sign In / Register
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
