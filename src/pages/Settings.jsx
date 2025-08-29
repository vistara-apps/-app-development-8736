import React, { useState } from 'react'
import { User, Bell, Shield, CreditCard, Database, Zap } from 'lucide-react'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account')

  const tabs = [
    { id: 'account', name: 'Account', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'integrations', name: 'Integrations', icon: Database },
    { id: 'performance', name: 'Performance', icon: Zap },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-semibold text-text-primary">Settings</h1>
        <p className="text-text-secondary mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:text-text-primary hover:bg-slate-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-medium text-text-primary mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input type="text" className="input" defaultValue="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input type="text" className="input" defaultValue="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input type="email" className="input" defaultValue="john.doe@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input type="text" className="input" defaultValue="AgentFlow Corp" />
                  </div>
                  <button className="btn btn-primary">Save Changes</button>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium text-text-primary mb-4">Subscription</h3>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-medium">Pro Plan</div>
                    <div className="text-sm text-text-secondary">1000 agents, 10M operations/month</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-xl">$299/mo</div>
                    <button className="btn btn-ghost text-sm">Upgrade</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card">
              <h3 className="text-lg font-medium text-text-primary mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-text-secondary">Receive email alerts for important events</div>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Agent Failure Alerts</div>
                    <div className="text-sm text-text-secondary">Get notified when agents fail or stop responding</div>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Performance Alerts</div>
                    <div className="text-sm text-text-secondary">Alerts for performance degradation</div>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Weekly Reports</div>
                    <div className="text-sm text-text-secondary">Weekly performance summary emails</div>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>
                <button className="btn btn-primary">Save Preferences</button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-medium text-text-primary mb-4">Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Password</label>
                    <input type="password" className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">New Password</label>
                    <input type="password" className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                    <input type="password" className="input" />
                  </div>
                  <button className="btn btn-primary">Update Password</button>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium text-text-primary mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">2FA Status</div>
                    <div className="text-sm text-text-secondary">Secure your account with two-factor authentication</div>
                  </div>
                  <button className="btn btn-secondary">Enable 2FA</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-medium text-text-primary mb-4">Current Plan</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-lg">Pro Plan</div>
                        <div className="text-text-secondary">1000 agents • 10M operations/month</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">$299</div>
                        <div className="text-sm text-text-secondary">per month</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="btn btn-primary">Upgrade Plan</button>
                    <button className="btn btn-secondary">Downgrade</button>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium text-text-primary mb-4">Usage This Month</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Agents Used</span>
                    <span className="font-medium">847 / 1000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Operations</span>
                    <span className="font-medium">6.2M / 10M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Processed</span>
                    <span className="font-medium">2.4TB</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="card">
              <h3 className="text-lg font-medium text-text-primary mb-4">Available Integrations</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Database className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Slack</div>
                      <div className="text-sm text-text-secondary">Get notifications in Slack</div>
                    </div>
                  </div>
                  <button className="btn btn-secondary">Connect</button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Database className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">AWS S3</div>
                      <div className="text-sm text-text-secondary">Store processed data in S3</div>
                    </div>
                  </div>
                  <button className="btn btn-primary">Connected</button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Database className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">PostgreSQL</div>
                      <div className="text-sm text-text-secondary">Connect to your database</div>
                    </div>
                  </div>
                  <button className="btn btn-secondary">Connect</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="card">
              <h3 className="text-lg font-medium text-text-primary mb-4">Performance Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Auto-scaling Threshold</label>
                  <select className="input">
                    <option>70% CPU usage</option>
                    <option>80% CPU usage</option>
                    <option>90% CPU usage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Max Agents per Fleet</label>
                  <input type="number" className="input" defaultValue="500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Request Timeout (seconds)</label>
                  <input type="number" className="input" defaultValue="30" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Enable Auto-scaling</div>
                    <div className="text-sm text-text-secondary">Automatically scale agents based on demand</div>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <button className="btn btn-primary">Save Settings</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}