import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Bot, 
  Network, 
  Database, 
  BarChart3, 
  Settings, 
  Menu,
  Bell,
  User
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Agent Fleets', href: '/fleets', icon: Bot },
  { name: 'Data Pipelines', href: '/pipelines', icon: Database },
  { name: 'Monitoring', href: '/monitoring', icon: Network },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-text-primary">AgentFlow Hub</h1>
                  <p className="text-xs text-text-secondary">Deploy & Manage AI Agents</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="btn btn-ghost">
                <Bell className="w-5 h-5" />
              </button>
              <button className="btn btn-ghost">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-surface border-r border-border min-h-screen">
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="max-w-screen-lg mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}