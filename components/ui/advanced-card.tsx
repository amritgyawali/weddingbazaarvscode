"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, MoreHorizontal, Maximize2, Minimize2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

interface AdvancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "glass" | "gradient"
  size?: "sm" | "md" | "lg" | "xl"
  interactive?: boolean
  collapsible?: boolean
  expandable?: boolean
  refreshable?: boolean
  loading?: boolean
  children: React.ReactNode
}

interface AdvancedCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  actions?: React.ReactNode
  subtitle?: string
  badge?: React.ReactNode
}

interface AdvancedCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg"
}

const cardVariants = {
  default: "bg-white border border-gray-200 shadow-sm",
  elevated: "bg-white border-0 shadow-lg shadow-gray-100/50",
  outlined: "bg-white border-2 border-gray-200 shadow-none",
  glass: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl",
  gradient: "bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-md"
}

const sizeVariants = {
  sm: "rounded-lg",
  md: "rounded-xl", 
  lg: "rounded-2xl",
  xl: "rounded-3xl"
}

const AdvancedCard = React.forwardRef<HTMLDivElement, AdvancedCardProps>(
  ({ 
    className, 
    variant = "default", 
    size = "md",
    interactive = false,
    collapsible = false,
    expandable = false,
    refreshable = false,
    loading = false,
    children,
    ...props 
  }, ref) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false)
    const [isExpanded, setIsExpanded] = React.useState(false)
    const [isRefreshing, setIsRefreshing] = React.useState(false)

    const handleRefresh = () => {
      setIsRefreshing(true)
      setTimeout(() => setIsRefreshing(false), 1000)
    }

    const cardContent = (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          cardVariants[variant],
          sizeVariants[size],
          interactive && "hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 cursor-pointer",
          isExpanded && "fixed inset-4 z-50 max-w-none max-h-none",
          className
        )}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        )}
        
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card Controls */}
        {(collapsible || expandable || refreshable) && (
          <div className="absolute top-4 right-4 flex gap-1">
            {refreshable && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-gray-100"
                onClick={handleRefresh}
              >
                <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
              </Button>
            )}
            {expandable && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-gray-100"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            )}
            {collapsible && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-gray-100"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isCollapsed && "rotate-180"
                  )} 
                />
              </Button>
            )}
          </div>
        )}
      </div>
    )

    if (isExpanded) {
      return (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsExpanded(false)} />
          {cardContent}
        </>
      )
    }

    return cardContent
  }
)
AdvancedCard.displayName = "AdvancedCard"

const AdvancedCardHeader = React.forwardRef<HTMLDivElement, AdvancedCardHeaderProps>(
  ({ className, children, actions, subtitle, badge, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6 pb-4", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              {children}
              {badge}
            </div>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
)
AdvancedCardHeader.displayName = "AdvancedCardHeader"

const AdvancedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
AdvancedCardTitle.displayName = "AdvancedCardTitle"

const AdvancedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600", className)}
    {...props}
  />
))
AdvancedCardDescription.displayName = "AdvancedCardDescription"

const AdvancedCardContent = React.forwardRef<HTMLDivElement, AdvancedCardContentProps>(
  ({ className, padding = "md", ...props }, ref) => {
    const paddingVariants = {
      none: "",
      sm: "p-3",
      md: "p-6 pt-0",
      lg: "p-8 pt-0"
    }

    return (
      <div 
        ref={ref} 
        className={cn(paddingVariants[padding], className)} 
        {...props} 
      />
    )
  }
)
AdvancedCardContent.displayName = "AdvancedCardContent"

const AdvancedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
AdvancedCardFooter.displayName = "AdvancedCardFooter"

export { 
  AdvancedCard, 
  AdvancedCardHeader, 
  AdvancedCardFooter, 
  AdvancedCardTitle, 
  AdvancedCardDescription, 
  AdvancedCardContent 
}
