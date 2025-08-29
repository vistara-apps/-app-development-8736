import React from 'react'
import { Database, Play, Pause, AlertTriangle } from 'lucide-react'
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
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-medium text-text-primary">{pipeline.name}</h3>
            <p className="text-sm text-text-secondary">{pipeline.source}</p>
          </div>
        </div>
        <StatusBadge variant={status.variant}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {status.text}
        </StatusBadge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Records Processed</span>
          <span className="font-medium">{pipeline.recordsProcessed || 0}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Throughput</span>
          <span className="font-medium">{pipeline.throughput || '0'}/min</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Connected Agents</span>
          <span className="font-medium">{pipeline.connectedAgents || 0}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button 
          className="btn btn-primary flex-1"
          onClick={() => onAction?.('configure', pipeline)}
        >
          Configure
        </button>
        <button 
          className="btn btn-secondary"
          onClick={() => onAction?.('monitor', pipeline)}
        >
          Monitor
        </button>
      </div>
    </div>
  )
}