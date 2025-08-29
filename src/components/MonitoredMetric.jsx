import React from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'

// Simple sparkline component using div elements
function SimpleSparkline({ data, width = 64, height = 32 }) {
  if (!data || data.length === 0) return null
  
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((value - min) / range) * height
    return `${x},${y}`
  }).join(' ')
  
  return (
    <svg width={width} height={height} className="text-primary">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        points={points}
      />
    </svg>
  )
}

export default function MonitoredMetric({ 
  title, 
  value, 
  unit = '', 
  variant = 'numericValue', 
  data = [], 
  trend = 'stable',
  className 
}) {
  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    stable: 'text-text-secondary'
  }

  if (variant === 'lineChart') {
    return (
      <div className={`card ${className}`}>
        <div className="mb-4">
          <h3 className="font-medium text-text-primary">{title}</h3>
          <p className="text-2xl font-semibold mt-1">
            {value}{unit}
          </p>
        </div>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="time" hide />
              <YAxis hide />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(240 70% 50%)" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }

  if (variant === 'sparkline') {
    const sparklineData = data.map(d => d.value || d)
    
    return (
      <div className={`card ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-text-primary">{title}</h3>
          <div className="h-8 w-16">
            <SimpleSparkline data={sparklineData} width={64} height={32} />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-semibold">{value}{unit}</span>
          <span className={`text-sm ${trendColors[trend]}`}>
            {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={`card ${className}`}>
      <h3 className="font-medium text-text-secondary mb-1">{title}</h3>
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold">{value}{unit}</span>
        <span className={`text-sm ${trendColors[trend]}`}>
          {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
        </span>
      </div>
    </div>
  )
}