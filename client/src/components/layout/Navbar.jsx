import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Shield, 
  Calendar, 
  Users, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { cn } from '../../utils/cn';

export const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const navLinkClasses = ({ isActive }) =>
    cn(
      'px-3 py-2 text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-1.5',
      isActive
        ? 'text-brand-blue bg-brand-blue-50 font-semibold'
        : 'text-text-secondary hover:text-text-primary hover:bg-bg-alt'
    );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/95 backdrop-blur-md">
      {/* Top Demo Mode Banner */}
      <div className="bg-brand-navy text-white text-[11px] py-1 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-brand-blue-light animate-pulse" />
        <span>Demonstration Mode Active &bull; Realistic Academic Alumni Sandbox</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center text-white shadow-soft-sm group-hover:bg-brand-navy-light transition-colors">
              <GraduationCap className="w-6 h-6 text-brand-blue-light" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-brand-navy flex items-center gap-1">
                Alumni<span className="text-brand-blue">Connect</span>
              </span>
              <span className="block text-[10px] tracking-wider uppercase font-semibold text-text-muted">
                Apex Institute of Tech
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/directory" className={navLinkClasses}>
              <Users className="w-4 h-4" />
              Alumni Directory
            </NavLink>
            <NavLink to="/events" className={navLinkClasses}>
              <Calendar className="w-4 h-4" />
              Events
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/dashboard" className={navLinkClasses}>
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </NavLink>
            )}
            {isAuthenticated && isAdmin && (
              <NavLink to="/admin" className={navLinkClasses}>
                <Shield className="w-4 h-4 text-brand-blue" />
                Admin Panel
              </NavLink>
            )}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-bg-alt transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue cursor-pointer"
                  aria-expanded={userDropdownOpen}
                >
                  <Avatar 
                    src={user?.avatar} 
                    name={user?.name || 'User'} 
                    size="sm" 
                    status="online"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-semibold text-text-primary leading-tight">
                      {user?.name}
                    </p>
                    <p className="text-[10px] text-text-muted capitalize">
                      {user?.role}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-soft-lg border border-border py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-2 border-b border-border mb-1">
                      <p className="text-xs font-bold text-text-primary truncate">
                        {user?.name}
                      </p>
                      <p className="text-[11px] text-text-muted truncate">
                        {user?.email}
                      </p>
                      {isAdmin && (
                        <Badge variant="blue" size="sm" className="mt-1.5">
                          Administrator
                        </Badge>
                      )}
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-text-secondary hover:text-brand-navy hover:bg-bg-alt rounded-lg transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>

                    <Link
                      to={user?.id === 'usr-101' ? '/alumni/alm-101' : '/directory'}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-text-secondary hover:text-brand-navy hover:bg-bg-alt rounded-lg transition-colors"
                    >
                      <User className="w-4 h-4" />
                      My Alumni Profile
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-brand-blue hover:bg-brand-blue-50 rounded-lg transition-colors"
                      >
                        <Shield className="w-4 h-4" />
                        Admin Management
                      </Link>
                    )}

                    <div className="border-t border-border mt-1 pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-status-error hover:bg-status-error-bg/60 rounded-lg transition-colors cursor-pointer text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="blue" size="sm">
                    Join the Network
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-alt focus:outline-none focus:ring-2 focus:ring-brand-blue"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-white px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <NavLink 
            to="/" 
            end 
            onClick={() => setMobileMenuOpen(false)} 
            className={navLinkClasses}
          >
            Home
          </NavLink>
          <NavLink 
            to="/directory" 
            onClick={() => setMobileMenuOpen(false)} 
            className={navLinkClasses}
          >
            <Users className="w-4 h-4" />
            Alumni Directory
          </NavLink>
          <NavLink 
            to="/events" 
            onClick={() => setMobileMenuOpen(false)} 
            className={navLinkClasses}
          >
            <Calendar className="w-4 h-4" />
            Events
          </NavLink>
          {isAuthenticated && (
            <NavLink 
              to="/dashboard" 
              onClick={() => setMobileMenuOpen(false)} 
              className={navLinkClasses}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </NavLink>
          )}
          {isAuthenticated && isAdmin && (
            <NavLink 
              to="/admin" 
              onClick={() => setMobileMenuOpen(false)} 
              className={navLinkClasses}
            >
              <Shield className="w-4 h-4 text-brand-blue" />
              Admin Panel
            </NavLink>
          )}

          <div className="pt-4 mt-2 border-t border-border">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-2">
                  <Avatar src={user?.avatar} name={user?.name || 'User'} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{user?.name}</p>
                    <p className="text-xs text-text-muted">{user?.email}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-status-error hover:bg-status-error-bg" 
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="blue" size="sm" className="w-full">
                    Join
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
