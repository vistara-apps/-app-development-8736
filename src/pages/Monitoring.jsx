import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import MonitoredMetric from '../components/MonitoredMetric'
import { Activity, AlertTriangle, TrendingUp, Zap } from 'lucide-react'

// Mock performance data
const performanceData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  agents: Math.floor(Math.random() * 50) + 900,
  throughput: Math.floor(Math.random() * 200) + 150,
  errors: Math.floor(Math.random() * 10) + 2,
  latency: Math.floor(Math.random() * 100) + 50
}))

const fleetPerformance = [
  { name: 'Data Processing', agents: 150, active: 142, success: 98.5 },
  { name: 'Content Analysis', agents: 75, active: 68, success: 99.1 },
  { name: 'Monitoring', agents: 50, active: 45, success: 97.8 },
  { name: 'API Integration', agents: 25, active: 23, success: 96.2 },
]

const recentAlerts = [
  { id: 1, type: 'warning', message: 'High latency detected in Data Processing Fleet', time: '2 min ago', severity: 'medium' },
  { id: 2, type: 'error', message: 'Agent failure in Monitoring Fleet Gamma', time: '15 min ago', severity: 'high' },
  { id: 3, type: 'info', message: 'Deployment completed for Content Analysis Fleet', time: '1 hour ago', severity: 'low' },
  { id: 4, type: 'warning', message: 'Memory usage above 85% for 3 agents', time: '2 hours ago', severity: 'medium' },
]

export default function Monitoring() {
  const [timeRange, setTimeRange] = useState('24h')
  const [selectedMetric, setSelectedMetric] = useState('all')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-text-primary">Monitoring</h1>
          <p className="text-text-secondary mt-2">Real-time performance monitoring and alerting for your AI agent infrastructure.</p>
        </div>
        <div className="flex space-x-2">
          <select 
            className="input"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MonitoredMetric
          title="Active Agents"
          value="1,247"
          trend="up"
        />
        <MonitoredMetric
          title="Avg Throughput"
          value="234"
          unit="/min"
          trend="up"
        />
        <MonitoredMetric
          title="Success Rate"
          value="98.7"
          unit="%"
          trend="stable"
        />
        <MonitoredMetric
          title="Avg Response Time"
          value="127"
          unit="ms"
          trend="down"
        />
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Performance Over Time */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-text-primary">Agent Performance</h3>
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 text-sm rounded ${selectedMetric === 'all' ? 'bg-primary text-white' : 'bg-slate-100'}`}
                onClick={() => setSelectedMetric('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded ${selectedMetric === 'agents' ? 'bg-primary text-white' : 'bg-slate-100'}`}
                onClick={() => setSelectedMetric('agents')}
              >
                Agents
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded ${selectedMetric === 'throughput' ? 'bg-primary text-white' : 'bg-slate-100'}`}
                onClick={() => setSelectedMetric('throughput')}
              >
                Throughput
              </button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                {(selectedMetric === 'all' || selectedMetric === 'agents') && (
                  <Line type="monotone" dataKey="agents" stroke="hsl(240 70% 50%)" strokeWidth={2} />
                )}
                {(selectedMetric === 'all' || selectedMetric === 'throughput') && (
                  <Line type="monotone" dataKey="throughput" stroke="hsl(150 65% 45%)" strokeWidth={2} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fleet Performance */}
        <div className="card">
          <h3 className="text-lg font-medium text-text-primary mb-4">Fleet Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fleetPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="active" fill="hsl(240 70% 50%)" />
                <Bar dataKey="agents" fill="hsl(240 70% 80%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Alerts and Fleet Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-text-primary">Recent Alerts</h3>
            <button className="btn btn-ghost text-sm">View All</button>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.severity === 'high' ? 'bg-error' : 
                  alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{alert.message}</p>
                  <p className="text-xs text-text-secondary">{alert.time}</p>
                </div>
                <button className="btn btn-ghost text-xs">Dismiss</button>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet Health */}
        <div className="card">
          <h3 className="text-lg font-medium text-text-primary mb-4">Fleet Health</h3>
          <div className="space-y-4">
            {fleetPerformance.map((fleet, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div>
                  <div className="font-medium text-text-primary">{fleet.name}</div>
                  <div className="text-sm text-text-secondary">
                    {fleet.active}/{fleet.agents} agents active
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-lg">{fleet.success}%</div>
                  <div className="text-xs text-text-secondary">Success Rate</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Utilization */}
      <div className="card">
        <h3 className="text-lg font-medium text-text-primary mb-4">Resource Utilization</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">CPU Usage</span>
              <span className="text-sm font-medium">67%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '67%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">Memory Usage</span>
              <span className="text-sm font-medium">84%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '84%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">Network I/O</span>
              <span className="text-sm font-medium">45%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-accent h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}