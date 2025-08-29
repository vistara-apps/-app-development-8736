import React from 'react'
import { Bot, Database, TrendingUp, Users } from 'lucide-react'
import MonitoredMetric from '../components/MonitoredMetric'
import AgentCard from '../components/AgentCard'
import PipelineCard from '../components/PipelineCard'

// Mock data
const dashboardMetrics = [
  { title: 'Total Agents', value: '1,247', trend: 'up' },
  { title: 'Active Fleets', value: '23', trend: 'stable' },
  { title: 'Data Processed', value: '2.4TB', trend: 'up' },
  { title: 'Success Rate', value: '99.2%', trend: 'up' },
]

const performanceData = Array.from({ length: 24 }, (_, i) => ({
  time: i,
  value: Math.floor(Math.random() * 100) + 50
}))

const recentAgents = [
  { id: 1, name: 'Data Processor Alpha', type: 'Data Processing', tasksCompleted: 1429, uptime: '23h', successRate: 98.5 },
  { id: 2, name: 'Content Analyzer Beta', type: 'Content Analysis', tasksCompleted: 892, uptime: '18h', successRate: 99.1 },
  { id: 3, name: 'API Monitor Gamma', type: 'Monitoring', tasksCompleted: 2156, uptime: '47h', successRate: 97.8 },
]

const recentPipelines = [
  { id: 1, name: 'E-commerce Data Feed', source: 'REST API', recordsProcessed: 15420, throughput: 245, connectedAgents: 12 },
  { id: 2, name: 'Social Media Stream', source: 'WebSocket', recordsProcessed: 8932, throughput: 156, connectedAgents: 8 },
]

export default function Dashboard() {
  const handleAgentAction = (action, agent) => {
    console.log(`${action} action for agent:`, agent)
  }

  const handlePipelineAction = (action, pipeline) => {
    console.log(`${action} action for pipeline:`, pipeline)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-semibold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary mt-2">Monitor your AI agent fleet performance and data processing workflows.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric, index) => (
          <MonitoredMetric
            key={index}
            title={metric.title}
            value={metric.value}
            trend={metric.trend}
          />
        ))}
      </div>

      {/* Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonitoredMetric
          title="Agent Performance (24h)"
          value="89.3"
          unit="%"
          variant="lineChart"
          data={performanceData}
          className="lg:col-span-2"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Agents */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-medium text-text-primary">Recent Agents</h2>
            <button className="btn btn-ghost text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {recentAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                variant="active"
                onAction={handleAgentAction}
              />
            ))}
          </div>
        </div>

        {/* Recent Pipelines */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-medium text-text-primary">Active Pipelines</h2>
            <button className="btn btn-ghost text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {recentPipelines.map((pipeline) => (
              <PipelineCard
                key={pipeline.id}
                pipeline={pipeline}
                variant="active"
                onAction={handlePipelineAction}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-medium text-text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn btn-primary">
            <Bot className="w-4 h-4 mr-2" />
            Deploy New Fleet
          </button>
          <button className="btn btn-secondary">
            <Database className="w-4 h-4 mr-2" />
            Create Data Pipeline
          </button>
          <button className="btn btn-secondary">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Analytics
          </button>
        </div>
      </div>
    </div>
  )
}