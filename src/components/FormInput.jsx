import React from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function FormInput({
  label,
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  success,
  helperText,
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  // Determine input state for styling
  const inputState = error ? 'error' : success ? 'success' : 'default'
  
  // Input state styles
  const stateStyles = {
    default: 'border-border focus-visible:ring-primary',
    error: 'border-error/50 focus-visible:ring-error',
    success: 'border-success/50 focus-visible:ring-success'
  }

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          className={`input pr-10 w-full ${stateStyles[inputState]} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
          {...props}
        />
        
        {/* Status icon */}
        {(error || success) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {error && <AlertCircle className="w-5 h-5 text-error" />}
            {success && <CheckCircle className="w-5 h-5 text-success" />}
          </div>
        )}
      </div>
      
      {/* Error or helper text */}
      {error && (
        <p id={`${id}-error`} className="text-sm text-error">
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p id={`${id}-helper`} className="text-sm text-text-secondary">
          {helperText}
        </p>
      )}
    </div>
  )
}

export function FormTextarea({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  success,
  helperText,
  required = false,
  disabled = false,
  rows = 3,
  className = '',
  ...props
}) {
  // Determine input state for styling
  const inputState = error ? 'error' : success ? 'success' : 'default'
  
  // Input state styles
  const stateStyles = {
    default: 'border-border focus-visible:ring-primary',
    error: 'border-error/50 focus-visible:ring-error',
    success: 'border-success/50 focus-visible:ring-success'
  }

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={rows}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          className={`input w-full resize-y ${stateStyles[inputState]} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
          {...props}
        />
      </div>
      
      {/* Error or helper text */}
      {error && (
        <p id={`${id}-error`} className="text-sm text-error">
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p id={`${id}-helper`} className="text-sm text-text-secondary">
          {helperText}
        </p>
      )}
    </div>
  )
}

export function FormSelect({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  error,
  success,
  helperText,
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  // Determine input state for styling
  const inputState = error ? 'error' : success ? 'success' : 'default'
  
  // Input state styles
  const stateStyles = {
    default: 'border-border focus-visible:ring-primary',
    error: 'border-error/50 focus-visible:ring-error',
    success: 'border-success/50 focus-visible:ring-success'
  }

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          className={`input w-full appearance-none pr-10 ${stateStyles[inputState]} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-text-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {/* Error or helper text */}
      {error && (
        <p id={`${id}-error`} className="text-sm text-error">
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p id={`${id}-helper`} className="text-sm text-text-secondary">
          {helperText}
        </p>
      )}
    </div>
  )
}

