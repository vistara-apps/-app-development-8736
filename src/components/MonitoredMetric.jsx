import React from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'

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

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface dark:bg-surface-dark p-2 border border-border dark:border-border-dark rounded shadow-md">
        <p className="text-sm font-medium text-text-primary dark:text-text-primary-dark">{`Time: ${label}`}</p>
        <p className="text-sm text-primary">{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

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
    stable: 'text-text-secondary dark:text-text-secondary-dark'
  }

  const trendIcons = {
    up: '↗',
    down: '↘',
    stable: '→'
  }

  if (variant === 'lineChart') {
    return (
      <div className={`card ${className}`}>
        <div className="mb-4">
          <h3 className="font-medium text-text-primary dark:text-text-primary-dark">{title}</h3>
          <p className="text-2xl font-semibold mt-1 text-text-primary dark:text-text-primary-dark">
            {value}{unit}
          </p>
        </div>
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 5% 88%)" className="dark:stroke-border-dark" />
              <XAxis 
                dataKey="time" 
                className="text-text-secondary dark:text-text-secondary-dark" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-text-secondary dark:text-text-secondary-dark" 
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(240 70% 50%)" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "hsl(240 70% 50%)" }}
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
          <h3 className="font-medium text-text-primary dark:text-text-primary-dark">{title}</h3>
          <div className="h-8 w-16">
            <SimpleSparkline data={sparklineData} width={64} height={32} />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-semibold text-text-primary dark:text-text-primary-dark">{value}{unit}</span>
          <span className={`text-sm ${trendColors[trend]}`}>
            {trendIcons[trend]}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={`card ${className} transition-all hover:shadow-md`}>
      <h3 className="font-medium text-text-secondary dark:text-text-secondary-dark mb-1">{title}</h3>
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-text-primary dark:text-text-primary-dark">{value}{unit}</span>
        <span className={`text-sm ${trendColors[trend]}`}>
          {trendIcons[trend]}
        </span>
      </div>
    </div>
  )
}
