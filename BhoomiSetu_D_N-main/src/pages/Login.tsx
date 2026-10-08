import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Globe, LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import type { UserRole } from '@/lib/types';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('citizen');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error);
        setLoading(false);
      } else {
        navigate('/dashboard');
      }
    } else {
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, role);
      if (error) {
        setError(error);
        setLoading(false);
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-forest-700 text-cream-50 mb-3">
            <Globe className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-navy-900">BhoomiSetu</h1>
          <p className="text-sm text-navy-400">Sign in to save research and access your dashboard</p>
        </div>

        <div className="card">
          {/* Mode tabs */}
          <div className="flex gap-1 mb-6 rounded-lg bg-cream-100 p-1">
            <button
              onClick={() => { setMode('login'); setError(null); }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                mode === 'login' ? 'bg-white text-forest-800 shadow-soft' : 'text-navy-500 hover:text-navy-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setError(null); }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                mode === 'register' ? 'bg-white text-forest-800 shadow-soft' : 'text-navy-500 hover:text-navy-700'
              }`}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 flex items-start gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-navy-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-field mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-navy-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="input-field mt-1"
              />
            </div>

            {mode === 'register' && (
              <div>
                <label className="text-sm font-medium text-navy-700">Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="input-field mt-1">
                  <option value="citizen">Citizen</option>
                  <option value="researcher">Researcher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {mode === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-navy-400">
            By signing in, you agree to use this prototype platform for demonstration purposes only.
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-navy-400">
          <Link to="/" className="hover:text-forest-700">Back to home</Link>
        </p>
      </div>
    </div>
  );
}
