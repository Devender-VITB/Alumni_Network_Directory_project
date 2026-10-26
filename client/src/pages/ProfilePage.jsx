import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  GraduationCap, 
  CheckCircle2, 
  Compass, 
  Linkedin, 
  Github, 
  Globe, 
  Mail, 
  Phone, 
  Briefcase, 
  Award, 
  BookOpen, 
  Edit3, 
  ArrowLeft,
  Calendar,
  Lock,
  Share2
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { Button } from '../components/common/Button';
import { ProfileSkeleton } from '../components/common/Skeleton';
import { ErrorState } from '../components/common/ErrorState';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { alumniService } from '../services/alumniService';

export const ProfilePage = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit Profile Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  // Is viewing user the owner of this profile or admin?
  const isOwner = Boolean(
    user && (user.id === profile?.userId || user.id === profile?.id || user.role === 'admin' || (user.id === 'usr-101' && profile?.id === 'alm-101'))
  );

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await alumniService.getAlumniById(id);
        setProfile(data);
        setEditFormData({
          fullName: data.fullName || '',
          headline: data.headline || '',
          currentJobTitle: data.currentJobTitle || '',
          currentCompany: data.currentCompany || '',
          location: data.location || '',
          bio: data.bio || '',
          skills: data.skills ? data.skills.join(', ') : '',
          mentorshipAvailable: data.mentorshipAvailable || false,
          shareEmail: data.contactSharingPreferences?.email || false,
          linkedin: data.contactSharingPreferences?.linkedin || '',
          github: data.contactSharingPreferences?.github || '',
          portfolio: data.contactSharingPreferences?.portfolio || '',
        });
      } catch (err) {
        setError(err.message || 'Profile could not be found');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const skillsArray = editFormData.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const updatedPayload = {
        fullName: editFormData.fullName,
        headline: editFormData.headline,
        currentJobTitle: editFormData.currentJobTitle,
        currentCompany: editFormData.currentCompany,
        location: editFormData.location,
        bio: editFormData.bio,
        skills: skillsArray,
        mentorshipAvailable: editFormData.mentorshipAvailable,
        contactSharingPreferences: {
          ...profile.contactSharingPreferences,
          email: editFormData.shareEmail,
          linkedin: editFormData.linkedin,
          github: editFormData.github,
          portfolio: editFormData.portfolio,
        },
      };

      const result = await alumniService.updateProfile(profile.id, updatedPayload);
      setProfile((prev) => ({ ...prev, ...result }));
      toast.success('Profile updated successfully');
      setIsEditModalOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ProfileSkeleton />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ErrorState
          title="Alumni Profile Not Found"
          message="The requested alumni profile could not be located or may have been restricted."
          onRetry={() => navigate('/directory')}
        />
      </div>
    );
  }

  const prefs = profile.contactSharingPreferences || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Back to Directory Button */}
      <div className="flex items-center justify-between">
        <Link
          to="/directory"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-navy hover:text-brand-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Alumni Directory
        </Link>

        {isOwner && (
          <Button
            variant="outline"
            size="sm"
            leftIcon={Edit3}
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>

      {/* Profile Header Hero Card */}
      <div className="rounded-3xl border border-border bg-white shadow-soft overflow-hidden">
        {/* Banner pattern */}
        <div className="h-32 sm:h-44 bg-gradient-to-r from-brand-navy via-brand-navy-light to-brand-blue relative" />

        <div className="px-6 sm:px-10 pb-8 relative">
          {/* Avatar positioned over banner */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6 text-center sm:text-left">
            <div className="relative">
              <Avatar
                src={profile.profileImage}
                name={profile.fullName}
                size="2xl"
                className="ring-4 ring-white shadow-soft-lg"
              />
              {profile.isVerified && (
                <div
                  className="absolute bottom-1 right-1 bg-brand-blue text-white rounded-full p-1 shadow-soft-sm ring-2 ring-white"
                  title="Verified Alumni Member"
                >
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="navy" size="md">
                Class of {profile.graduationYear}
              </Badge>
              {profile.mentorshipAvailable && (
                <Badge variant="success" size="md" icon={Compass}>
                  Available for Mentorship
                </Badge>
              )}
            </div>
          </div>

          {/* Core Info */}
          <div className="space-y-3 text-left">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
                {profile.fullName}
              </h1>
              <p className="text-base text-brand-blue font-medium mt-0.5">
                {profile.headline || `${profile.currentJobTitle} at ${profile.currentCompany}`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-text-secondary pt-1">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-text-muted" />
                <span>{profile.currentCompany} &bull; {profile.industry}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-text-muted" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-text-muted" />
                <span>{profile.degree} &bull; {profile.department}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Details Left, Contact & Quick Info Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
        {/* Left Column: Biography, Experience, Education, Projects */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <Card>
            <h3 className="text-base font-bold text-brand-navy uppercase tracking-wider mb-3">
              About
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
              {profile.bio || 'No professional biography provided yet.'}
            </p>
          </Card>

          {/* Professional Experience */}
          {profile.experience && profile.experience.length > 0 && (
            <Card className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Briefcase className="w-5 h-5 text-brand-navy" />
                <h3 className="text-base font-bold text-brand-navy uppercase tracking-wider">
                  Professional Experience
                </h3>
              </div>

              <div className="space-y-6">
                {profile.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-brand-blue/30 space-y-1">
                    <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-brand-blue" />
                    <h4 className="text-sm font-bold text-text-primary">{exp.title}</h4>
                    <p className="text-xs font-semibold text-brand-blue">{exp.company} &bull; {exp.location}</p>
                    <p className="text-[11px] text-text-muted">
                      {exp.startDate} &mdash; {exp.isCurrent ? 'Present' : exp.endDate}
                    </p>
                    {exp.description && (
                      <p className="text-xs text-text-secondary pt-1 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Education History */}
          {profile.education && profile.education.length > 0 && (
            <Card className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <BookOpen className="w-5 h-5 text-brand-navy" />
                <h3 className="text-base font-bold text-brand-navy uppercase tracking-wider">
                  Education & Alma Mater
                </h3>
              </div>

              <div className="space-y-4">
                {profile.education.map((edu, idx) => (
                  <div key={idx} className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-text-primary">{edu.institution}</h4>
                      <p className="text-xs text-text-secondary">{edu.degree} in {edu.fieldOfStudy}</p>
                    </div>
                    <span className="text-xs font-medium text-text-muted">
                      {edu.startYear} &ndash; {edu.endYear}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Achievements & Certifications */}
          {profile.achievements && profile.achievements.length > 0 && (
            <Card className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Award className="w-5 h-5 text-brand-navy" />
                <h3 className="text-base font-bold text-brand-navy uppercase tracking-wider">
                  Honors & Achievements
                </h3>
              </div>

              <ul className="space-y-2.5">
                {profile.achievements.map((ach, idx) => (
                  <li key={idx} className="text-xs text-text-secondary flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Right Column: Skills, Mentorship, Contact & Social */}
        <div className="space-y-6">
          {/* Skills Card */}
          <Card>
            <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider mb-3">
              Skills & Expertise
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills && profile.skills.length > 0 ? (
                profile.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-lg bg-bg-alt text-text-primary border border-border"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-xs text-text-muted">No skills listed yet.</p>
              )}
            </div>
          </Card>

          {/* Mentorship Focus Areas */}
          {profile.mentorshipAvailable && (
            <Card className="bg-brand-blue-50/50 border-brand-blue/30 space-y-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-brand-blue" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                  Mentorship Focus
                </h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {profile.fullName.split(' ')[0]} is open to advising students and fellow alumni in:
              </p>
              <ul className="space-y-1.5">
                {profile.mentorshipTopics && profile.mentorshipTopics.length > 0 ? (
                  profile.mentorshipTopics.map((topic, idx) => (
                    <li key={idx} className="text-xs font-medium text-brand-navy flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                      {topic}
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-brand-navy">General Career Mentorship & Industry Insights</li>
                )}
              </ul>
            </Card>
          )}

          {/* Verified Contact & Social Links */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider">
                Connect
              </h3>
              <div className="flex items-center gap-1 text-[11px] text-text-muted">
                <Lock className="w-3 h-3" />
                <span>Privacy-controlled</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              {prefs.email && profile.email ? (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 text-brand-blue hover:underline p-2 rounded-lg hover:bg-bg-alt transition-colors"
                >
                  <Mail className="w-4 h-4 text-text-muted" />
                  <span className="truncate">{profile.email}</span>
                </a>
              ) : (
                <div className="flex items-center gap-2 text-text-muted p-2">
                  <Mail className="w-4 h-4" />
                  <span>Email hidden by member</span>
                </div>
              )}

              {prefs.linkedin && (
                <a
                  href={prefs.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-primary hover:text-brand-blue p-2 rounded-lg hover:bg-bg-alt transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-brand-blue" />
                  <span className="truncate">LinkedIn Profile</span>
                </a>
              )}

              {prefs.github && (
                <a
                  href={prefs.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-primary hover:text-brand-blue p-2 rounded-lg hover:bg-bg-alt transition-colors"
                >
                  <Github className="w-4 h-4 text-text-primary" />
                  <span className="truncate">GitHub Profile</span>
                </a>
              )}

              {prefs.portfolio && (
                <a
                  href={prefs.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-primary hover:text-brand-blue p-2 rounded-lg hover:bg-bg-alt transition-colors"
                >
                  <Globe className="w-4 h-4 text-emerald-600" />
                  <span className="truncate">Portfolio / Website</span>
                </a>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Edit Profile Modal Dialog */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Alumni Profile"
        description="Update your public directory card, professional headline, skills, and privacy preferences."
        maxWidth="max-w-2xl"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="blue" onClick={handleEditSubmit} isLoading={isSubmitting}>
              Save Profile Changes
            </Button>
          </>
        }
      >
        <form onSubmit={handleEditSubmit} className="space-y-4 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={editFormData.fullName || ''}
              onChange={(e) => setEditFormData({ ...editFormData, fullName: e.target.value })}
              required
            />
            <Input
              label="Current Job Title"
              value={editFormData.currentJobTitle || ''}
              onChange={(e) => setEditFormData({ ...editFormData, currentJobTitle: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Current Company"
              value={editFormData.currentCompany || ''}
              onChange={(e) => setEditFormData({ ...editFormData, currentCompany: e.target.value })}
              required
            />
            <Input
              label="Location (City, Country)"
              value={editFormData.location || ''}
              onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
              required
            />
          </div>

          <Input
            label="Professional Headline"
            value={editFormData.headline || ''}
            onChange={(e) => setEditFormData({ ...editFormData, headline: e.target.value })}
            placeholder="e.g. Senior Software Architect at Google | Cloud Systems"
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-1.5">
              Biography
            </label>
            <textarea
              rows={4}
              value={editFormData.bio || ''}
              onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
              className="w-full rounded-xl border border-border bg-white p-3 text-sm text-text-primary focus:border-brand-blue focus:outline-none"
              placeholder="Tell fellow alumni about your journey and achievements..."
            />
          </div>

          <Input
            label="Skills (Comma-separated)"
            value={editFormData.skills || ''}
            onChange={(e) => setEditFormData({ ...editFormData, skills: e.target.value })}
            placeholder="e.g. React, Node.js, Cloud Architecture, Product Strategy"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Input
              label="LinkedIn URL"
              value={editFormData.linkedin || ''}
              onChange={(e) => setEditFormData({ ...editFormData, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/username"
            />
            <Input
              label="GitHub URL"
              value={editFormData.github || ''}
              onChange={(e) => setEditFormData({ ...editFormData, github: e.target.value })}
              placeholder="https://github.com/username"
            />
          </div>

          {/* Privacy & Mentorship Toggles */}
          <div className="p-4 rounded-xl bg-bg-alt/70 space-y-3 border border-border">
            <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider">
              Privacy & Availability Settings
            </h4>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={editFormData.mentorshipAvailable || false}
                onChange={(e) => setEditFormData({ ...editFormData, mentorshipAvailable: e.target.checked })}
                className="w-4 h-4 rounded text-brand-blue"
              />
              <span className="text-xs font-medium text-text-primary">
                Open to providing 1-on-1 mentorship to students and alumni
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={editFormData.shareEmail || false}
                onChange={(e) => setEditFormData({ ...editFormData, shareEmail: e.target.checked })}
                className="w-4 h-4 rounded text-brand-blue"
              />
              <span className="text-xs font-medium text-text-primary">
                Share email address publicly with verified alumni members
              </span>
            </label>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProfilePage;
