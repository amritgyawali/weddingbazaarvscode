"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Get user role from localStorage or your auth system
    const userRole = localStorage.getItem("userRole") || "customer"
    const isAuthenticated = localStorage.getItem("isAuthenticated")

    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }

    // Redirect to appropriate dashboard based on role
    switch (userRole.toLowerCase()) {
      case "customer":
        router.replace("/dashboard/customer")
        break
      case "vendor":
        router.replace("/dashboard/vendor")
        break
      case "admin":
        router.replace("/dashboard/admin")
        break
      default:
        router.replace("/dashboard/customer")
    }
  }, [router])

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}
