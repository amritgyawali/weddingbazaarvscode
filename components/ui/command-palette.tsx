"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Search, 
  Command, 
  ArrowRight, 
  Clock, 
  Star, 
  Hash,
  User,
  Settings,
  FileText,
  BarChart3,
  Users,
  Building,
  DollarSign,
  MessageCircle,
  Server,
  Zap
} from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  icon?: React.ReactNode
  category?: string
  keywords?: string[]
  action?: () => void
  href?: string
  shortcut?: string[]
  recent?: boolean
  starred?: boolean
}

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items?: CommandItem[]
  placeholder?: string
  emptyMessage?: string
}

const defaultItems: CommandItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    subtitle: "View main dashboard",
    icon: <BarChart3 className="w-4 h-4" />,
    category: "Navigation",
    keywords: ["home", "overview", "main"],
    href: "/dashboard/admin",
    shortcut: ["⌘", "D"]
  },
  {
    id: "users",
    title: "User Management",
    subtitle: "Manage platform users",
    icon: <Users className="w-4 h-4" />,
    category: "Management",
    keywords: ["customers", "accounts", "people"],
    href: "/dashboard/admin/users",
    shortcut: ["⌘", "U"]
  },
  {
    id: "vendors",
    title: "Vendor Management",
    subtitle: "Manage service providers",
    icon: <Building className="w-4 h-4" />,
    category: "Management",
    keywords: ["providers", "services", "business"],
    href: "/dashboard/admin/vendors",
    shortcut: ["⌘", "V"]
  },
  {
    id: "analytics",
    title: "Analytics",
    subtitle: "View platform analytics",
    icon: <BarChart3 className="w-4 h-4" />,
    category: "Analytics",
    keywords: ["stats", "metrics", "data", "reports"],
    href: "/dashboard/admin/analytics",
    shortcut: ["⌘", "A"]
  },
  {
    id: "finance",
    title: "Finance",
    subtitle: "Financial management",
    icon: <DollarSign className="w-4 h-4" />,
    category: "Finance",
    keywords: ["money", "payments", "revenue", "transactions"],
    href: "/dashboard/admin/finance",
    shortcut: ["⌘", "F"]
  },
  {
    id: "support",
    title: "Support",
    subtitle: "Customer support center",
    icon: <MessageCircle className="w-4 h-4" />,
    category: "Support",
    keywords: ["help", "tickets", "customer service"],
    href: "/dashboard/admin/support",
    shortcut: ["⌘", "S"]
  },
  {
    id: "system",
    title: "System",
    subtitle: "System monitoring",
    icon: <Server className="w-4 h-4" />,
    category: "System",
    keywords: ["server", "monitoring", "infrastructure"],
    href: "/dashboard/admin/system",
    shortcut: ["⌘", "Y"]
  },
  {
    id: "settings",
    title: "Settings",
    subtitle: "Platform settings",
    icon: <Settings className="w-4 h-4" />,
    category: "Configuration",
    keywords: ["config", "preferences", "options"],
    href: "/dashboard/admin/settings",
    shortcut: ["⌘", ","]
  }
]

