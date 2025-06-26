"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Bell, 
  X, 
  Check, 
  AlertTriangle, 
  Info, 
  AlertCircle,
  Clock,
  User,
  DollarSign,
  MessageCircle,
  Settings,
  Zap,
  Star,
  Heart,
  TrendingUp,
  Calendar,
  FileText,
  Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"

interface Notification {
  id: string
  type: "success" | "error" | "warning" | "info" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
  category?: string
  priority?: "low" | "medium" | "high" | "urgent"
  actionUrl?: string
  actionLabel?: string
  avatar?: string
  metadata?: Record<string, any>
}

interface NotificationSystemProps {
  notifications?: Notification[]
  onNotificationRead?: (id: string) => void
  onNotificationDismiss?: (id: string) => void
  onMarkAllRead?: () => void
  onClearAll?: () => void
  maxVisible?: number
}

const defaultNotifications: Notification[] = [
  {
    id: "1",
    type: "system",
    title: "System Update",
    message: "Platform maintenance scheduled for tonight at 2:00 AM",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    category: "System",
    priority: "high"
  },
  {
    id: "2", 
    type: "success",
    title: "Payment Received",
    message: "₹15,000 commission payment from Capture Moments Studio",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
    category: "Finance",
    priority: "medium",
    actionUrl: "/dashboard/admin/finance",
    actionLabel: "View Details"
  },
  {
    id: "3",
    type: "warning",
    title: "High Server Load",
    message: "CPU usage at 85%. Consider scaling resources.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: true,
    category: "System",
    priority: "high"
  },
  {
    id: "4",
    type: "info",
    title: "New Vendor Registration",
    message: "Royal Palace Hotel has submitted verification documents",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    category: "Vendors",
    priority: "medium",
    avatar: "/avatars/vendor.jpg"
  }
]

const getNotificationIcon = (type: string, category?: string) => {
  if (category) {
    switch (category.toLowerCase()) {
      case "finance":
        return <DollarSign className="w-4 h-4" />
      case "system":
        return <Settings className="w-4 h-4" />
      case "users":
        return <User className="w-4 h-4" />
      case "vendors":
        return <Star className="w-4 h-4" />
      case "support":
        return <MessageCircle className="w-4 h-4" />
      default:
        break
    }
  }

  switch (type) {
    case "success":
      return <Check className="w-4 h-4" />
    case "error":
      return <AlertCircle className="w-4 h-4" />
    case "warning":
      return <AlertTriangle className="w-4 h-4" />
    case "info":
      return <Info className="w-4 h-4" />
    default:
      return <Bell className="w-4 h-4" />
  }
}

const getNotificationColor = (type: string, priority?: string) => {
  if (priority === "urgent") {
    return "bg-red-500 text-white"
  }
  
  switch (type) {
    case "success":
      return "bg-green-100 text-green-700 border-green-200"
    case "error":
      return "bg-red-100 text-red-700 border-red-200"
    case "warning":
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    case "info":
      return "bg-blue-100 text-blue-700 border-blue-200"
    case "system":
      return "bg-purple-100 text-purple-700 border-purple-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case "urgent":
      return "bg-red-500"
    case "high":
      return "bg-orange-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-green-500"
    default:
      return "bg-gray-400"
  }
}

const formatTimestamp = (timestamp: Date) => {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return timestamp.toLocaleDateString()
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notifications = defaultNotifications,
  onNotificationRead,
  onNotificationDismiss,
  onMarkAllRead,
  onClearAll,
  maxVisible = 5
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const unreadCount = notifications.filter(n => !n.read).length
  const visibleNotifications = notifications.slice(0, maxVisible)

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read && onNotificationRead) {
      onNotificationRead(notification.id)
    }
    
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl
    }
  }

  const handleDismiss = (id: string, event: React.MouseEvent) => {
    event.stopPropagation()
    if (onNotificationDismiss) {
      onNotificationDismiss(id)
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative h-9 w-9 p-0 hover:bg-gray-100"
        >
          <Bell className="h-5 w-5" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center"
              >
                <span className="text-xs font-medium text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-96 p-0 bg-white/95 backdrop-blur-xl border-gray-200/50 shadow-2xl"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200/50">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              {unreadCount > 0 && onMarkAllRead && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={onMarkAllRead}
                  className="text-xs h-7 px-2"
                >
                  Mark all read
                </Button>
              )}
              {onClearAll && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={onClearAll}
                  className="text-xs h-7 px-2 text-red-600 hover:text-red-700"
                >
                  Clear all
                </Button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <ScrollArea className="max-h-96">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No notifications</p>
              </div>
            ) : (
              <div className="p-2">
                <AnimatePresence>
                  {visibleNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className={cn(
                        "relative group cursor-pointer rounded-lg p-3 mb-2 border transition-all duration-200",
                        notification.read 
                          ? "bg-gray-50/50 border-gray-100 hover:bg-gray-100/50" 
                          : "bg-white border-gray-200 hover:shadow-md hover:border-gray-300",
                        getNotificationColor(notification.type, notification.priority)
                      )}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      {/* Priority Indicator */}
                      {notification.priority && (
                        <div 
                          className={cn(
                            "absolute left-0 top-0 bottom-0 w-1 rounded-l-lg",
                            getPriorityColor(notification.priority)
                          )}
                        />
                      )}

                      <div className="flex items-start gap-3">
                        {/* Icon/Avatar */}
                        <div className="flex-shrink-0 mt-0.5">
                          {notification.avatar ? (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={notification.avatar} />
                              <AvatarFallback>
                                {getNotificationIcon(notification.type, notification.category)}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              getNotificationColor(notification.type, notification.priority)
                            )}>
                              {getNotificationIcon(notification.type, notification.category)}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <h4 className={cn(
                                "font-medium text-sm leading-tight",
                                notification.read ? "text-gray-600" : "text-gray-900"
                              )}>
                                {notification.title}
                              </h4>
                              <p className={cn(
                                "text-sm mt-1 leading-relaxed",
                                notification.read ? "text-gray-500" : "text-gray-700"
                              )}>
                                {notification.message}
                              </p>
                            </div>

                            {/* Dismiss Button */}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 hover:bg-gray-200"
                              onClick={(e) => handleDismiss(notification.id, e)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              {notification.category && (
                                <Badge variant="outline" className="text-xs">
                                  {notification.category}
                                </Badge>
                              )}
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                {formatTimestamp(notification.timestamp)}
                              </div>
                            </div>

                            {notification.actionLabel && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-6 text-xs px-2"
                              >
                                {notification.actionLabel}
                              </Button>
                            )}
                          </div>

                          {/* Unread Indicator */}
                          {!notification.read && (
                            <div className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </ScrollArea>

          {/* Footer */}
          {notifications.length > maxVisible && (
            <div className="p-3 border-t border-gray-200/50 bg-gray-50/50">
              <Button 
                variant="ghost" 
                className="w-full text-sm text-gray-600 hover:text-gray-900"
              >
                View all {notifications.length} notifications
              </Button>
            </div>
          )}
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { NotificationSystem, type Notification }
