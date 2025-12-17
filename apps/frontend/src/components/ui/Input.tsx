import React, { forwardRef } from 'react';

/**
 * SignRoad Input Component (Design System v5.0)
 * "Soft Mystical Minimalism" Framework
 *
 * States:
 * - Default: White background, mist border
 * - Focus: Teal border with ring shadow
 * - Error: Error border with ring shadow
 * - Disabled: Snow background, stone text
 * - Filled: Soft teal border (subtle validation)
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon,
  helperText,
  className = '',
  disabled,
  ...props
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-base font-medium text-charcoal">
          {label}
        </label>
      )}
      {helperText && !error && (
        <p className="text-sm text-slate">{helperText}</p>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={`block w-full rounded-xl border-[1.5px] px-4 py-3.5 text-base text-charcoal placeholder-stone bg-white transition-all duration-fast focus:outline-none ${
            icon ? 'pl-10' : ''
          } ${
            error
              ? 'border-error focus:border-error shadow-input-error'
              : disabled
              ? 'border-surface-border bg-neutral-snow text-stone cursor-not-allowed'
              : 'border-surface-border focus:border-brand-teal shadow-input-focus'
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-error flex items-center gap-1">
          <span className="text-base">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
