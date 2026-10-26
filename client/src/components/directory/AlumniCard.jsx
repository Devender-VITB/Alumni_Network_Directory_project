import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  GraduationCap, 
  CheckCircle2, 
  Compass, 
  ArrowRight,
  ExternalLink 
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';

export const AlumniCard = ({ alumni }) => {
  return (
    <Card hoverable className="text-left flex flex-col justify-between p-6 transition-all duration-200">
      <div className="space-y-4">
        {/* Top bar: Avatar + Batch Badge & Mentorship */}
        <div className="flex items-start justify-between gap-3">
          <Avatar 
            src={alumni.profileImage} 
            name={alumni.fullName} 
            size="lg" 
          />
          <div className="flex flex-col items-end gap-1.5">
            <Badge variant="navy" size="sm">
              Batch '{String(alumni.graduationYear).slice(2)}
            </Badge>
            {alumni.mentorshipAvailable && (
              <Badge variant="success" size="sm" icon={Compass}>
                Mentor
              </Badge>
            )}
          </div>
        </div>

        {/* Identity & Career */}
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-base font-bold text-text-primary tracking-tight truncate">
              {alumni.fullName}
            </h3>
            {alumni.isVerified && (
              <CheckCircle2 
                className="w-4 h-4 text-brand-blue shrink-0" 
                title="Verified Alumni Member"
              />
            )}
          </div>
          <p className="text-xs font-semibold text-brand-blue truncate mt-0.5">
            {alumni.currentJobTitle}
          </p>
          <div className="flex items-center gap-1 text-xs text-text-secondary truncate mt-0.5">
            <Building2 className="w-3.5 h-3.5 shrink-0 text-text-muted" />
            <span className="truncate">{alumni.currentCompany}</span>
          </div>
        </div>

        {/* Academic Department & Location */}
        <div className="space-y-1.5 pt-1 text-xs text-text-secondary">
          <div className="flex items-center gap-2 truncate">
            <GraduationCap className="w-3.5 h-3.5 shrink-0 text-text-muted" />
            <span className="truncate">{alumni.department}</span>
          </div>
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-text-muted" />
            <span className="truncate">{alumni.location}</span>
          </div>
        </div>

        {/* Skills Tag Pills */}
        {alumni.skills && alumni.skills.length > 0 && (
          <div className="pt-2 flex flex-wrap gap-1.5">
            {alumni.skills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-md bg-bg-alt text-text-secondary"
              >
                {skill}
              </span>
            ))}
            {alumni.skills.length > 3 && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 text-text-muted">
                +{alumni.skills.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-5 mt-5 border-t border-border flex items-center justify-between gap-3">
        <span className="text-[11px] text-text-muted font-medium">
          {alumni.industry}
        </span>
        <Link to={`/alumni/${alumni.id || alumni.userId}`}>
          <Button variant="outline" size="sm" rightIcon={ArrowRight} className="text-xs py-1.5">
            View Profile
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default AlumniCard;
