import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/cn';

export const Input = React.forwardRef(({
  label,
  error,
  helperText,
  className,
  type = 'text',
  id,
  name,
  required,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  disabled,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || name || Math.random().toString(36).substring(2, 9);
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-xs font-semibold uppercase tracking-wider text-text-primary"
        >
          {label} {required && <span className="text-status-error">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-soft-sm">
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
            <LeftIcon className="w-4 h-4" />
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          name={name}
          type={effectiveType}
          disabled={disabled}
          className={cn(
            'block w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-all duration-150',
            'focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 focus:outline-none',
            'disabled:bg-bg-alt disabled:text-text-muted disabled:cursor-not-allowed',
            error ? 'border-status-error focus:border-status-error focus:ring-status-error/20' : 'border-border hover:border-border-dark',
            LeftIcon && 'pl-10',
            (RightIcon || isPassword) && 'pr-10',
            className
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-text-muted hover:text-text-primary cursor-pointer focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}

        {!isPassword && RightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-text-muted">
            <RightIcon className="w-4 h-4" />
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-status-error font-medium flex items-center gap-1" role="alert">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p className="text-xs text-text-secondary">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
