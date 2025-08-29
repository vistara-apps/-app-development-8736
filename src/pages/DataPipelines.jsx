import React, { useState } from 'react'
import { Plus, Search, Filter, Database, ArrowRight } from 'lucide-react'
import PipelineCard from '../components/PipelineCard'

// Mock data for data pipelines
const mockPipelines = [
  {
    id: 1,
    name: 'E-commerce Data Feed',
    description: 'Real-time product and customer data processing',
    source: 'REST API',
    target: 'Data Processing Fleet Alpha',
    recordsProcessed: 15420,
    throughput: 245,
    connectedAgents: 12,
    status: 'active',
    sourceConfig: {
      type: 'REST API',
      endpoint: 'https://api.ecommerce.com/v1/data',
      authType: 'Bearer Token'
    },
    transformations: ['Data Cleaning', 'Format Conversion', 'Validation']
  },
  {
    id: 2,
    name: 'Social Media Stream',
    description: 'Live social media sentiment analysis pipeline',
    source: 'WebSocket',
    target: 'Content Analysis Fleet Beta',
    recordsProcessed: 8932,
    throughput: 156,
    connectedAgents: 8,
    status: 'active',
    sourceConfig: {
      type: 'WebSocket',
      endpoint: 'wss://stream.social.com/v1/feed',
      authType: 'API Key'
    },
    transformations: ['Text Preprocessing', 'Language Detection', 'Sentiment Scoring']
  },
  {
    id: 3,
    name: 'IoT Sensor Data',
    description: 'Industrial IoT sensor data collection and analysis',
    source: 'MQTT',
    target: 'Monitoring Fleet Gamma',
    recordsProcessed: 45621,
    throughput: 892,
    connectedAgents: 15,
    status: 'paused',
    sourceConfig: {
      type: 'MQTT',
      broker: 'mqtt://iot.sensors.com:1883',
      topics: ['sensors/temperature', 'sensors/pressure']
    },
    transformations: ['Data Aggregation', 'Anomaly Detection', 'Alerting']
  }
]

export default function DataPipelines() {
  const [selectedPipeline, setSelectedPipeline] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handlePipelineSelect = (pipeline) => {
    setSelectedPipeline(selectedPipeline?.id === pipeline.id ? null : pipeline)
  }

  const handlePipelineAction = (action, pipeline) => {
    console.log(`${action} action for pipeline:`, pipeline)
  }

  const filteredPipelines = mockPipelines.filter(pipeline =>
    pipeline.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pipeline.source.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-text-primary">Data Pipelines</h1>
          <p className="text-text-secondary mt-2">Manage automated data flows to your AI agent fleets.</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Pipeline
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search pipelines..."
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

      {/* Pipeline List */}
      <div className="space-y-4">
        {filteredPipelines.map((pipeline) => (
          <div key={pipeline.id} className="card">
            <div 
              className="cursor-pointer"
              onClick={() => handlePipelineSelect(pipeline)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Database className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-text-primary">{pipeline.name}</h3>
                    <p className="text-text-secondary">{pipeline.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold text-text-primary">
                    {pipeline.throughput}/min
                  </div>
                  <div className="text-sm text-text-secondary">Throughput</div>
                </div>
              </div>

              {/* Pipeline Flow */}
              <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-sm text-text-secondary">Source</div>
                  <div className="font-medium">{pipeline.source}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-text-secondary" />
                <div className="text-center">
                  <div className="text-sm text-text-secondary">Processing</div>
                  <div className="font-medium">{pipeline.transformations.length} steps</div>
                </div>
                <ArrowRight className="w-4 h-4 text-text-secondary" />
                <div className="text-center">
                  <div className="text-sm text-text-secondary">Target</div>
                  <div className="font-medium">{pipeline.target}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                <div>
                  <div className="text-sm text-text-secondary">Records Processed</div>
                  <div className="font-medium">{pipeline.recordsProcessed.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary">Connected Agents</div>
                  <div className="font-medium">{pipeline.connectedAgents}</div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary">Status</div>
                  <div className="font-medium capitalize">{pipeline.status}</div>
                </div>
              </div>
            </div>

            {/* Expanded Pipeline Details */}
            {selectedPipeline?.id === pipeline.id && (
              <div className="mt-6 pt-6 border-t border-border space-y-6">
                {/* Source Configuration */}
                <div>
                  <h4 className="text-lg font-medium text-text-primary mb-3">Source Configuration</h4>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-text-secondary">Type</div>
                        <div className="font-medium">{pipeline.sourceConfig.type}</div>
                      </div>
                      <div>
                        <div className="text-sm text-text-secondary">
                          {pipeline.sourceConfig.type === 'MQTT' ? 'Broker' : 'Endpoint'}
                        </div>
                        <div className="font-medium text-sm">
                          {pipeline.sourceConfig.endpoint || pipeline.sourceConfig.broker}
                        </div>
                      </div>
                      {pipeline.sourceConfig.topics && (
                        <div className="col-span-2">
                          <div className="text-sm text-text-secondary">Topics</div>
                          <div className="font-medium">{pipeline.sourceConfig.topics.join(', ')}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Transformations */}
                <div>
                  <h4 className="text-lg font-medium text-text-primary mb-3">Data Transformations</h4>
                  <div className="flex flex-wrap gap-2">
                    {pipeline.transformations.map((transform, index) => (
                      <span 
                        key={index}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {transform}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button className="btn btn-primary">Edit Configuration</button>
                  <button className="btn btn-secondary">View Logs</button>
                  <button className="btn btn-secondary">Test Connection</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Pipeline Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Create New Data Pipeline</h2>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="font-medium">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Pipeline Name</label>
                    <input type="text" className="input" placeholder="Enter pipeline name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Target Fleet</label>
                    <select className="input">
                      <option>Data Processing Fleet Alpha</option>
                      <option>Content Analysis Fleet Beta</option>
                      <option>Monitoring Fleet Gamma</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea className="input" rows="2" placeholder="Describe your pipeline purpose"></textarea>
                </div>
              </div>

              {/* Source Configuration */}
              <div className="space-y-4">
                <h3 className="font-medium">Data Source</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Source Type</label>
                    <select className="input">
                      <option>REST API</option>
                      <option>WebSocket</option>
                      <option>MQTT</option>
                      <option>Database</option>
                      <option>File Upload</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Authentication</label>
                    <select className="input">
                      <option>Bearer Token</option>
                      <option>API Key</option>
                      <option>Basic Auth</option>
                      <option>OAuth 2.0</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Endpoint/Connection String</label>
                  <input type="text" className="input" placeholder="https://api.example.com/v1/data" />
                </div>
              </div>

              {/* Transformations */}
              <div className="space-y-4">
                <h3 className="font-medium">Data Transformations</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Data Cleaning', 'Format Conversion', 'Validation', 'Aggregation', 'Filtering', 'Enrichment'].map((transform) => (
                    <label key={transform} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{transform}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                className="btn btn-primary flex-1"
                onClick={() => setShowCreateModal(false)}
              >
                Create Pipeline
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