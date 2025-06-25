"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CustomerDashboard } from "@/components/dashboard/customer-dashboard"
import { VendorDashboard } from "@/components/dashboard/vendor-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { LoadingSkeleton } from "@/components/ui/loading-skeleton"

type UserRole = "customer" | "vendor" | "admin" | null

export default function DashboardPage() {
  const router = useRouter()
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for user role from localStorage or session
    const role = localStorage.getItem("userRole") as UserRole
    const isAuthenticated = localStorage.getItem("isAuthenticated")

    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }

    setUserRole(role)
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (!userRole) {
    router.push("/auth/login")
    return null
  }

  switch (userRole) {
    case "customer":
      return <CustomerDashboard />
    case "vendor":
      return <VendorDashboard />
    case "admin":
      return <AdminDashboard />
    default:
      router.push("/auth/login")
      return null
  }
}
