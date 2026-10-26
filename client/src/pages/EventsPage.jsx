import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Video, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Skeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { eventService } from '../services/eventService';
import { cn } from '../utils/cn';

const categories = [
  'All',
  'Networking',
  'Career guidance',
  'Workshops',
  'Reunions',
  'Guest lectures',
  'Alumni meetups'
];

export const EventsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';

  const [searchInput, setSearchInput] = useState(searchQuery);
  const [events, setEvents] = useState([]);
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== searchQuery) {
        updateQuery('search', searchInput);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const result = await eventService.getEvents({
          category: selectedCategory === 'All' ? '' : selectedCategory,
          search: searchQuery
        });
        setEvents(result.items || []);
        setUserRegistrations(result.userRegistrations || []);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [selectedCategory, searchQuery]);

  const updateQuery = (key, val) => {
    const newParams = new URLSearchParams(searchParams);
    if (val && val !== 'All') {
      newParams.set(key, val);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8 text-left">
      {/* Title & Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-navy tracking-tight">
            Alumni Events & Gatherings
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Reunions, technical masterclasses, regional chapter meetups, and professional workshops.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-blue-50 border border-brand-blue/20 text-brand-blue text-xs font-semibold">
          <Calendar className="w-4 h-4" />
          <span>Annual Alumni Gala &bull; Nov 2026</span>
        </div>
      </div>

      {/* Category Filter Pills & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Horizontal Category Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => updateQuery('category', cat)}
                className={cn(
                  'px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer',
                  isSelected
                    ? 'bg-brand-navy text-white shadow-soft-sm'
                    : 'bg-white border border-border text-text-secondary hover:bg-bg-alt hover:text-text-primary'
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xs w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-border bg-white text-text-primary placeholder:text-text-muted focus:border-brand-blue focus:outline-none shadow-soft-sm"
          />
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-white p-6 shadow-soft space-y-4">
              <Skeleton className="w-full h-44 rounded-xl" />
              <Skeleton className="w-3/4 h-5 rounded" />
              <Skeleton className="w-full h-12 rounded" />
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="w-20 h-4 rounded" />
                <Skeleton className="w-24 h-8 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No events scheduled in this category"
          description="Check back soon for upcoming gatherings or try selecting a different category."
          actionLabel="Show All Categories"
          onAction={() => updateQuery('category', 'All')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((evt) => {
            const isRegistered = userRegistrations.includes(evt.id);
            const eventDate = new Date(evt.startDate);
            const formattedDate = eventDate.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
            const formattedTime = eventDate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <Card key={evt.id} hoverable className="p-0 overflow-hidden flex flex-col justify-between">
                <div>
                  {/* Event Banner */}
                  <div className="h-44 relative bg-slate-100 overflow-hidden">
                    <img
                      src={evt.bannerImage}
                      alt={evt.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <Badge variant="navy" size="sm" className="bg-brand-navy/90 text-white backdrop-blur-sm border-none">
                        {evt.category}
                      </Badge>
                      {evt.isOnline && (
                        <Badge variant="blue" size="sm" icon={Video} className="bg-brand-blue/90 text-white backdrop-blur-sm border-none">
                          Virtual
                        </Badge>
                      )}
                    </div>
                    {isRegistered && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="success" size="sm" icon={CheckCircle2} className="shadow-soft-sm">
                          RSVP Confirmed
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-3">
                    <div className="text-xs font-semibold text-brand-blue flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formattedDate} &bull; {formattedTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-text-primary tracking-tight leading-snug">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="pt-2 text-xs text-text-muted flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{evt.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="p-6 pt-0 border-t border-border mt-2 pt-4 flex items-center justify-between">
                  <div className="text-[11px] text-text-secondary">
                    <strong className="text-brand-navy">{evt.registeredCount}</strong> / {evt.capacity} attendees
                  </div>
                  <Link to={`/events/${evt.id}`}>
                    <Button variant="outline" size="sm" rightIcon={ArrowRight} className="text-xs">
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
