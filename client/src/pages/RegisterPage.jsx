import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, User, Building, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Card } from '../components/common/Card';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    graduationYear: '2024',
    department: 'Computer Science & Engineering',
    degree: 'B.Tech in Computer Science',
    currentJobTitle: '',
    currentCompany: '',
    location: '',
    acceptTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (formData.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    if (!formData.acceptTerms) {
      setErrorMessage('Please accept the Alumni Network Terms and Code of Conduct.');
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      toast.success('Registration successful! Welcome to AlumniConnect.');
      navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2 mb-2 group">
          <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center text-white shadow-soft-sm group-hover:bg-brand-navy-light transition-colors">
            <GraduationCap className="w-6 h-6 text-brand-blue-light" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-brand-navy">
            Alumni<span className="text-brand-blue">Connect</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-brand-navy">
          Join Your University Alumni Network
        </h2>
        <p className="text-xs text-text-secondary">
          Activate your verified graduate directory listing and connect with thousands of classmates.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4 sm:px-0">
        <Card className="p-8 shadow-soft-lg space-y-6">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-status-error-bg text-status-error text-xs font-medium border border-status-error/30" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Jane Doe"
                leftIcon={User}
                required
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane.doe@example.com"
                leftIcon={Mail}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Password (min 8 characters)"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                leftIcon={Lock}
                required
              />
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                leftIcon={Lock}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-1.5">
                  Graduation Year *
                </label>
                <select
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  className="w-full text-xs rounded-xl border border-border bg-white px-3 py-2.5 text-text-primary focus:border-brand-blue focus:outline-none"
                  required
                >
                  {[...Array(25)].map((_, i) => {
                    const year = 2026 - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-1.5">
                  Academic Department *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full text-xs rounded-xl border border-border bg-white px-3 py-2.5 text-text-primary focus:border-brand-blue focus:outline-none"
                  required
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electrical & Electronics Engineering">Electrical & Electronics Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Biotechnology & Bioinformatics">Biotechnology & Bioinformatics</option>
                  <option value="Mathematics & Computing">Mathematics & Computing</option>
                  <option value="Management Studies">Management Studies</option>
                </select>
              </div>
            </div>

            <Input
              label="Degree Conferred"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              placeholder="e.g. B.Tech in Computer Science"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Current Occupation / Title"
                name="currentJobTitle"
                value={formData.currentJobTitle}
                onChange={handleChange}
                placeholder="e.g. Software Engineer"
                leftIcon={Building}
              />
              <Input
                label="Current Organization / Company"
                name="currentCompany"
                value={formData.currentCompany}
                onChange={handleChange}
                placeholder="e.g. Google, Stripe, Freelance"
                leftIcon={Building}
              />
            </div>

            <Input
              label="City & Country of Residence"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Bengaluru, India or Seattle, USA"
              leftIcon={MapPin}
            />

            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded text-brand-blue border-border"
                />
                <span className="text-xs text-text-secondary leading-snug">
                  I confirm that I am a graduate or student of Apex Institute of Technology and agree to the Alumni Network Terms and Community Guidelines.
                </span>
              </label>
            </div>

            <Button
              type="submit"
              variant="navy"
              size="lg"
              className="w-full mt-2"
              isLoading={loading}
              rightIcon={ArrowRight}
            >
              Complete Registration
            </Button>
          </form>

          <div className="pt-4 border-t border-border text-center text-xs text-text-secondary">
            <span>Already registered? </span>
            <Link to="/login" className="text-brand-blue font-bold hover:underline">
              Sign In to Your Account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
