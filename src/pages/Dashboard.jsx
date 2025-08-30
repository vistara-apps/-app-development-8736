import React, { useState, useEffect } from 'react'
import { Bot, Database, TrendingUp, Users } from 'lucide-react'
import MonitoredMetric from '../components/MonitoredMetric'
import AgentCard from '../components/AgentCard'
import PipelineCard from '../components/PipelineCard'
import LoadingState, { SkeletonMetric, SkeletonCard } from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import { useToast } from '../components/Toast'

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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [metrics, setMetrics] = useState([])
  const [agents, setAgents] = useState([])
  const [pipelines, setPipelines] = useState([])
  const { showToast } = useToast()

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Set mock data
        setMetrics(dashboardMetrics)
        setAgents(recentAgents)
        setPipelines(recentPipelines)
        setLoading(false)
      } catch (err) {
        setError('Failed to load dashboard data')
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  const handleAgentAction = (action, agent) => {
    console.log(`${action} action for agent:`, agent)
    showToast(`${action} action triggered for ${agent.name}`, 'info')
  }

  const handlePipelineAction = (action, pipeline) => {
    console.log(`${action} action for pipeline:`, pipeline)
    showToast(`${action} action triggered for ${pipeline.name}`, 'info')
  }

  const handleRetry = () => {
    setLoading(true)
    setError(null)
    // Simulate retry
    setTimeout(() => {
      setMetrics(dashboardMetrics)
      setAgents(recentAgents)
      setPipelines(recentPipelines)
      setLoading(false)
      showToast('Dashboard data refreshed successfully', 'success')
    }, 1000)
  }

  if (error) {
    return (
      <ErrorState 
        message={error}
        fullPage={true}
        onRetry={handleRetry}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-semibold text-text-primary dark:text-text-primary-dark">Dashboard</h1>
        <p className="text-text-secondary dark:text-text-secondary-dark mt-2">Monitor your AI agent fleet performance and data processing workflows.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {loading ? (
          // Skeleton loaders for metrics
          Array(4).fill(0).map((_, index) => (
            <SkeletonMetric key={index} />
          ))
        ) : (
          metrics.map((metric, index) => (
            <MonitoredMetric
              key={index}
              title={metric.title}
              value={metric.value}
              trend={metric.trend}
            />
          ))
        )}
      </div>

      {/* Performance Chart */}
      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="card h-64 animate-pulse">
            <div className="h-5 w-48 bg-slate-200 rounded mb-4"></div>
            <div className="h-full bg-slate-200 rounded"></div>
          </div>
        ) : (
          <MonitoredMetric
            title="Agent Performance (24h)"
            value="89.3"
            unit="%"
            variant="lineChart"
            data={performanceData}
          />
        )}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Agents */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-medium text-text-primary dark:text-text-primary-dark">Recent Agents</h2>
            <button className="btn btn-ghost text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {loading ? (
              // Skeleton loaders for agent cards
              Array(2).fill(0).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : agents.length === 0 ? (
              <div className="card p-8 text-center">
                <p className="text-text-secondary dark:text-text-secondary-dark">No recent agents found</p>
              </div>
            ) : (
              agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  variant="active"
                  onAction={handleAgentAction}
                />
              ))
            )}
          </div>
        </div>

        {/* Recent Pipelines */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-medium text-text-primary dark:text-text-primary-dark">Active Pipelines</h2>
            <button className="btn btn-ghost text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {loading ? (
              // Skeleton loaders for pipeline cards
              Array(2).fill(0).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : pipelines.length === 0 ? (
              <div className="card p-8 text-center">
                <p className="text-text-secondary dark:text-text-secondary-dark">No active pipelines found</p>
              </div>
            ) : (
              pipelines.map((pipeline) => (
                <PipelineCard
                  key={pipeline.id}
                  pipeline={pipeline}
                  variant="active"
                  onAction={handlePipelineAction}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-medium text-text-primary dark:text-text-primary-dark mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <button 
            className="btn btn-primary"
            onClick={() => showToast('Fleet deployment initiated', 'success')}
          >
            <Bot className="w-4 h-4 mr-2" />
            Deploy New Fleet
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => showToast('Pipeline creation started', 'info')}
          >
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
