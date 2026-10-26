import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Globe, Linkedin, Twitter, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-12 border-t border-brand-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Alumni<span className="text-brand-blue-light">Connect</span>
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Your Alumni. Your Network. Your Future. Connecting global graduates across decades to foster lifelong collaboration, career mentorship, and intellectual growth.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-blue-light shrink-0" />
                <span>Apex Institute of Technology &bull; University Heights, NY 10012</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-blue-light shrink-0" />
                <span>alumni-relations@apextech.edu</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/directory" className="hover:text-white transition-colors">
                  Alumni Directory
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">
                  Events & Reunions
                </Link>
              </li>
              <li>
                <Link to="/directory?mentorship=true" className="hover:text-white transition-colors">
                  Find a Mentor
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Member Hub */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Member Hub
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Alumni Dashboard
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Account Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Join Network
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors">
                  Administrative Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              About & Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Office of Alumni Relations
                </a>
              </li>
              <li>
                <span className="text-slate-400 cursor-default">
                  Alumni Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-slate-400 cursor-default">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-slate-400 cursor-default">
                  Code of Conduct
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Apex Institute of Technology Alumni Association. Academic MERN Assignment Demonstration Platform.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 text-white font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
