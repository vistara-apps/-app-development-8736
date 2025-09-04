import React from 'react'
import { Plus, Search, Bot, Database } from 'lucide-react'

export default function EmptyState({ 
  title = 'No items found', 
  description = 'Get started by creating your first item',
  icon = 'default',
  actionText = 'Create New',
  onAction = null,
  className = ''
}) {
  // Icon selection based on type
  const IconComponent = () => {
    switch (icon) {
      case 'agent':
        return <Bot className="w-8 h-8 text-primary" />
      case 'pipeline':
        return <Database className="w-8 h-8 text-accent" />
      case 'search':
        return <Search className="w-8 h-8 text-text-secondary" />
      default:
        return <Plus className="w-8 h-8 text-text-secondary" />
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <IconComponent />
      </div>
      <h3 className="text-xl font-medium text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary mb-6 max-w-md">{description}</p>
      {onAction && (
        <button 
          className="btn btn-primary"
          onClick={onAction}
          aria-label={actionText}
        >
          <Plus className="w-4 h-4 mr-2" />
          {actionText}
        </button>
      )}
    </div>
  )
}

// Specialized empty states
export function EmptySearchResults({ searchTerm, onClear }) {
  return (
    <EmptyState
      title="No results found"
      description={`No items matching "${searchTerm}" were found. Try adjusting your search terms.`}
      icon="search"
      actionText="Clear Search"
      onAction={onClear}
    />
  )
}

export function EmptyAgentFleet() {
  return (
    <EmptyState
      title="No Agent Fleets"
      description="Get started by creating your first agent fleet to deploy and manage AI agents."
      icon="agent"
      actionText="Create Fleet"
    />
  )
}

export function EmptyDataPipeline() {
  return (
    <EmptyState
      title="No Data Pipelines"
      description="Get started by creating your first data pipeline to automate data flows to your AI agents."
      icon="pipeline"
      actionText="Create Pipeline"
    />
  )
}