const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onOpenChange,
  items = defaultItems,
  placeholder = "Search for commands...",
  emptyMessage = "No results found."
}) => {
  const [query, setQuery] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [recentItems, setRecentItems] = React.useState<string[]>([])
  const [starredItems, setStarredItems] = React.useState<string[]>([])

  const filteredItems = React.useMemo(() => {
    if (!query) {
      // Show recent and starred items when no query
      const recent = items.filter(item => recentItems.includes(item.id))
      const starred = items.filter(item => starredItems.includes(item.id))
      return [...starred, ...recent].slice(0, 8)
    }

    return items.filter(item => {
      const searchText = `${item.title} ${item.subtitle} ${item.category} ${item.keywords?.join(" ")}`.toLowerCase()
      return searchText.includes(query.toLowerCase())
    })
  }, [query, items, recentItems, starredItems])

  const groupedItems = React.useMemo(() => {
    const groups: Record<string, CommandItem[]> = {}
    
    filteredItems.forEach(item => {
      const category = item.category || "Other"
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(item)
    })
    
    return groups
  }, [filteredItems])

  const handleSelect = (item: CommandItem) => {
    // Add to recent items
    setRecentItems(prev => {
      const updated = [item.id, ...prev.filter(id => id !== item.id)].slice(0, 5)
      return updated
    })

    if (item.action) {
      item.action()
    } else if (item.href) {
      window.location.href = item.href
    }
    
    onOpenChange(false)
    setQuery("")
    setSelectedIndex(0)
  }

  const toggleStar = (itemId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setStarredItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex])
        }
      } else if (e.key === "Escape") {
        onOpenChange(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, selectedIndex, filteredItems, onOpenChange])

  React.useEffect(() => {
    if (open) {
      setSelectedIndex(0)
    }
  }, [query, open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-2xl bg-white/95 backdrop-blur-xl border-gray-200/50 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="overflow-hidden"
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-200/50">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-0 outline-none text-lg placeholder-gray-400"
              autoFocus
            />
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">ESC</kbd>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p>{emptyMessage}</p>
              </div>
            ) : (
              <div className="p-2">
                {!query && (recentItems.length > 0 || starredItems.length > 0) && (
                  <div className="mb-4">
                    {starredItems.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <Star className="w-3 h-3" />
                          Starred
                        </div>
                      </div>
                    )}
                    {recentItems.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <Clock className="w-3 h-3" />
                          Recent
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {Object.entries(groupedItems).map(([category, categoryItems]) => (
                  <div key={category} className="mb-4 last:mb-0">
                    {query && (
                      <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <Hash className="w-3 h-3" />
                        {category}
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      {categoryItems.map((item, index) => {
                        const globalIndex = filteredItems.indexOf(item)
                        const isSelected = globalIndex === selectedIndex
                        const isStarred = starredItems.includes(item.id)
                        const isRecent = recentItems.includes(item.id)
                        
                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-150",
                              isSelected 
                                ? "bg-blue-50 border border-blue-200 shadow-sm" 
                                : "hover:bg-gray-50"
                            )}
                            onClick={() => handleSelect(item)}
                          >
                            {/* Icon */}
                            <div className={cn(
                              "flex items-center justify-center w-8 h-8 rounded-lg transition-colors",
                              isSelected ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                            )}>
                              {item.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900 truncate">
                                  {item.title}
                                </span>
                                {isRecent && (
                                  <Badge variant="secondary" className="text-xs">Recent</Badge>
                                )}
                              </div>
                              {item.subtitle && (
                                <p className="text-sm text-gray-500 truncate">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              {/* Star button */}
                              <button
                                onClick={(e) => toggleStar(item.id, e)}
                                className={cn(
                                  "p-1 rounded hover:bg-gray-200 transition-colors",
                                  isStarred ? "text-yellow-500" : "text-gray-400"
                                )}
                              >
                                <Star className={cn("w-4 h-4", isStarred && "fill-current")} />
                              </button>

                              {/* Shortcut */}
                              {item.shortcut && (
                                <div className="flex items-center gap-1">
                                  {item.shortcut.map((key, i) => (
                                    <kbd 
                                      key={i}
                                      className="px-2 py-1 bg-gray-100 rounded text-xs font-mono"
                                    >
                                      {key}
                                    </kbd>
                                  ))}
                                </div>
                              )}

                              {/* Arrow */}
                              <ArrowRight className="w-4 h-4 text-gray-400" />
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-3 border-t border-gray-200/50 bg-gray-50/50 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white rounded">↑↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white rounded">↵</kbd>
                <span>Select</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Command className="w-3 h-3" />
              <span>Command Palette</span>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

export { CommandPalette, type CommandItem }
