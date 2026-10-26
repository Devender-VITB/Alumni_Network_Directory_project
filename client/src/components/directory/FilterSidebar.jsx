import React from 'react';
import { Filter, RotateCcw, Compass, Check } from 'lucide-react';
import { Button } from '../common/Button';
import { Select } from '../common/Select';
import { cn } from '../../utils/cn';

export const FilterSidebar = ({
  filters,
  filterOptions,
  onFilterChange,
  onResetFilters,
  className,
}) => {
  return (
    <aside className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-navy" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">
            Filters
          </h3>
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          className="text-xs text-brand-blue hover:text-brand-blue-hover font-medium inline-flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* Mentorship Filter Toggle */}
      <div className="p-3.5 rounded-xl bg-brand-blue-50/70 border border-brand-blue/20">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.mentorship === 'true'}
            onChange={(e) => onFilterChange('mentorship', e.target.checked ? 'true' : '')}
            className="w-4 h-4 rounded text-brand-blue focus:ring-brand-blue border-border"
          />
          <div className="text-left">
            <span className="text-xs font-bold text-brand-navy flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-brand-blue" />
              Available for Mentorship
            </span>
            <span className="text-[11px] text-text-secondary block">
              Alumni open to guiding students & peers
            </span>
          </div>
        </label>
      </div>

      {/* Department Filter */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
          Academic Department
        </label>
        <select
          value={filters.department || ''}
          onChange={(e) => onFilterChange('department', e.target.value)}
          className="w-full text-xs rounded-xl border border-border bg-white px-3 py-2 text-text-primary focus:border-brand-blue focus:outline-none"
        >
          <option value="">All Departments</option>
          {filterOptions.departments?.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Graduation Year Filter */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
          Graduation Batch
        </label>
        <select
          value={filters.graduationYear || ''}
          onChange={(e) => onFilterChange('graduationYear', e.target.value)}
          className="w-full text-xs rounded-xl border border-border bg-white px-3 py-2 text-text-primary focus:border-brand-blue focus:outline-none"
        >
          <option value="">All Graduating Years</option>
          {filterOptions.graduationYears?.map((year) => (
            <option key={year} value={year}>
              Class of {year}
            </option>
          ))}
        </select>
      </div>

      {/* Industry Filter */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
          Industry Sector
        </label>
        <select
          value={filters.industry || ''}
          onChange={(e) => onFilterChange('industry', e.target.value)}
          className="w-full text-xs rounded-xl border border-border bg-white px-3 py-2 text-text-primary focus:border-brand-blue focus:outline-none"
        >
          <option value="">All Industries</option>
          {filterOptions.industries?.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>

      {/* Degree Filter */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
          Degree Program
        </label>
        <select
          value={filters.degree || ''}
          onChange={(e) => onFilterChange('degree', e.target.value)}
          className="w-full text-xs rounded-xl border border-border bg-white px-3 py-2 text-text-primary focus:border-brand-blue focus:outline-none"
        >
          <option value="">All Degree Programs</option>
          {filterOptions.degrees?.map((deg) => (
            <option key={deg} value={deg}>
              {deg}
            </option>
          ))}
        </select>
      </div>

      {/* Popular Skills Pills */}
      {filterOptions.skills && filterOptions.skills.length > 0 && (
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
            Filter by Skill
          </label>
          <div className="flex flex-wrap gap-1.5">
            {filterOptions.skills.slice(0, 10).map((skill) => {
              const isSelected = filters.skill === skill;
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => onFilterChange('skill', isSelected ? '' : skill)}
                  className={cn(
                    'text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer',
                    isSelected
                      ? 'bg-brand-blue text-white border-brand-blue font-semibold'
                      : 'bg-white text-text-secondary border-border hover:border-brand-blue/40'
                  )}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
};

export default FilterSidebar;
