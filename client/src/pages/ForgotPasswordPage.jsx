import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
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
          Reset Your Account Password
        </h2>
        <p className="text-xs text-text-secondary">
          Enter your registered institutional email to receive a password reset token.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <Card className="p-8 shadow-soft-lg space-y-6 text-left">
          {submitted ? (
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-status-success-bg text-status-success flex items-center justify-center mx-auto ring-8 ring-status-success-bg/50">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Password Reset Link Sent
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                If an account exists for <strong className="text-text-primary">{email}</strong>, a secure password reset link has been dispatched.
              </p>

              <div className="p-3.5 rounded-xl bg-bg-alt border border-border text-left space-y-1">
                <span className="text-[11px] font-bold text-text-primary flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-brand-blue" />
                  Demonstration Notice
                </span>
                <p className="text-[11px] text-text-secondary">
                  External SMTP email delivery is disabled in demo mode. For evaluation purposes, you can immediately sign in using the demo quick-fill credentials on the login screen.
                </p>
              </div>

              <Link to="/login" className="block pt-2">
                <Button variant="navy" className="w-full">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Registered Alumni Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@alumniconnect.edu"
                leftIcon={Mail}
                required
              />

              <Button
                type="submit"
                variant="navy"
                size="lg"
                className="w-full mt-2"
                isLoading={loading}
              >
                Send Reset Link
              </Button>

              <div className="pt-4 border-t border-border text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-blue font-semibold hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
