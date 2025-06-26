"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, TrendingDown, MoreHorizontal, Download, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

interface ChartDataPoint {
  label: string
  value: number
  color?: string
  trend?: number
  metadata?: Record<string, any>
}

interface AdvancedChartProps {
  data: ChartDataPoint[]
  type?: "line" | "bar" | "donut" | "area" | "sparkline"
  title?: string
  subtitle?: string
  height?: number
  showLegend?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  animated?: boolean
  interactive?: boolean
  gradient?: boolean
  className?: string
}

const AdvancedChart: React.FC<AdvancedChartProps> = ({
  data,
  type = "bar",
  title,
  subtitle,
  height = 300,
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  animated = true,
  interactive = true,
  gradient = false,
  className
}) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null)
  
  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  
  const colors = [
    "rgb(59, 130, 246)", // blue
    "rgb(16, 185, 129)", // green  
    "rgb(245, 158, 11)", // yellow
    "rgb(239, 68, 68)",  // red
    "rgb(139, 92, 246)", // purple
    "rgb(236, 72, 153)", // pink
    "rgb(20, 184, 166)", // teal
    "rgb(251, 146, 60)"  // orange
  ]

  const getColor = (index: number, customColor?: string) => {
    return customColor || colors[index % colors.length]
  }

  const renderBarChart = () => (
    <div className="flex items-end justify-between h-full gap-2 px-4 pb-4">
      {data.map((item, index) => {
        const barHeight = (item.value / maxValue) * (height - 60)
        const color = getColor(index, item.color)
        
        return (
          <motion.div
            key={index}
            className="flex flex-col items-center flex-1 group cursor-pointer"
            onMouseEnter={() => interactive && setHoveredIndex(index)}
            onMouseLeave={() => interactive && setHoveredIndex(null)}
            onClick={() => interactive && setSelectedIndex(index)}
            initial={animated ? { height: 0, opacity: 0 } : {}}
            animate={animated ? { height: barHeight, opacity: 1 } : { height: barHeight }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Tooltip */}
              <AnimatePresence>
                {showTooltip && hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-10"
                  >
                    <div className="font-medium">{item.label}</div>
                    <div className="text-gray-300">{item.value.toLocaleString()}</div>
                    {item.trend && (
                      <div className={cn(
                        "flex items-center gap-1 text-xs",
                        item.trend > 0 ? "text-green-400" : "text-red-400"
                      )}>
                        {item.trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(item.trend)}%
                      </div>
                    )}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Bar */}
              <div
                className={cn(
                  "w-full rounded-t-lg transition-all duration-200",
                  hoveredIndex === index && "shadow-lg scale-105",
                  selectedIndex === index && "ring-2 ring-blue-500 ring-offset-2"
                )}
                style={{
                  height: barHeight,
                  background: gradient 
                    ? `linear-gradient(to top, ${color}, ${color}80)`
                    : color,
                  minWidth: "24px"
                }}
              />
            </div>
            
            {/* Label */}
            <div className="mt-2 text-xs text-gray-600 text-center font-medium">
              {item.label}
            </div>
          </motion.div>
        )
      })}
    </div>
  )

  const renderLineChart = () => {
    const points = data.map((item, index) => ({
      x: (index / (data.length - 1)) * 100,
      y: 100 - ((item.value - minValue) / (maxValue - minValue)) * 80
    }))

    const pathData = points.reduce((path, point, index) => {
      const command = index === 0 ? 'M' : 'L'
      return `${path} ${command} ${point.x} ${point.y}`
    }, '')

    return (
      <div className="relative h-full p-4">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          {showGrid && (
            <g className="opacity-20">
              {[0, 25, 50, 75, 100].map(y => (
                <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="currentColor" strokeWidth="0.5" />
              ))}
            </g>
          )}
          
          {/* Area fill */}
          {gradient && (
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={colors[0]} stopOpacity="0.3" />
                <stop offset="100%" stopColor={colors[0]} stopOpacity="0.05" />
              </linearGradient>
            </defs>
          )}
          
          {gradient && (
            <motion.path
              d={`${pathData} L 100 100 L 0 100 Z`}
              fill="url(#areaGradient)"
              initial={animated ? { pathLength: 0 } : {}}
              animate={animated ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}
          
          {/* Line */}
          <motion.path
            d={pathData}
            fill="none"
            stroke={colors[0]}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={animated ? { pathLength: 0 } : {}}
            animate={animated ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Data points */}
          {points.map((point, index) => (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="2"
              fill={colors[0]}
              className="cursor-pointer hover:r-3 transition-all"
              onMouseEnter={() => interactive && setHoveredIndex(index)}
              onMouseLeave={() => interactive && setHoveredIndex(null)}
              initial={animated ? { scale: 0 } : {}}
              animate={animated ? { scale: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            />
          ))}
        </svg>
        
        {/* Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-gray-600">
          {data.map((item, index) => (
            <span key={index}>{item.label}</span>
          ))}
        </div>
      </div>
    )
  }

  const renderDonutChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0)
    let cumulativePercentage = 0
    
    const radius = 40
    const strokeWidth = 8
    const normalizedRadius = radius - strokeWidth * 2
    const circumference = normalizedRadius * 2 * Math.PI

    return (
      <div className="flex items-center justify-center h-full">
        <div className="relative">
          <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100
              const strokeDasharray = `${percentage * circumference / 100} ${circumference}`
              const strokeDashoffset = -cumulativePercentage * circumference / 100
              const color = getColor(index, item.color)
              
              cumulativePercentage += percentage
              
              return (
                <motion.circle
                  key={index}
                  stroke={color}
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  className="cursor-pointer hover:stroke-opacity-80 transition-all"
                  onMouseEnter={() => interactive && setHoveredIndex(index)}
                  onMouseLeave={() => interactive && setHoveredIndex(null)}
                  initial={animated ? { strokeDasharray: `0 ${circumference}` } : {}}
                  animate={animated ? { strokeDasharray } : {}}
                  transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                />
              )
            })}
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-2xl font-bold text-gray-900">{total.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>
        
        {/* Legend */}
        {showLegend && (
          <div className="ml-8 space-y-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getColor(index, item.color) }}
                />
                <span className="text-gray-700">{item.label}</span>
                <span className="text-gray-500">({((item.value / total) * 100).toFixed(1)}%)</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderChart = () => {
    switch (type) {
      case "line":
      case "area":
        return renderLineChart()
      case "donut":
        return renderDonutChart()
      case "sparkline":
        return renderLineChart()
      default:
        return renderBarChart()
    }
  }

  return (
    <div className={cn("bg-white rounded-xl border border-gray-200 shadow-sm", className)}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Download className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Export as PNG</DropdownMenuItem>
                <DropdownMenuItem>Export as SVG</DropdownMenuItem>
                <DropdownMenuItem>Export Data</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
      
      {/* Chart */}
      <div style={{ height: height }} className="relative">
        {renderChart()}
      </div>
    </div>
  )
}

export { AdvancedChart }
