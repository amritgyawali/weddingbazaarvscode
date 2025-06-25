"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Bell, ChevronDown, Heart, LogOut, Menu, Search, Settings, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface MenuItem {
  label: string
  href: string
  icon: React.ReactNode
  active?: boolean
}

interface DashboardLayoutProps {
  children: React.ReactNode
  menuItems: MenuItem[]
  userRole: "customer" | "vendor" | "admin"
}

export function DashboardLayout({ children, menuItems, userRole }: DashboardLayoutProps) {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("isAuthenticated")
    router.push("/auth/login")
  }

  const handleRoleSwitch = (role: "customer" | "vendor" | "admin") => {
    localStorage.setItem("userRole", role)
    router.refresh()
  }

  const getUserInfo = () => {
    switch (userRole) {
      case "customer":
        return {
          name: "Priya Sharma",
          email: "priya@example.com",
          avatar: "/placeholder.svg?height=40&width=40",
          roleLabel: "Customer",
          roleColor: "bg-pink-100 text-pink-800",
        }
      case "vendor":
        return {
          name: "Capture Moments Studio",
          email: "studio@example.com",
          avatar: "/placeholder.svg?height=40&width=40",
          roleLabel: "Vendor",
          roleColor: "bg-blue-100 text-blue-800",
        }
      case "admin":
        return {
          name: "Admin User",
          email: "admin@weddingbazaar.com",
          avatar: "/placeholder.svg?height=40&width=40",
          roleLabel: "Admin",
          roleColor: "bg-purple-100 text-purple-800",
        }
    }
  }

  const userInfo = getUserInfo()

  const Sidebar = ({ className = "" }: { className?: string }) => (
    <div className={`flex flex-col h-full bg-white border-r ${className}`}>
      {/* Logo */}
      <div className="p-6 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            WeddingBazaar
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                item.active
                  ? "bg-pink-50 text-pink-700 border border-pink-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={userInfo.avatar || "/placeholder.svg"} />
            <AvatarFallback>{userInfo.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{userInfo.name}</p>
            <Badge className={`text-xs ${userInfo.roleColor}`}>{userInfo.roleLabel}</Badge>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <header className="bg-white border-b px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
              </Sheet>

              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={userInfo.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{userInfo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">{userInfo.name}</p>
                      <p className="text-xs text-gray-500">{userInfo.roleLabel}</p>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Switch Role (Demo)</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleRoleSwitch("customer")}>Switch to Customer</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRoleSwitch("vendor")}>Switch to Vendor</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRoleSwitch("admin")}>Switch to Admin</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
