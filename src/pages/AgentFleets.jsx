import React, { useState } from 'react'
import { Plus, Search, Filter, Bot } from 'lucide-react'
import AgentCard from '../components/AgentCard'

// Mock data for agent fleets
const mockFleets = [
  {
    id: 1,
    name: 'Data Processing Fleet Alpha',
    description: 'High-performance data processing agents for real-time analytics',
    agentCount: 150,
    activeAgents: 142,
    type: 'Data Processing',
    status: 'active',
    agents: [
      { id: 101, name: 'Processor-01', type: 'Data Processing', tasksCompleted: 1429, uptime: '23h', successRate: 98.5 },
      { id: 102, name: 'Processor-02', type: 'Data Processing', tasksCompleted: 1352, uptime: '21h', successRate: 97.8 },
      { id: 103, name: 'Processor-03', type: 'Data Processing', tasksCompleted: 1598, uptime: '25h', successRate: 99.2 },
    ]
  },
  {
    id: 2,
    name: 'Content Analysis Fleet Beta',
    description: 'Specialized agents for content analysis and sentiment processing',
    agentCount: 75,
    activeAgents: 68,
    type: 'Content Analysis',
    status: 'active',
    agents: [
      { id: 201, name: 'Analyzer-01', type: 'Content Analysis', tasksCompleted: 892, uptime: '18h', successRate: 99.1 },
      { id: 202, name: 'Analyzer-02', type: 'Content Analysis', tasksCompleted: 756, uptime: '16h', successRate: 98.9 },
    ]
  },
  {
    id: 3,
    name: 'Monitoring Fleet Gamma',
    description: 'System monitoring and alerting agents',
    agentCount: 50,
    activeAgents: 45,
    type: 'Monitoring',
    status: 'deploying',
    agents: [
      { id: 301, name: 'Monitor-01', type: 'Monitoring', tasksCompleted: 2156, uptime: '47h', successRate: 97.8 },
    ]
  }
]

export default function AgentFleets() {
  const [selectedFleet, setSelectedFleet] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleFleetSelect = (fleet) => {
    setSelectedFleet(selectedFleet?.id === fleet.id ? null : fleet)
  }

  const handleAgentAction = (action, agent) => {
    console.log(`${action} action for agent:`, agent)
  }

  const filteredFleets = mockFleets.filter(fleet =>
    fleet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fleet.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-text-primary">Agent Fleets</h1>
          <p className="text-text-secondary mt-2">Deploy and manage your AI agent fleets at scale.</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Fleet
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search fleets..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-secondary">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
      </div>

      {/* Fleet List */}
      <div className="space-y-4">
        {filteredFleets.map((fleet) => (
          <div key={fleet.id} className="card">
            <div 
              className="cursor-pointer"
              onClick={() => handleFleetSelect(fleet)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-text-primary">{fleet.name}</h3>
                    <p className="text-text-secondary">{fleet.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold text-text-primary">
                    {fleet.activeAgents}/{fleet.agentCount}
                  </div>
                  <div className="text-sm text-text-secondary">Active Agents</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                <div>
                  <div className="text-sm text-text-secondary">Fleet Type</div>
                  <div className="font-medium">{fleet.type}</div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary">Status</div>
                  <div className="font-medium capitalize">{fleet.status}</div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary">Utilization</div>
                  <div className="font-medium">
                    {Math.round((fleet.activeAgents / fleet.agentCount) * 100)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Fleet Details */}
            {selectedFleet?.id === fleet.id && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-text-primary">Fleet Agents</h4>
                  <button className="btn btn-secondary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Agents
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fleet.agents.map((agent) => (
                    <AgentCard
                      key={agent.id}
                      agent={agent}
                      variant="active"
                      onAction={handleAgentAction}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Fleet Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Fleet</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Fleet Name</label>
                <input type="text" className="input" placeholder="Enter fleet name" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Fleet Type</label>
                <select className="input">
                  <option>Data Processing</option>
                  <option>Content Analysis</option>
                  <option>Monitoring</option>
                  <option>API Integration</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Initial Agent Count</label>
                <input type="number" className="input" placeholder="50" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea className="input" rows="3" placeholder="Describe your fleet purpose"></textarea>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                className="btn btn-primary flex-1"
                onClick={() => setShowCreateModal(false)}
              >
                Create Fleet
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}