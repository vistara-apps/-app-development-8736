import React from 'react'
import { Bot, Play, Pause, AlertCircle } from 'lucide-react'
import StatusBadge from './StatusBadge'

const statusConfig = {
  active: { variant: 'success', icon: Play, text: 'Active' },
  inactive: { variant: 'danger', icon: Pause, text: 'Inactive' },
  deploying: { variant: 'warning', icon: AlertCircle, text: 'Deploying' },
}

export default function AgentCard({ agent, variant = 'active', onAction }) {
  const status = statusConfig[variant]
  const StatusIcon = status.icon

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-text-primary">{agent.name}</h3>
            <p className="text-sm text-text-secondary">{agent.type}</p>
          </div>
        </div>
        <StatusBadge variant={status.variant}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {status.text}
        </StatusBadge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Tasks Completed</span>
          <span className="font-medium">{agent.tasksCompleted || 0}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Uptime</span>
          <span className="font-medium">{agent.uptime || '0h'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Success Rate</span>
          <span className="font-medium">{agent.successRate || '0'}%</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button 
          className="btn btn-primary flex-1"
          onClick={() => onAction?.('configure', agent)}
        >
          Configure
        </button>
        <button 
          className="btn btn-secondary"
          onClick={() => onAction?.('logs', agent)}
        >
          Logs
        </button>
      </div>
    </div>
  )
}