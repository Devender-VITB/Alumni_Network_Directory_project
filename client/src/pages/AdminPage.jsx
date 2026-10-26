import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  Calendar, 
  Award, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Building2,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { useToast } from '../context/ToastContext';
import { alumniService } from '../services/alumniService';
import { eventService } from '../services/eventService';
import { mockAlumni } from '../data/mockAlumniData';
import { mockEvents } from '../data/mockEventsData';

export const AdminPage = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'alumni' | 'events' | 'users'
  const [alumniList, setAlumniList] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [searchAlumni, setSearchAlumni] = useState('');

  // Modals
  const [isAlumniModalOpen, setIsAlumniModalOpen] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [alumniForm, setAlumniForm] = useState({
    fullName: '',
    email: '',
    currentJobTitle: '',
    currentCompany: '',
    graduationYear: '2024',
    department: 'Computer Science & Engineering',
    degree: 'B.Tech in Computer Science',
    industry: 'Technology',
    location: '',
  });

  const [deleteConfirmation, setDeleteConfirmation] = useState(null); // id of item to delete

  useEffect(() => {
    setAlumniList([...mockAlumni]);
    setEventsList([...mockEvents]);
  }, []);

  // Filter alumni
  const filteredAlumni = alumniList.filter(
    (a) =>
      a.fullName.toLowerCase().includes(searchAlumni.toLowerCase()) ||
      a.currentCompany.toLowerCase().includes(searchAlumni.toLowerCase()) ||
      a.department.toLowerCase().includes(searchAlumni.toLowerCase())
  );

  const handleOpenCreateAlumni = () => {
    setSelectedAlumni(null);
    setAlumniForm({
      fullName: '',
      email: '',
      currentJobTitle: '',
      currentCompany: '',
      graduationYear: '2024',
      department: 'Computer Science & Engineering',
      degree: 'B.Tech in Computer Science',
      industry: 'Technology',
      location: '',
    });
    setIsAlumniModalOpen(true);
  };

  const handleOpenEditAlumni = (item) => {
    setSelectedAlumni(item);
    setAlumniForm({
      fullName: item.fullName,
      email: item.email || '',
      currentJobTitle: item.currentJobTitle,
      currentCompany: item.currentCompany,
      graduationYear: String(item.graduationYear),
      department: item.department,
      degree: item.degree,
      industry: item.industry,
      location: item.location,
    });
    setIsAlumniModalOpen(true);
  };

  const handleSaveAlumni = (e) => {
    e.preventDefault();
    if (selectedAlumni) {
      // Edit
      setAlumniList((prev) =>
        prev.map((a) =>
          a.id === selectedAlumni.id
            ? { ...a, ...alumniForm, graduationYear: Number(alumniForm.graduationYear) }
            : a
        )
      );
      toast.success(`Updated alumni record for ${alumniForm.fullName}`);
    } else {
      // Create
      const newRecord = {
        id: 'alm-' + Date.now(),
        ...alumniForm,
        graduationYear: Number(alumniForm.graduationYear),
        isVerified: true,
        mentorshipAvailable: false,
        skills: ['Leadership', 'System Design'],
        profileImage: '',
      };
      setAlumniList((prev) => [newRecord, ...prev]);
      toast.success(`Created new alumni entry for ${alumniForm.fullName}`);
    }
    setIsAlumniModalOpen(false);
  };

  const handleDeleteAlumni = (id) => {
    setAlumniList((prev) => prev.filter((a) => a.id !== id));
    setDeleteConfirmation(null);
    toast.info('Alumni record deleted.');
  };

  const toggleVerification = (id) => {
    setAlumniList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isVerified: !a.isVerified } : a))
    );
    toast.success('Alumni verification status updated.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8 text-left">
      {/* Page Title & Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-brand-blue" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
              Administrator Console
            </h1>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Institutional directory administration, database records, and event management.
          </p>
        </div>

        <Badge variant="blue" size="md">
          Role: System Administrator
        </Badge>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'overview', label: 'Overview Metrics', icon: TrendingUp },
          { id: 'alumni', label: `Alumni Directory (${alumniList.length})`, icon: Users },
          { id: 'events', label: `Events Management (${eventsList.length})`, icon: Calendar },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-brand-navy text-white shadow-soft-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-alt'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 space-y-2">
              <span className="text-xs text-text-muted uppercase font-bold tracking-wider">
                Total Alumni Database
              </span>
              <p className="text-3xl font-extrabold text-brand-navy">{alumniList.length}</p>
              <p className="text-[11px] text-status-success font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> 100% Academic Verified
              </p>
            </Card>

            <Card className="p-6 space-y-2">
              <span className="text-xs text-text-muted uppercase font-bold tracking-wider">
                Scheduled Events
              </span>
              <p className="text-3xl font-extrabold text-brand-navy">{eventsList.length}</p>
              <p className="text-[11px] text-brand-blue font-semibold">
                Across 6 Academic Chapters
              </p>
            </Card>

            <Card className="p-6 space-y-2">
              <span className="text-xs text-text-muted uppercase font-bold tracking-wider">
                Total RSVPs Processed
              </span>
              <p className="text-3xl font-extrabold text-brand-navy">1,098</p>
              <p className="text-[11px] text-status-success font-semibold">
                +14% vs Previous Quarter
              </p>
            </Card>

            <Card className="p-6 space-y-2">
              <span className="text-xs text-text-muted uppercase font-bold tracking-wider">
                Active Mentorship Volunteers
              </span>
              <p className="text-3xl font-extrabold text-brand-navy">
                {alumniList.filter((a) => a.mentorshipAvailable).length}
              </p>
              <p className="text-[11px] text-text-secondary">Open to 1-on-1 Sessions</p>
            </Card>
          </div>

          {/* Recent Records Quick Table */}
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-brand-navy uppercase tracking-wider">
              Recent Directory Activity
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-text-muted uppercase font-bold text-[10px]">
                    <th className="pb-3">Alumni Member</th>
                    <th className="pb-3">Batch & Dept</th>
                    <th className="pb-3">Current Company</th>
                    <th className="pb-3">Verification</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {alumniList.slice(0, 5).map((a) => (
                    <tr key={a.id} className="hover:bg-bg-alt/40">
                      <td className="py-3 font-semibold text-text-primary flex items-center gap-2">
                        <Avatar src={a.profileImage} name={a.fullName} size="sm" />
                        <span>{a.fullName}</span>
                      </td>
                      <td className="py-3 text-text-secondary">
                        Class of {a.graduationYear} &bull; {a.department.split(' ')[0]}
                      </td>
                      <td className="py-3 text-brand-blue font-medium">{a.currentCompany}</td>
                      <td className="py-3">
                        <Badge variant={a.isVerified ? 'success' : 'neutral'} size="sm">
                          {a.isVerified ? 'Verified' : 'Pending'}
                        </Badge>
                      </td>
                      <td className="py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => handleOpenEditAlumni(a)}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: ALUMNI MANAGEMENT */}
      {activeTab === 'alumni' && (
        <Card className="p-6 space-y-6">
          {/* Header & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by name, company, or department..."
                value={searchAlumni}
                onChange={(e) => setSearchAlumni(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-border bg-white focus:outline-none focus:border-brand-blue shadow-soft-sm"
              />
            </div>

            <Button
              variant="blue"
              size="sm"
              leftIcon={Plus}
              onClick={handleOpenCreateAlumni}
            >
              Add New Alumni
            </Button>
          </div>

          {/* Alumni Records Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-text-muted uppercase font-bold text-[10px]">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Batch</th>
                  <th className="pb-3">Department</th>
                  <th className="pb-3">Role & Company</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredAlumni.map((a) => (
                  <tr key={a.id} className="hover:bg-bg-alt/40 transition-colors">
                    <td className="py-3.5 font-bold text-text-primary flex items-center gap-2.5">
                      <Avatar src={a.profileImage} name={a.fullName} size="sm" />
                      <span>{a.fullName}</span>
                    </td>
                    <td className="py-3.5 text-text-secondary">{a.graduationYear}</td>
                    <td className="py-3.5 text-text-secondary max-w-[180px] truncate">
                      {a.department}
                    </td>
                    <td className="py-3.5 text-text-primary">
                      <span className="font-medium">{a.currentJobTitle}</span>
                      <span className="text-text-muted block text-[11px]">{a.currentCompany}</span>
                    </td>
                    <td className="py-3.5">
                      <button
                        type="button"
                        onClick={() => toggleVerification(a.id)}
                        className="cursor-pointer"
                        title="Click to toggle verification status"
                      >
                        <Badge variant={a.isVerified ? 'success' : 'neutral'} size="sm">
                          {a.isVerified ? 'Verified' : 'Unverified'}
                        </Badge>
                      </button>
                    </td>
                    <td className="py-3.5 text-right space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs px-2"
                        onClick={() => handleOpenEditAlumni(a)}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs px-2 text-status-error hover:bg-status-error-bg"
                        onClick={() => setDeleteConfirmation(a.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 3: EVENTS MANAGEMENT */}
      {activeTab === 'events' && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <h3 className="text-base font-bold text-brand-navy uppercase tracking-wider">
              Manage Institute Events
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info('Event creation wizard ready in production.')}
            >
              + Create Event
            </Button>
          </div>

          <div className="space-y-4">
            {eventsList.map((evt) => (
              <div
                key={evt.id}
                className="p-4 rounded-xl border border-border bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="navy" size="sm">{evt.category}</Badge>
                    <span className="text-xs text-text-muted">
                      {new Date(evt.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-text-primary">{evt.title}</h4>
                  <p className="text-xs text-text-secondary">{evt.venue} &bull; {evt.registeredCount}/{evt.capacity} RSVPs</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success" size="sm">Active</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => toast.info('Event status refreshed')}
                  >
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Create / Edit Alumni Modal */}
      <Modal
        isOpen={isAlumniModalOpen}
        onClose={() => setIsAlumniModalOpen(false)}
        title={selectedAlumni ? 'Edit Alumni Record' : 'Register New Alumni Record'}
        maxWidth="max-w-xl"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAlumniModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="navy" onClick={handleSaveAlumni}>
              {selectedAlumni ? 'Save Changes' : 'Create Record'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveAlumni} className="space-y-4 text-left">
          <Input
            label="Full Name"
            value={alumniForm.fullName}
            onChange={(e) => setAlumniForm({ ...alumniForm, fullName: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Job Title"
              value={alumniForm.currentJobTitle}
              onChange={(e) => setAlumniForm({ ...alumniForm, currentJobTitle: e.target.value })}
              required
            />
            <Input
              label="Company / Employer"
              value={alumniForm.currentCompany}
              onChange={(e) => setAlumniForm({ ...alumniForm, currentCompany: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-1.5">
                Graduation Year
              </label>
              <input
                type="number"
                value={alumniForm.graduationYear}
                onChange={(e) => setAlumniForm({ ...alumniForm, graduationYear: e.target.value })}
                className="w-full text-xs rounded-xl border border-border bg-white px-3 py-2 text-text-primary"
                required
              />
            </div>
            <Input
              label="Location"
              value={alumniForm.location}
              onChange={(e) => setAlumniForm({ ...alumniForm, location: e.target.value })}
              placeholder="City, Country"
            />
          </div>

          <Input
            label="Department"
            value={alumniForm.department}
            onChange={(e) => setAlumniForm({ ...alumniForm, department: e.target.value })}
            required
          />
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Modal
        isOpen={Boolean(deleteConfirmation)}
        onClose={() => setDeleteConfirmation(null)}
        title="Confirm Record Deletion"
        description="Are you sure you want to remove this alumni profile from the institutional directory? This action cannot be undone."
        maxWidth="max-w-md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteConfirmation(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDeleteAlumni(deleteConfirmation)}
            >
              Confirm Deletion
            </Button>
          </>
        }
      >
        <div className="flex items-center gap-3 p-4 rounded-xl bg-status-error-bg/60 border border-status-error/30 text-xs text-status-error">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>This will permanently delete the associated alumni record and directory listing.</span>
        </div>
      </Modal>
    </div>
  );
};

export default AdminPage;
