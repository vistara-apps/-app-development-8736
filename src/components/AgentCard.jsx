import React from 'react'
import { Bot, Play, Pause, AlertCircle, Settings, FileText } from 'lucide-react'
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
    <div className="card transition-all hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-text-primary dark:text-text-primary-dark">{agent.name}</h3>
            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">{agent.type}</p>
          </div>
        </div>
        <StatusBadge variant={status.variant}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {status.text}
        </StatusBadge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary dark:text-text-secondary-dark">Tasks Completed</span>
          <span className="font-medium text-text-primary dark:text-text-primary-dark">{agent.tasksCompleted || 0}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary dark:text-text-secondary-dark">Uptime</span>
          <span className="font-medium text-text-primary dark:text-text-primary-dark">{agent.uptime || '0h'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary dark:text-text-secondary-dark">Success Rate</span>
          <span className="font-medium text-text-primary dark:text-text-primary-dark">{agent.successRate || '0'}%</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button 
          className="btn btn-primary flex-1 group"
          onClick={() => onAction?.('configure', agent)}
          aria-label={`Configure ${agent.name}`}
        >
          <Settings className="w-4 h-4 mr-2 transition-transform group-hover:rotate-45" />
          Configure
        </button>
        <button 
          className="btn btn-secondary"
          onClick={() => onAction?.('logs', agent)}
          aria-label={`View logs for ${agent.name}`}
        >
          <FileText className="w-4 h-4 mr-2" />
          Logs
        </button>
      </div>
    </div>
  )
}
