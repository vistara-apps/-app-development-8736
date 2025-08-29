import React from 'react'
import { clsx } from 'clsx'

const variants = {
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  danger: 'bg-error/10 text-error border-error/20',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
}

export default function StatusBadge({ variant = 'info', children, className }) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}