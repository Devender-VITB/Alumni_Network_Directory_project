import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  X, 
  RotateCcw, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight,
  GraduationCap,
  Users
} from 'lucide-react';
import { AlumniCard } from '../components/directory/AlumniCard';
import { FilterSidebar } from '../components/directory/FilterSidebar';
import { AlumniCardSkeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { alumniService } from '../services/alumniService';

export const DirectoryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract initial values from URL query parameters
  const search = searchParams.get('search') || '';
  const department = searchParams.get('department') || '';
  const graduationYear = searchParams.get('graduationYear') || '';
  const industry = searchParams.get('industry') || '';
  const degree = searchParams.get('degree') || '';
  const country = searchParams.get('country') || '';
  const skill = searchParams.get('skill') || '';
  const mentorship = searchParams.get('mentorship') || '';
  const sort = searchParams.get('sort') || 'name_asc';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const [searchInput, setSearchInput] = useState(search);
  const [alumniData, setAlumniData] = useState({ items: [], pagination: { total: 0, totalPages: 1 } });
  const [filterOptions, setFilterOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync debounced search input to URL query params
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== search) {
        updateQueryParam('search', searchInput);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Keep search input synced when URL query changes externally
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // Fetch filter options once
  useEffect(() => {
    const fetchOptions = async () => {
      const opts = await alumniService.getFilters();
      setFilterOptions(opts);
    };
    fetchOptions();
  }, []);

  // Fetch alumni whenever search/filter/sort/page URL params change
  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await alumniService.getAlumni({
          search,
          department,
          graduationYear,
          industry,
          degree,
          country,
          skill,
          mentorship,
          sort,
          page,
          limit: 9,
        });
        setAlumniData(result);
      } catch (err) {
        setError('Failed to load alumni directory. Please verify your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [search, department, graduationYear, industry, degree, country, skill, mentorship, sort, page]);

  const updateQueryParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    // Reset to page 1 on filter or search changes (unless changing page directly)
    if (key !== 'page') {
      newParams.set('page', '1');
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setSearchParams({});
  };

  const activeFilterChips = useMemo(() => {
    const chips = [];
    if (search) chips.push({ key: 'search', label: `Search: "${search}"` });
    if (department) chips.push({ key: 'department', label: `Dept: ${department}` });
    if (graduationYear) chips.push({ key: 'graduationYear', label: `Batch: ${graduationYear}` });
    if (industry) chips.push({ key: 'industry', label: `Industry: ${industry}` });
    if (degree) chips.push({ key: 'degree', label: `Degree: ${degree}` });
    if (skill) chips.push({ key: 'skill', label: `Skill: ${skill}` });
    if (mentorship === 'true') chips.push({ key: 'mentorship', label: 'Mentors Only' });
    return chips;
  }, [search, department, graduationYear, industry, degree, skill, mentorship]);

  const currentFilters = {
    search,
    department,
    graduationYear,
    industry,
    degree,
    country,
    skill,
    mentorship,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Directory Page Title & Banner */}
      <div className="mb-8 text-left space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-brand-navy tracking-tight">
              Alumni Directory
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Explore and connect with verified graduates of Apex Institute of Technology.
            </p>
          </div>

          {/* Quick Mentorship Banner Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-status-success-bg border border-status-success/20 text-status-success text-xs font-semibold self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
            <span>Over 14+ Alumni Open to Career Mentorship</span>
          </div>
        </div>
      </div>

      {/* Search & Top Action Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Bar with Icon */}
        <div className="relative flex-1 max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name, company, job title, skills, or batch..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-border bg-white text-sm text-text-primary placeholder:text-text-muted focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 focus:outline-none transition-all shadow-soft-sm"
          />
          {searchInput && (
            <button
              onClick={() => {
                setSearchInput('');
                updateQueryParam('search', '');
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-primary cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            size="md"
            leftIcon={Filter}
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden shrink-0"
          >
            Filters {activeFilterChips.length > 0 && `(${activeFilterChips.length})`}
          </Button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 shrink-0">
            <ArrowUpDown className="w-4 h-4 text-text-muted hidden sm:block" />
            <select
              value={sort}
              onChange={(e) => updateQueryParam('sort', e.target.value)}
              className="rounded-xl border border-border bg-white px-3 py-2 text-xs font-medium text-text-primary focus:border-brand-blue focus:outline-none shadow-soft-sm"
            >
              <option value="name_asc">Name: A &rarr; Z</option>
              <option value="name_desc">Name: Z &rarr; A</option>
              <option value="year_desc">Batch: Newest First</option>
              <option value="year_asc">Batch: Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilterChips.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-xs text-text-muted font-medium">Active Filters:</span>
          {activeFilterChips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-blue-50 text-brand-blue border border-brand-blue/20 text-xs font-medium"
            >
              <span>{chip.label}</span>
              <button
                type="button"
                onClick={() => {
                  if (chip.key === 'search') setSearchInput('');
                  updateQueryParam(chip.key, '');
                }}
                className="hover:text-brand-navy p-0.5 rounded cursor-pointer"
                aria-label={`Remove filter ${chip.label}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs text-brand-blue hover:underline font-semibold ml-2 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Grid: Sidebar + Alumni Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-border bg-white p-5 shadow-soft">
            <FilterSidebar
              filters={currentFilters}
              filterOptions={filterOptions}
              onFilterChange={(key, val) => updateQueryParam(key, val)}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>

        {/* Alumni Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Result Count Status Bar */}
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>
              Showing <strong className="text-text-primary">{alumniData.items.length}</strong> of{' '}
              <strong className="text-text-primary">{alumniData.pagination?.total || 0}</strong> verified alumni
            </span>
            {alumniData.pagination?.totalPages > 1 && (
              <span>
                Page {alumniData.pagination.page} of {alumniData.pagination.totalPages}
              </span>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <AlumniCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <ErrorState
              title="Unable to load alumni"
              message={error}
              onRetry={() => updateQueryParam('page', page)}
            />
          )}

          {/* Empty State */}
          {!loading && !error && alumniData.items.length === 0 && (
            <EmptyState
              icon={Users}
              title="No alumni match your criteria"
              description="We couldn't find any alumni matching your current search terms or filter selection. Try clearing your filters or using broader keywords."
              actionLabel="Clear All Filters"
              onAction={handleResetFilters}
            />
          )}

          {/* Alumni Grid */}
          {!loading && !error && alumniData.items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {alumniData.items.map((alum) => (
                <AlumniCard key={alum.id || alum.userId} alumni={alum} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {!loading && alumniData.pagination?.totalPages > 1 && (
            <div className="pt-6 border-t border-border flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                leftIcon={ChevronLeft}
                disabled={!alumniData.pagination.hasPrev}
                onClick={() => updateQueryParam('page', page - 1)}
              >
                Previous
              </Button>

              <div className="flex items-center gap-1.5">
                {[...Array(alumniData.pagination.totalPages)].map((_, i) => {
                  const p = i + 1;
                  const isCurrent = p === page;
                  return (
                    <button
                      key={p}
                      onClick={() => updateQueryParam('page', p)}
                      className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-brand-navy text-white shadow-soft-sm'
                          : 'bg-white border border-border text-text-secondary hover:bg-bg-alt'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                rightIcon={ChevronRight}
                disabled={!alumniData.pagination.hasNext}
                onClick={() => updateQueryParam('page', page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal Drawer */}
      <Modal
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        title="Filter Alumni Directory"
        footer={
          <Button variant="blue" className="w-full" onClick={() => setMobileFilterOpen(false)}>
            Apply Filters ({activeFilterChips.length})
          </Button>
        }
      >
        <FilterSidebar
          filters={currentFilters}
          filterOptions={filterOptions}
          onFilterChange={(key, val) => updateQueryParam(key, val)}
          onResetFilters={handleResetFilters}
        />
      </Modal>
    </div>
  );
};

export default DirectoryPage;
