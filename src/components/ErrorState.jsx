import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function ErrorState({ 
  message = 'Something went wrong', 
  fullPage = false,
  onRetry = null,
  className = ''
}) {
  if (fullPage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full text-center">
        <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8 text-error" />
        </div>
        <h3 className="text-xl font-medium text-text-primary mb-2">Error</h3>
        <p className="text-text-secondary mb-6 max-w-md">{message}</p>
        {onRetry && (
          <button 
            className="btn btn-primary"
            onClick={onRetry}
            aria-label="Retry"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={`p-6 rounded-lg border border-error/20 bg-error/5 ${className}`}>
      <div className="flex items-start">
        <AlertTriangle className="w-5 h-5 text-error mr-3 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-medium text-text-primary mb-1">Error</h4>
          <p className="text-sm text-text-secondary mb-3">{message}</p>
          {onRetry && (
            <button 
              className="btn btn-secondary text-sm py-1 px-3 h-auto"
              onClick={onRetry}
              aria-label="Retry"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

