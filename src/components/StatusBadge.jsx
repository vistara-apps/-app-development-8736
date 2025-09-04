import React from 'react'
import { clsx } from 'clsx'

const variants = {
  success: 'bg-success/10 text-success border-success/20 dark:bg-success/20 dark:border-success/30',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800/30',
  danger: 'bg-error/10 text-error border-error/20 dark:bg-error/20 dark:border-error/30',
  info: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/30',
}

export default function StatusBadge({ variant = 'info', children, className }) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors',
      variants[variant],
      className
    )}
    role="status"
    >
      {children}
    </span>
  )
}
