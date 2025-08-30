import React from 'react'
import { Database, Play, Pause, AlertTriangle, Settings, BarChart2 } from 'lucide-react'
import StatusBadge from './StatusBadge'

const statusConfig = {
  active: { variant: 'success', icon: Play, text: 'Active' },
  paused: { variant: 'warning', icon: Pause, text: 'Paused' },
  error: { variant: 'danger', icon: AlertTriangle, text: 'Error' },
}

export default function PipelineCard({ pipeline, variant = 'active', onAction }) {
  const status = statusConfig[variant]
  const StatusIcon = status.icon

  return (
    <div className="card transition-all hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 dark:bg-accent/20 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-medium text-text-primary dark:text-text-primary-dark">{pipeline.name}</h3>
            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">{pipeline.source}</p>
          </div>
        </div>
        <StatusBadge variant={status.variant}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {status.text}
        </StatusBadge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary dark:text-text-secondary-dark">Records Processed</span>
          <span className="font-medium text-text-primary dark:text-text-primary-dark">{pipeline.recordsProcessed?.toLocaleString() || 0}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary dark:text-text-secondary-dark">Throughput</span>
          <span className="font-medium text-text-primary dark:text-text-primary-dark">{pipeline.throughput || '0'}/min</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary dark:text-text-secondary-dark">Connected Agents</span>
          <span className="font-medium text-text-primary dark:text-text-primary-dark">{pipeline.connectedAgents || 0}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button 
          className="btn btn-primary flex-1 group"
          onClick={() => onAction?.('configure', pipeline)}
          aria-label={`Configure ${pipeline.name}`}
        >
          <Settings className="w-4 h-4 mr-2 transition-transform group-hover:rotate-45" />
          Configure
        </button>
        <button 
          className="btn btn-secondary"
          onClick={() => onAction?.('monitor', pipeline)}
          aria-label={`Monitor ${pipeline.name}`}
        >
          <BarChart2 className="w-4 h-4 mr-2" />
          Monitor
        </button>
      </div>
    </div>
  )
}
