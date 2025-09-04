import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Bot, 
  Network, 
  Database, 
  BarChart3, 
  Settings, 
  Menu,
  Bell,
  User,
  X
} from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Agent Fleets', href: '/fleets', icon: Bot },
  { name: 'Data Pipelines', href: '/pipelines', icon: Database },
  { name: 'Monitoring', href: '/monitoring', icon: Network },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Layout({ children }) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-surface dark:bg-surface-dark border-b border-border dark:border-border-dark transition-colors duration-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button 
                className="md:hidden btn btn-ghost p-1" 
                onClick={toggleSidebar}
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-text-primary dark:text-text-primary-dark">AgentFlow Hub</h1>
                  <p className="text-xs text-text-secondary dark:text-text-secondary-dark hidden sm:block">Deploy & Manage AI Agents</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />
              <button className="btn btn-ghost p-2 sm:p-4" aria-label="Notifications">
                <Bell className="w-5 h-5" />
              </button>
              <button className="btn btn-ghost p-2 sm:p-4" aria-label="User profile">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside 
          className={`fixed inset-y-0 left-0 z-20 w-64 transform bg-surface dark:bg-surface-dark border-r border-border dark:border-border-dark transition-all duration-300 ease-in-out md:translate-x-0 md:static md:min-h-screen ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 md:hidden">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">AgentFlow Hub</span>
            </div>
            <button 
              className="btn btn-ghost p-1" 
              onClick={toggleSidebar}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
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
                      : 'text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 w-full">
          <div className="max-w-screen-lg mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
