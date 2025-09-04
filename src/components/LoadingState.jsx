import React from 'react'
import { Loader2 } from 'lucide-react'

export default function LoadingState({ 
  text = 'Loading...', 
  fullPage = false,
  className = ''
}) {
  if (fullPage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-text-secondary">{text}</p>
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center p-6 ${className}`}>
      <Loader2 className="w-6 h-6 text-primary animate-spin mr-3" />
      <p className="text-text-secondary">{text}</p>
    </div>
  )
}

// Skeleton loader for cards
export function SkeletonCard({ lines = 3 }) {
  return (
    <div className="card animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
          <div>
            <div className="h-5 w-32 bg-slate-200 rounded mb-2"></div>
            <div className="h-3 w-24 bg-slate-200 rounded"></div>
          </div>
        </div>
        <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
      </div>
      
      <div className="space-y-3 mb-4">
        {Array(lines).fill(0).map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-4 w-24 bg-slate-200 rounded"></div>
            <div className="h-4 w-16 bg-slate-200 rounded"></div>
          </div>
        ))}
      </div>
      
      <div className="flex space-x-2">
        <div className="h-10 w-full bg-slate-200 rounded-md"></div>
        <div className="h-10 w-20 bg-slate-200 rounded-md"></div>
      </div>
    </div>
  )
}

// Skeleton loader for metrics
export function SkeletonMetric() {
  return (
    <div className="card animate-pulse">
      <div className="h-4 w-24 bg-slate-200 rounded mb-3"></div>
      <div className="h-8 w-16 bg-slate-200 rounded"></div>
    </div>
  )
}

