import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Video, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Share2, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Skeleton } from '../components/common/Skeleton';
import { ErrorState } from '../components/common/ErrorState';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { eventService } from '../services/eventService';

export const EventDetailPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rsvpLoading, setRsvpLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await eventService.getEventById(id);
        setEvent(data);
      } catch (err) {
        setError(err.message || 'Event details could not be found');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleToggleRsvp = async () => {
    if (!isAuthenticated) {
      toast.info('Please sign in or create an account to RSVP for alumni events.');
      navigate('/login', { state: { from: { pathname: `/events/${id}` } } });
      return;
    }

    setRsvpLoading(true);
    try {
      if (event.isRegistered) {
        await eventService.cancelRegistration(event.id);
        setEvent((prev) => ({
          ...prev,
          isRegistered: false,
          registeredCount: Math.max(0, prev.registeredCount - 1),
        }));
        toast.info('Your registration has been cancelled.');
      } else {
        await eventService.registerForEvent(event.id);
        setEvent((prev) => ({
          ...prev,
          isRegistered: true,
          registeredCount: prev.registeredCount + 1,
        }));
        toast.success("RSVP Confirmed! We've saved your seat for this event.");
      }
    } catch (err) {
      toast.error(err.message || 'Unable to update registration');
    } finally {
      setRsvpLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">
        <Skeleton className="w-40 h-5 rounded" />
        <Skeleton className="w-full h-72 rounded-2xl" />
        <Skeleton className="w-3/4 h-8 rounded" />
        <Skeleton className="w-full h-24 rounded" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <ErrorState
          title="Event Not Found"
          message="The requested alumni gathering could not be located."
          onRetry={() => navigate('/events')}
        />
      </div>
    );
  }

  const startDate = new Date(event.startDate);
  const formattedDate = startDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = startDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const capacityPercentage = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8 text-left">
      {/* Back button */}
      <div>
        <Link
          to="/events"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-navy hover:text-brand-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events Directory
        </Link>
      </div>

      {/* Main Banner Card */}
      <div className="rounded-3xl border border-border bg-white shadow-soft overflow-hidden">
        <div className="h-64 sm:h-80 relative overflow-hidden bg-slate-900">
          <img
            src={event.bannerImage}
            alt={event.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="navy" className="bg-brand-navy/90 text-white backdrop-blur-sm border-none">
              {event.category}
            </Badge>
            {event.isOnline && (
              <Badge variant="blue" icon={Video} className="bg-brand-blue/90 text-white backdrop-blur-sm border-none">
                Live Virtual Broadcast
              </Badge>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-10 space-y-8">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-brand-blue">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {formattedTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight leading-snug">
              {event.title}
            </h1>

            <p className="text-sm text-text-secondary leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-bg-alt/70 border border-border text-xs">
            <div>
              <span className="block text-text-muted uppercase text-[10px] font-bold tracking-wider mb-1">
                Venue Location
              </span>
              <span className="font-semibold text-text-primary flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                {event.venue}
              </span>
            </div>

            <div>
              <span className="block text-text-muted uppercase text-[10px] font-bold tracking-wider mb-1">
                Organizer
              </span>
              <span className="font-semibold text-text-primary flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                {event.organizer}
              </span>
            </div>

            <div>
              <span className="block text-text-muted uppercase text-[10px] font-bold tracking-wider mb-1">
                Registration Deadline
              </span>
              <span className="font-semibold text-text-primary">
                {new Date(event.registrationDeadline).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* RSVP Action & Capacity Progress */}
          <div className="p-6 rounded-2xl border border-brand-blue/20 bg-brand-blue-50/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-md w-full">
              <div className="flex justify-between text-xs font-semibold text-text-primary">
                <span>Attendee Capacity</span>
                <span>
                  {event.registeredCount} of {event.capacity} seats reserved ({capacityPercentage}%)
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-brand-blue h-2 rounded-full transition-all duration-500"
                  style={{ width: `${capacityPercentage}%` }}
                />
              </div>
              <p className="text-[11px] text-text-muted">
                Free admission for verified alumni and current Apex students.
              </p>
            </div>

            <Button
              variant={event.isRegistered ? 'danger' : 'navy'}
              size="lg"
              isLoading={rsvpLoading}
              onClick={handleToggleRsvp}
              className="shrink-0 w-full sm:w-auto"
            >
              {event.isRegistered ? 'Cancel RSVP' : 'Register for Event'}
            </Button>
          </div>

          {/* Speakers Section */}
          {event.speakers && event.speakers.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-base font-bold text-brand-navy uppercase tracking-wider">
                Featured Keynote Speakers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.speakers.map((spk, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-border bg-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-xs">
                      {spk.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-text-primary">{spk.name}</h4>
                      <p className="text-[11px] text-text-secondary">{spk.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Agenda Section */}
          {event.agenda && event.agenda.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-base font-bold text-brand-navy uppercase tracking-wider">
                Event Schedule & Agenda
              </h3>
              <div className="space-y-3">
                {event.agenda.map((ag, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 rounded-xl bg-bg-alt/50 border border-border/70">
                    <span className="text-xs font-mono font-bold text-brand-blue shrink-0 w-20">
                      {ag.time}
                    </span>
                    <span className="text-xs font-semibold text-text-primary">
                      {ag.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
