import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import AgentFleets from './pages/AgentFleets'
import DataPipelines from './pages/DataPipelines'
import Monitoring from './pages/Monitoring'
import Settings from './pages/Settings'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/fleets" element={<AgentFleets />} />
        <Route path="/pipelines" element={<DataPipelines />} />
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  )
}

export default App