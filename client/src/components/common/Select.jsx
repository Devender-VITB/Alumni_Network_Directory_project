import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export const Select = React.forwardRef(({
  label,
  error,
  helperText,
  options = [],
  placeholder = 'Select an option',
  className,
  id,
  name,
  required,
  disabled,
  ...props
}, ref) => {
  const selectId = id || name || Math.random().toString(36).substring(2, 9);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label 
          htmlFor={selectId} 
          className="block text-xs font-semibold uppercase tracking-wider text-text-primary"
        >
          {label} {required && <span className="text-status-error">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-soft-sm">
        <select
          ref={ref}
          id={selectId}
          name={name}
          disabled={disabled}
          className={cn(
            'block w-full appearance-none rounded-xl border bg-white px-3.5 py-2.5 pr-10 text-sm text-text-primary transition-all duration-150',
            'focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 focus:outline-none',
            'disabled:bg-bg-alt disabled:text-text-muted disabled:cursor-not-allowed',
            error ? 'border-status-error focus:border-status-error' : 'border-border hover:border-border-dark',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="text-text-muted">
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const value = typeof opt === 'object' ? opt.value : opt;
            const label = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-text-muted">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error && (
        <p className="text-xs text-status-error font-medium" role="alert">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p className="text-xs text-text-secondary">{helperText}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
