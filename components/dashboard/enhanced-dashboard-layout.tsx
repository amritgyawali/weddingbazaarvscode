"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CommandPalette } from "@/components/ui/command-palette"
import { NotificationSystem } from "@/components/ui/notification-system"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  LogOut,
  Menu,
  Settings,
  User,
  Bell,
  Search,
  ChevronDown,
  Home,
  Command,
  Moon,
  Sun,
  Maximize,
  Minimize,
  Zap,
  HelpCircle,
  Keyboard,
  Palette,
  Globe,
  Shield,
  Activity,
  Clock,
  Star,
  Bookmark,
  Heart,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

interface MenuItem {
  label: string
  href: string
  icon: React.ReactNode
  active?: boolean
  badge?: string | number
  shortcut?: string[]
}

interface EnhancedDashboardLayoutProps {
  children: React.ReactNode
  menuItems: MenuItem[]
  userRole: "customer" | "vendor" | "admin"
}

export function EnhancedDashboardLayout({ children, menuItems, userRole }: EnhancedDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const router = useRouter()

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setCommandPaletteOpen(true)
      }
      
      // Toggle sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault()
        setSidebarCollapsed(!sidebarCollapsed)
      }
      
      // Toggle theme
      if ((e.metaKey || e.ctrlKey) && e.key === "j") {
        e.preventDefault()
        setTheme(theme === "light" ? "dark" : "light")
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [sidebarCollapsed, theme])

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("authToken")
    router.push("/")
  }

  const getUserDisplayName = () => {
    switch (userRole) {
      case "admin":
        return "Admin User"
      case "vendor":
        return "Vendor User"
      case "customer":
        return "Customer User"
      default:
        return "User"
    }
  }

  const getUserInitials = () => {
    const name = getUserDisplayName()
    return name.split(" ").map(n => n[0]).join("")
  }

  const sidebarWidth = sidebarCollapsed ? "w-16" : "w-72"
  const sidebarPadding = sidebarCollapsed ? "lg:pl-16" : "lg:pl-72"

  return (
    <div className={cn("min-h-screen transition-colors duration-300", 
      theme === "dark" ? "bg-gray-900" : "bg-gray-50"
    )}>
      {/* Command Palette */}
      <CommandPalette 
        open={commandPaletteOpen} 
        onOpenChange={setCommandPaletteOpen}
      />

      {/* Desktop Sidebar */}
      <motion.div 
        className={cn("hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300", sidebarWidth)}
        animate={{ width: sidebarCollapsed ? 64 : 288 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className={cn(
          "flex grow flex-col gap-y-5 overflow-y-auto shadow-xl border-r transition-colors duration-300",
          theme === "dark" 
            ? "bg-gray-800 border-gray-700" 
            : "bg-white border-gray-200"
        )}>
          {/* Logo & Collapse Button */}
          <div className="flex h-16 shrink-0 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className={cn("text-xl font-bold whitespace-nowrap overflow-hidden",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}
                  >
                    Wedding Bazaar
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={cn("h-8 w-8 p-0 hidden lg:flex",
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
              )}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Quick Stats */}
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4"
              >
                <div className={cn(
                  "p-4 rounded-xl border transition-colors duration-200",
                  theme === "dark" 
                    ? "bg-gray-700 border-gray-600" 
                    : "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100"
                )}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn("text-sm font-medium",
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    )}>
                      System Status
                    </span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  <div className="text-xs text-green-600 font-medium">All systems operational</div>
                  <div className={cn("text-xs mt-1",
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  )}>
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col px-4">
            <ul role="list" className="flex flex-1 flex-col gap-y-1">
              {menuItems.map((item, index) => (
                <motion.li 
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-x-3 rounded-xl p-3 text-sm font-medium transition-all duration-200 relative",
                      item.active
                        ? theme === "dark"
                          ? "bg-gray-700 text-white shadow-lg"
                          : "bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-600 shadow-sm border border-indigo-100"
                        : theme === "dark"
                          ? "text-gray-300 hover:text-white hover:bg-gray-700"
                          : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                      sidebarCollapsed && "justify-center"
                    )}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <div className={cn(
                      "flex items-center justify-center transition-transform duration-200",
                      item.active && "scale-110"
                    )}>
                      {item.icon}
                    </div>
                    
                    <AnimatePresence>
                      {!sidebarCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="flex items-center justify-between flex-1 overflow-hidden"
                        >
                          <span className="whitespace-nowrap">{item.label}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Active indicator */}
                    {item.active && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-r-full"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Sidebar Footer */}
            <div className="mt-auto pb-4">
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    {/* Quick Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCommandPaletteOpen(true)}
                        className={cn("flex-1 text-xs",
                          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        )}
                      >
                        <Command className="w-3 h-3 mr-1" />
                        ⌘K
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className={cn("flex-1 text-xs",
                          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        )}
                      >
                        {theme === "light" ? (
                          <Moon className="w-3 h-3 mr-1" />
                        ) : (
                          <Sun className="w-3 h-3 mr-1" />
                        )}
                        Theme
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <div className={cn(
            "flex grow flex-col gap-y-5 overflow-y-auto h-full",
            theme === "dark" ? "bg-gray-800" : "bg-white"
          )}>
            <div className="flex h-16 shrink-0 items-center px-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className={cn("text-xl font-bold",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Wedding Bazaar
                </span>
              </Link>
            </div>
            <nav className="flex flex-1 flex-col px-4">
              <ul role="list" className="flex flex-1 flex-col gap-y-1">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-x-3 rounded-xl p-3 text-sm font-medium transition-all duration-200",
                        item.active
                          ? theme === "dark"
                            ? "bg-gray-700 text-white"
                            : "bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-600 border border-indigo-100"
                          : theme === "dark"
                            ? "text-gray-300 hover:text-white hover:bg-gray-700"
                            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Header */}
      <div className={sidebarPadding}>
        <motion.div
          className={cn(
            "sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 transition-colors duration-300",
            theme === "dark"
              ? "bg-gray-800/95 backdrop-blur-xl border-gray-700"
              : "bg-white/95 backdrop-blur-xl border-gray-200"
          )}
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Home className="w-4 h-4" />
            <span>/</span>
            <span className="capitalize">{userRole}</span>
            <span>/</span>
            <span>Dashboard</span>
          </div>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-3 lg:gap-x-4">
              {/* Search */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCommandPaletteOpen(true)}
                className="relative group"
              >
                <Search className="h-5 w-5" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Search (⌘K)
                </span>
              </Button>

              {/* Notifications */}
              <NotificationSystem />

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="relative group"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Toggle theme (⌘J)
                </span>
              </Button>

              {/* Profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{getUserDisplayName()}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userRole}@weddingbazaar.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Keyboard className="mr-2 h-4 w-4" />
                    <span>Keyboard shortcuts</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main content */}
      <div className={sidebarPadding}>
        <motion.main
          className="py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  )
}
