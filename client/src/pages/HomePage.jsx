import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  Compass, 
  Calendar, 
  Award, 
  Globe2, 
  ArrowRight, 
  CheckCircle, 
  Search, 
  Sparkles,
  MapPin,
  Building,
  GraduationCap,
  Quote,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { alumniService } from '../services/alumniService';

export const HomePage = () => {
  const [stats, setStats] = useState({
    totalAlumni: 2500,
    graduatingBatches: 45,
    industriesRepresented: 30,
    countriesReached: 18,
    activeMentors: 14
  });
  const [featuredAlumni, setFeaturedAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [statsData, alumniData] = await Promise.all([
          alumniService.getStats(),
          alumniService.getAlumni({ limit: 4, sort: 'name_asc' })
        ]);
        if (statsData) setStats(statsData);
        if (alumniData && alumniData.items) {
          setFeaturedAlumni(alumniData.items);
        }
      } catch (err) {
        console.error('Error loading landing page data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const features = [
    {
      icon: Users,
      title: 'Find Alumni',
      description: 'Search thousands of verified graduates across batches, departments, companies, and geographical locations.'
    },
    {
      icon: Briefcase,
      title: 'Career Connections',
      description: 'Access exclusive job referrals, hiring manager contacts, and career advancement insights directly from alumni.'
    },
    {
      icon: Compass,
      title: '1-on-1 Mentorship',
      description: 'Connect with established leaders who volunteer their time to guide students and early-career alumni.'
    },
    {
      icon: Calendar,
      title: 'Alumni Events',
      description: 'Join annual reunions, technical masterclasses, regional chapter meetups, and virtual webinars worldwide.'
    },
    {
      icon: Award,
      title: 'Honors & Spotlights',
      description: 'Celebrate research breakthroughs, patent grants, entrepreneurial exits, and prestigious career milestones.'
    },
    {
      icon: Globe2,
      title: 'Global Chapters',
      description: 'Engage with active regional chapters spanning North America, Europe, Asia Pacific, and the Middle East.'
    }
  ];

  const successStories = [
    {
      name: "Dr. Sarah Chen",
      batch: "Class of 2016",
      role: "Staff AI Research Scientist at Anthropic",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      quote: "The foundational rigor of the CS department and the lifelong bonds with classmates shaped my career in artificial intelligence research. Giving back through alumni mentorship is a privilege."
    },
    {
      name: "Marcus Vance",
      batch: "Class of 2014",
      role: "Vice President of Product at Stripe",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      quote: "My first startup angel investors and co-founders were fellow Apex alumni. The strength of this directory is that when you reach out, alumni genuinely pick up the phone."
    },
    {
      name: "Rajesh Kumar Gupta",
      batch: "Class of 2019",
      role: "Founder & CEO, HealthBridge Technologies (YC W21)",
      quote: "Connecting with senior alumni during our Y Combinator batch helped us refine our healthcare regulatory strategy in weeks instead of months."
    }
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* SECTION B: HERO */}
      <section className="relative pt-12 md:pt-20 lg:pt-24 bg-gradient-to-b from-white via-bg-main to-bg-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue-50 border border-brand-blue/20 text-brand-blue text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                <span>The Official Apex Institute Alumni Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy tracking-tight leading-[1.12]">
                Your Alumni Network Is Your <span className="text-brand-blue underline decoration-brand-blue-light decoration-4 underline-offset-4">Greatest Asset</span>.
              </h1>

              <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
                Reconnect with classmates, discover career opportunities, share experiences, and build meaningful professional relationships with your university community across the globe.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link to="/directory">
                  <Button variant="navy" size="lg" rightIcon={ArrowRight}>
                    Explore Alumni Directory
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg">
                    Join the Network
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-border flex flex-wrap items-center gap-6 text-xs text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-status-success" />
                  <span>Verified Institute Credentials</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-status-success" />
                  <span>Privacy-First Contact Sharing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-status-success" />
                  <span>Active Mentorship Exchange</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Alumni Showcase Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background decorative blob */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-brand-blue/15 to-brand-navy/10 rounded-3xl blur-2xl -z-10" />

                {/* Main Glass Visual Showcase */}
                <div className="rounded-3xl border border-border bg-white/95 p-6 shadow-soft-lg backdrop-blur-md space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center text-white">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-brand-navy">Live Alumni Directory</h4>
                        <p className="text-[11px] text-text-muted">Top leaders currently mentoring</p>
                      </div>
                    </div>
                    <Badge variant="success" size="sm">Active</Badge>
                  </div>

                  {/* Sample Alumni Stack */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-bg-main border border-border/70 hover:border-brand-blue/30 transition-all">
                      <Avatar 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80" 
                        name="Sarah Chen" 
                        size="md" 
                      />
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold text-text-primary truncate">Dr. Sarah Chen</p>
                          <Badge variant="blue" size="sm">Batch '16</Badge>
                        </div>
                        <p className="text-[11px] text-text-secondary truncate">Staff AI Scientist &bull; Anthropic</p>
                      </div>
                      <Link to="/alumni/alm-101">
                        <Button variant="outline" size="sm" className="h-7 text-xs px-2.5">
                          Profile
                        </Button>
                      </Link>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-bg-main border border-border/70 hover:border-brand-blue/30 transition-all">
                      <Avatar 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80" 
                        name="Marcus Vance" 
                        size="md" 
                      />
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold text-text-primary truncate">Marcus Vance</p>
                          <Badge variant="blue" size="sm">Batch '14</Badge>
                        </div>
                        <p className="text-[11px] text-text-secondary truncate">VP of Product &bull; Stripe</p>
                      </div>
                      <Link to="/alumni/alm-102">
                        <Button variant="outline" size="sm" className="h-7 text-xs px-2.5">
                          Profile
                        </Button>
                      </Link>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-bg-main border border-border/70 hover:border-brand-blue/30 transition-all">
                      <Avatar 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80" 
                        name="Priya Ramanathan" 
                        size="md" 
                      />
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold text-text-primary truncate">Priya Ramanathan</p>
                          <Badge variant="blue" size="sm">Batch '18</Badge>
                        </div>
                        <p className="text-[11px] text-text-secondary truncate">Principal Cloud Architect &bull; Microsoft</p>
                      </div>
                      <Link to="/alumni/alm-103">
                        <Button variant="outline" size="sm" className="h-7 text-xs px-2.5">
                          Profile
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Micro stat bar */}
                  <div className="pt-2 flex items-center justify-between text-xs text-text-secondary">
                    <span>Quick Filter by Batch:</span>
                    <div className="flex gap-1">
                      {['2024', '2023', '2020', '2016'].map(y => (
                        <Link key={y} to={`/directory?graduationYear=${y}`}>
                          <span className="px-2 py-0.5 rounded bg-bg-alt hover:bg-brand-blue hover:text-white transition-colors text-[10px] font-semibold">
                            '{y.slice(2)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: NETWORK STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-brand-navy p-8 md:p-12 text-white shadow-soft-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Apex Alumni at a Glance</h3>
              <p className="text-sm text-slate-300 mt-1">
                Demonstration statistics reflecting our distributed global alumni community.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-white/10 text-brand-blue-light text-xs font-medium">
              Verified Academic Records
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">
                {stats.totalAlumni.toLocaleString()}+
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-300">Total Alumni</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">
                {stats.graduatingBatches}+
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-300">Graduating Batches</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">
                {stats.industriesRepresented}+
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-300">Industries Represented</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">
                {stats.countriesReached}+
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-300">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: FEATURE HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
            Core Platform Capabilities
          </span>
          <h2 className="text-3xl font-bold text-text-primary tracking-tight">
            Designed for Lifelong Alumni Engagement
          </h2>
          <p className="text-base text-text-secondary leading-relaxed">
            Everything you need to reconnect, mentor, learn, and accelerate your professional trajectory after graduation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <Card key={idx} hoverable className="text-left flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feat.description}
                  </p>
                </div>
                <div className="pt-6">
                  <Link 
                    to="/directory" 
                    className="inline-flex items-center text-xs font-semibold text-brand-blue hover:text-brand-blue-hover gap-1"
                  >
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* SECTION E: FEATURED ALUMNI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
              Community Spotlight
            </span>
            <h2 className="text-3xl font-bold text-text-primary tracking-tight mt-1">
              Featured Alumni Leaders
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Discover accomplished graduates who are mentoring and hiring.
            </p>
          </div>
          <Link to="/directory">
            <Button variant="outline" size="sm" rightIcon={ArrowRight}>
              View All Alumni ({stats.totalAlumni})
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAlumni.map((alum) => (
            <Card key={alum.id} hoverable className="text-left flex flex-col justify-between p-5">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <Avatar src={alum.profileImage} name={alum.fullName} size="lg" />
                  <Badge variant="blue" size="sm">
                    '{String(alum.graduationYear).slice(2)}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-base font-bold text-text-primary truncate">
                    {alum.fullName}
                  </h4>
                  <p className="text-xs text-text-secondary truncate mt-0.5">
                    {alum.currentJobTitle}
                  </p>
                  <p className="text-xs font-medium text-brand-blue truncate">
                    {alum.currentCompany}
                  </p>
                </div>

                <div className="pt-2 text-[11px] text-text-muted space-y-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{alum.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{alum.department}</span>
                  </div>
                </div>

                {alum.skills && alum.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {alum.skills.slice(0, 3).map((skill, sIdx) => (
                      <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded bg-bg-alt text-text-secondary">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-border">
                <Link to={`/alumni/${alum.id}`}>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    View Full Profile
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION F: SUCCESS STORIES */}
      <section className="bg-bg-alt/60 py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
              Demonstration Spotlights
            </span>
            <h2 className="text-3xl font-bold text-text-primary tracking-tight">
              Voices from the Alumni Network
            </h2>
            <p className="text-sm text-text-secondary">
              Hear from graduates on how alumni relationships shaped their professional journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, sIdx) => (
              <div 
                key={sIdx}
                className="rounded-2xl border border-border bg-white p-6 shadow-soft flex flex-col justify-between text-left"
              >
                <div className="space-y-4">
                  <Quote className="w-8 h-8 text-brand-blue/30" />
                  <p className="text-sm text-text-primary italic leading-relaxed">
                    "{story.quote}"
                  </p>
                </div>
                <div className="pt-6 border-t border-border flex items-center gap-3">
                  {story.image ? (
                    <Avatar src={story.image} name={story.name} size="md" />
                  ) : (
                    <Avatar name={story.name} size="md" />
                  )}
                  <div>
                    <h4 className="text-xs font-bold text-text-primary">{story.name}</h4>
                    <p className="text-[11px] text-brand-blue">{story.batch}</p>
                    <p className="text-[10px] text-text-muted truncate max-w-[200px]">{story.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION G: CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-brand-navy via-brand-navy-light to-brand-navy p-8 md:p-14 text-white text-center shadow-soft-lg overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Reconnect With Your Alma Mater?
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Join thousands of fellow graduates. Update your profile, discover mentors, explore upcoming chapter events, and expand your professional circle today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link to="/register">
                <Button variant="blue" size="lg">
                  Join the Network Today
                </Button>
              </Link>
              <Link to="/directory">
                <Button variant="outline" size="lg" className="bg-transparent text-white border-white/30 hover:bg-white/10">
                  Browse Alumni Directory
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
