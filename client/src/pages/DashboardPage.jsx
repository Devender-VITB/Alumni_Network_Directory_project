import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  Compass, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  Building2, 
  MapPin, 
  Sparkles, 
  Shield, 
  BookOpen,
  Edit3
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { useAuth } from '../context/AuthContext';
import { alumniService } from '../services/alumniService';
import { eventService } from '../services/eventService';

export const DashboardPage = () => {
  const { user, isAdmin } = useAuth();
  const [suggestedAlumni, setSuggestedAlumni] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [stats, setStats] = useState({
    profileCompletion: 85,
    connectionsCount: 24,
    registeredEventsCount: 2,
    departmentAlumniCount: 340,
  });

  const firstName = user?.name ? user.name.split(' ')[0] : 'Graduate';

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [alumniResult, eventsResult] = await Promise.all([
          alumniService.getAlumni({ limit: 4, sort: 'year_desc' }),
          eventService.getEvents()
        ]);
        if (alumniResult && alumniResult.items) {
          setSuggestedAlumni(alumniResult.items);
        }
        if (eventsResult && eventsResult.items) {
          setUpcomingEvents(eventsResult.items.slice(0, 3));
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      }
    };

    loadDashboard();
  }, []);

  const checklistItems = [
    { label: 'Basic profile details & academic batch', completed: true },
    { label: 'Professional role & current employer', completed: true },
    { label: 'Key engineering & business skills added', completed: true },
    { label: 'Mentorship preferences established', completed: true },
    { label: 'Upload custom high-res headshot', completed: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8 text-left">
      {/* Welcome Banner Card */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-navy via-brand-navy-light to-brand-blue p-8 sm:p-10 text-white shadow-soft-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-brand-blue-light">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alumni Member Workspace</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {firstName}!
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Your university network connects you with over 2,500 verified alumni globally. Discover classmates in your city or RSVP to upcoming department meetups.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/directory">
            <Button variant="blue" size="md" rightIcon={ArrowRight}>
              Browse Directory
            </Button>
          </Link>
          <Link to="/alumni/alm-101">
            <Button variant="outline" size="md" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              My Profile
            </Button>
          </Link>
          {isAdmin && (
            <Link to="/admin">
              <Button variant="navy" size="md" leftIcon={Shield} className="bg-brand-navy-dark border border-brand-blue/30 text-brand-blue-light">
                Admin Console
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-blue-50 text-brand-blue flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-brand-navy">
              {stats.profileCompletion}%
            </p>
            <p className="text-xs text-text-secondary font-medium">Profile Strength</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-brand-navy">
              {stats.connectionsCount}
            </p>
            <p className="text-xs text-text-secondary font-medium">Network Connections</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-brand-navy">
              {stats.registeredEventsCount}
            </p>
            <p className="text-xs text-text-secondary font-medium">Upcoming RSVPs</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-brand-navy">
              14+
            </p>
            <p className="text-xs text-text-secondary font-medium">Available Mentors</p>
          </div>
        </Card>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recommended Alumni & Upcoming Events */}
        <div className="lg:col-span-2 space-y-8">
          {/* Suggested Alumni */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-brand-navy tracking-tight">
                  Recommended Alumni Connections
                </h3>
                <p className="text-xs text-text-secondary">
                  Graduates from your department and related technology sectors.
                </p>
              </div>
              <Link to="/directory">
                <Button variant="ghost" size="sm" rightIcon={ArrowRight} className="text-xs">
                  View All
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestedAlumni.map((alum) => (
                <Card key={alum.id} hoverable className="p-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <Avatar src={alum.profileImage} name={alum.fullName} size="md" />
                      <Badge variant="navy" size="sm">
                        '{String(alum.graduationYear).slice(2)}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-text-primary truncate">{alum.fullName}</h4>
                      <p className="text-xs text-brand-blue truncate">{alum.currentJobTitle}</p>
                      <p className="text-[11px] text-text-muted truncate">{alum.currentCompany}</p>
                    </div>

                    <div className="text-[11px] text-text-secondary flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-text-muted shrink-0" />
                      <span className="truncate">{alum.location}</span>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-border flex items-center justify-between">
                    {alum.mentorshipAvailable ? (
                      <Badge variant="success" size="sm">Open to Mentor</Badge>
                    ) : (
                      <span className="text-[10px] text-text-muted font-medium">{alum.department.split(' ')[0]}</span>
                    )}
                    <Link to={`/alumni/${alum.id}`}>
                      <Button variant="outline" size="sm" className="h-7 text-xs px-2.5">
                        Profile
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Registered Events */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-brand-navy tracking-tight">
                  Events on Your Radar
                </h3>
                <p className="text-xs text-text-secondary">
                  Webinars, career panels, and reunions you might be interested in.
                </p>
              </div>
              <Link to="/events">
                <Button variant="ghost" size="sm" rightIcon={ArrowRight} className="text-xs">
                  All Events
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((evt) => (
                <Card key={evt.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="blue" size="sm">{evt.category}</Badge>
                      <span className="text-xs text-text-muted font-medium">
                        {new Date(evt.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-text-primary hover:text-brand-blue">
                      <Link to={`/events/${evt.id}`}>{evt.title}</Link>
                    </h4>
                    <p className="text-xs text-text-secondary">{evt.venue}</p>
                  </div>
                  <Link to={`/events/${evt.id}`}>
                    <Button variant="outline" size="sm" className="text-xs shrink-0">
                      View Event
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Profile Checklist & Quick Actions */}
        <div className="space-y-6">
          {/* Profile Completion Meter */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider">
                Profile Checklist
              </h3>
              <span className="text-xs font-bold text-brand-blue">85% Complete</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-bg-alt rounded-full h-2 overflow-hidden">
              <div className="bg-brand-blue h-2 rounded-full transition-all duration-500 w-[85%]" />
            </div>

            <ul className="space-y-2.5 pt-2">
              {checklistItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs text-text-secondary">
                  {item.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-text-muted shrink-0" />
                  )}
                  <span className={item.completed ? 'text-text-primary font-medium' : ''}>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link to="/alumni/alm-101">
                <Button variant="outline" size="sm" className="w-full" leftIcon={Edit3}>
                  Update Profile Details
                </Button>
              </Link>
            </div>
          </Card>

          {/* Quick Hub Navigation */}
          <Card className="space-y-3">
            <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider">
              Quick Shortcuts
            </h3>
            <div className="space-y-1.5 text-xs font-medium">
              <Link
                to="/directory?mentorship=true"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-bg-alt text-text-primary transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-brand-blue" />
                  <span>Find a Mentor</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-text-muted" />
              </Link>

              <Link
                to="/events"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-bg-alt text-text-primary transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>Alumni Events & Gala</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-text-muted" />
              </Link>

              <Link
                to="/directory"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-bg-alt text-text-primary transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>Class Directory</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-text-muted" />
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-brand-blue-50/50 hover:bg-brand-blue-50 text-brand-blue transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4" />
                    <span>Administrator Console</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
