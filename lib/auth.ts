export type UserRole = 'customer' | 'vendor' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  isVerified?: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock user data for demonstration
export const mockUsers: Record<string, User> = {
  'customer@example.com': {
    id: '1',
    name: 'Priya Sharma',
    email: 'customer@example.com',
    role: 'customer',
    avatar: '/avatars/customer.jpg',
    isVerified: true,
  },
  'vendor@example.com': {
    id: '2',
    name: 'Rajesh Kumar',
    email: 'vendor@example.com',
    role: 'vendor',
    avatar: '/avatars/vendor.jpg',
    isVerified: true,
  },
  'admin@example.com': {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: '/avatars/admin.jpg',
    isVerified: true,
  },
}

// Authentication functions
export const login = async (email: string, password: string): Promise<User | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock authentication logic
  const user = mockUsers[email]
  if (user && password === 'password') {
    // Store auth state in localStorage (in production, use secure cookies/JWT)
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userRole', user.role)
    localStorage.setItem('user', JSON.stringify(user))
    
    // Set cookies for middleware
    document.cookie = `isAuthenticated=true; path=/`
    document.cookie = `userRole=${user.role}; path=/`
    
    return user
  }
  
  return null
}

export const logout = (): void => {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('userRole')
  localStorage.removeItem('user')

  // Clear cookies
  document.cookie = 'isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
  document.cookie = 'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
}

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null
  
  const userStr = localStorage.getItem('user')
  if (userStr) {
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }
  return null
}

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('isAuthenticated') === 'true'
}

export const getUserRole = (): UserRole | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('userRole') as UserRole | null
}

// Role-based route helpers
export const getDashboardRoute = (role: UserRole): string => {
  return `/dashboard/${role}`
}

export const getMenuItemsForRole = (role: UserRole) => {
  switch (role) {
    case 'customer':
      return [
        { label: "Dashboard", href: "/dashboard/customer", icon: "TrendingUp" },
        { label: "Wedding Details", href: "/dashboard/customer/wedding", icon: "Heart" },
        { label: "Budget", href: "/dashboard/customer/budget", icon: "DollarSign" },
        { label: "Vendors", href: "/dashboard/customer/vendors", icon: "Users" },
        { label: "Guest List", href: "/dashboard/customer/guests", icon: "Users" },
        { label: "Timeline", href: "/dashboard/customer/timeline", icon: "Calendar" },
        { label: "Documents", href: "/dashboard/customer/documents", icon: "FileText" },
        { label: "Messages", href: "/dashboard/customer/messages", icon: "MessageCircle" },
      ]
    
    case 'vendor':
      return [
        { label: "Dashboard", href: "/dashboard/vendor", icon: "TrendingUp" },
        { label: "Bookings", href: "/dashboard/vendor/bookings", icon: "Calendar" },
        { label: "Inquiries", href: "/dashboard/vendor/inquiries", icon: "MessageCircle" },
        { label: "Portfolio", href: "/dashboard/vendor/portfolio", icon: "Camera" },
        { label: "Analytics", href: "/dashboard/vendor/analytics", icon: "BarChart3" },
        { label: "Payments", href: "/dashboard/vendor/payments", icon: "DollarSign" },
        { label: "Reviews", href: "/dashboard/vendor/reviews", icon: "Star" },
        { label: "Profile", href: "/dashboard/vendor/profile", icon: "Settings" },
      ]
    
    case 'admin':
      return [
        { label: "Dashboard", href: "/dashboard/admin", icon: "TrendingUp" },
        { label: "Users", href: "/dashboard/admin/users", icon: "Users" },
        { label: "Vendors", href: "/dashboard/admin/vendors", icon: "Building" },
        { label: "Analytics", href: "/dashboard/admin/analytics", icon: "BarChart3" },
        { label: "Finance", href: "/dashboard/admin/finance", icon: "DollarSign" },
        { label: "Support", href: "/dashboard/admin/support", icon: "MessageCircle" },
        { label: "System", href: "/dashboard/admin/system", icon: "Server" },
        { label: "Settings", href: "/dashboard/admin/settings", icon: "Settings" },
      ]
    
    default:
      return []
  }
}

// Permission helpers
export const hasPermission = (userRole: UserRole, requiredRole: UserRole | UserRole[]): boolean => {
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole)
  }
  return userRole === requiredRole
}

export const canAccessAdminFeatures = (userRole: UserRole): boolean => {
  return userRole === 'admin'
}

export const canManageVendors = (userRole: UserRole): boolean => {
  return ['admin'].includes(userRole)
}

export const canViewAnalytics = (userRole: UserRole): boolean => {
  return ['admin', 'vendor'].includes(userRole)
}

// Demo login function for testing
export const demoLogin = (role: UserRole): void => {
  const demoEmails = {
    customer: 'customer@example.com',
    vendor: 'vendor@example.com',
    admin: 'admin@example.com',
  }
  
  const email = demoEmails[role]
  const user = mockUsers[email]
  
  if (user) {
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userRole', user.role)
    localStorage.setItem('user', JSON.stringify(user))
    
    document.cookie = `isAuthenticated=true; path=/`
    document.cookie = `userRole=${user.role}; path=/`
  }
}
