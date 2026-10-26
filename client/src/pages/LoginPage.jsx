import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your institutional email and password.');
      return;
    }

    setLoading(true);
    try {
      const result = await login({ email: email.trim(), password });
      toast.success(`Welcome back, ${result.user.name}!`);
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role) => {
    if (role === 'admin') {
      setEmail('admin@alumniconnect.edu');
      setPassword('Admin@12345');
    } else {
      setEmail('sarah.chen@alumniconnect.edu');
      setPassword('Alumni@12345');
    }
    setErrorMessage('');
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2 mb-2 group">
          <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center text-white shadow-soft-sm group-hover:bg-brand-navy-light transition-colors">
            <GraduationCap className="w-6 h-6 text-brand-blue-light" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-brand-navy">
            Alumni<span className="text-brand-blue">Connect</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-brand-navy">
          Sign In to Your Alumni Account
        </h2>
        <p className="text-xs text-text-secondary">
          Reconnect with graduates, discover career mentors, and join exclusive events.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <Card className="p-8 shadow-soft-lg space-y-6">
          {/* Demo Credentials Quick-Fill Toolbar */}
          <div className="p-3.5 rounded-xl bg-brand-blue-50/80 border border-brand-blue/20 text-left space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-brand-navy uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                Demo Credentials Quick-Fill
              </span>
              <span className="text-[10px] text-text-muted">One-click test</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemo('alumni')}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-white border border-brand-blue/30 text-brand-navy hover:bg-brand-blue-light transition-all text-left"
              >
                &bull; Alumni (Sarah Chen)
              </button>
              <button
                type="button"
                onClick={() => fillDemo('admin')}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-white border border-brand-blue/30 text-brand-blue hover:bg-brand-blue-light transition-all text-left"
              >
                &bull; Admin (Staff)
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-status-error-bg text-status-error text-xs font-medium border border-status-error/30" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <Input
              label="Alumni Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@alumniconnect.edu"
              leftIcon={Mail}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={Lock}
              required
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-blue border-border"
                />
                <span className="text-text-secondary font-medium">Remember my session</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-brand-blue hover:underline font-semibold"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="navy"
              size="lg"
              className="w-full mt-2"
              isLoading={loading}
              rightIcon={ArrowRight}
            >
              Sign In
            </Button>
          </form>

          <div className="pt-4 border-t border-border text-center text-xs text-text-secondary">
            <span>New graduate or haven't activated your account? </span>
            <Link to="/register" className="text-brand-blue font-bold hover:underline">
              Join the Network
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
