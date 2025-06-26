"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  Heart,
  Calendar as CalendarIcon,
  Users,
  DollarSign,
  MapPin,
  Clock,
  CheckCircle2,
  Plus,
  Edit,
  Trash2,
  Save,
  Download,
  Upload,
  Star,
  Gift,
  Camera,
  Music,
  Utensils,
  Car,
  Flower,
  Shirt,
  Home,
  ArrowLeft,
  Settings,
  FileText,
  PlusCircle,
  Sparkles,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  List,
  Grid,
  Filter,
  Search,
  RefreshCw,
  Share2,
  BookOpen,
  Lightbulb,
  Zap,
  Circle,
  CheckCircle,
  Crown,
  Gem,
  Menu,
  X,
  Bell,
  ChevronDown,
  ChevronRight,
  Info,
  AlertCircle,
  Lightbulb,
  Bookmark,
  Flag,
  Archive,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Shield,
  Award,
  Briefcase,
  Building,
  Navigation,
  Compass,
  Route,
  Timer,
  Stopwatch,
  AlarmClock,
  CalendarPlus,
  CalendarX,
  CalendarClock,
  MessageCircle,
  Phone,
  Mail,
  Globe
} from "lucide-react"
import Link from "next/link"

interface WeddingData {
  basicInfo: {
    brideName: string
    groomName: string
    weddingDate: Date | null
    venue: string
    guestCount: number
    budget: number
    theme: string
    style: string
  }
  budget: {
    totalBudget: number
    allocated: { category: string; amount: number; spent: number }[]
  }
  guests: {
    id: string
    name: string
    email: string
    phone: string
    category: string
    rsvpStatus: string
    plusOne: boolean
  }[]
  timeline: {
    id: string
    task: string
    category: string
    dueDate: Date | null
    completed: boolean
    priority: string
  }[]
  vendors: {
    id: string
    category: string
    name: string
    contact: string
    cost: number
    status: string
    notes: string
  }[]
}

const defaultWeddingData: WeddingData = {
  basicInfo: {
    brideName: "",
    groomName: "",
    weddingDate: null,
    venue: "",
    guestCount: 0,
    budget: 0,
    theme: "",
    style: ""
  },
  budget: {
    totalBudget: 0,
    allocated: [
      { category: "Venue", amount: 0, spent: 0 },
      { category: "Photography", amount: 0, spent: 0 },
      { category: "Catering", amount: 0, spent: 0 },
      { category: "Decorations", amount: 0, spent: 0 },
      { category: "Music/DJ", amount: 0, spent: 0 },
      { category: "Transportation", amount: 0, spent: 0 },
      { category: "Attire", amount: 0, spent: 0 },
      { category: "Miscellaneous", amount: 0, spent: 0 }
    ]
  },
  guests: [],
  timeline: [],
  vendors: []
}

const weddingTemplates = [
  {
    id: "traditional",
    name: "Traditional Indian Wedding",
    description: "Classic Indian wedding with traditional ceremonies",
    theme: "Traditional",
    style: "Grand",
    estimatedBudget: 1500000,
    guestCount: 300,
    duration: "3 days",
    icon: <Crown className="w-6 h-6" />,
    color: "from-orange-400 to-red-500"
  },
  {
    id: "modern",
    name: "Modern Minimalist",
    description: "Contemporary wedding with clean, elegant design",
    theme: "Minimalist",
    style: "Modern",
    estimatedBudget: 800000,
    guestCount: 150,
    duration: "1 day",
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-blue-400 to-purple-500"
  },
  {
    id: "destination",
    name: "Destination Wedding",
    description: "Intimate wedding at a beautiful destination",
    theme: "Tropical",
    style: "Intimate",
    estimatedBudget: 1200000,
    guestCount: 100,
    duration: "2 days",
    icon: <MapPin className="w-6 h-6" />,
    color: "from-green-400 to-teal-500"
  },
  {
    id: "royal",
    name: "Royal Palace Wedding",
    description: "Luxurious wedding with royal treatment",
    theme: "Royal",
    style: "Luxury",
    estimatedBudget: 2500000,
    guestCount: 500,
    duration: "3 days",
    icon: <Gem className="w-6 h-6" />,
    color: "from-purple-400 to-pink-500"
  }
]

export default function PlanningToolPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [weddingData, setWeddingData] = useState<WeddingData>(defaultWeddingData)
  const [showTemplates, setShowTemplates] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("date")
  const [filterBy, setFilterBy] = useState("all")

  // Enhanced scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate completion percentage
  const completionPercentage = () => {
    let completed = 0
    let total = 8

    if (weddingData.basicInfo.brideName) completed++
    if (weddingData.basicInfo.groomName) completed++
    if (weddingData.basicInfo.weddingDate) completed++
    if (weddingData.basicInfo.venue) completed++
    if (weddingData.basicInfo.budget > 0) completed++
    if (weddingData.guests.length > 0) completed++
    if (weddingData.timeline.length > 0) completed++
    if (weddingData.vendors.length > 0) completed++

    return Math.round((completed / total) * 100)
  }

  const handleTemplateSelect = (templateId: string) => {
    const template = weddingTemplates.find(t => t.id === templateId)
    if (template) {
      setWeddingData(prev => ({
        ...prev,
        basicInfo: {
          ...prev.basicInfo,
          theme: template.theme,
          style: template.style,
          budget: template.estimatedBudget,
          guestCount: template.guestCount
        },
        budget: {
          ...prev.budget,
          totalBudget: template.estimatedBudget
        }
      }))
      setSelectedTemplate(templateId)
      setShowTemplates(false)
      setHasUnsavedChanges(true)
    }
  }

  const handleStartFromScratch = () => {
    setWeddingData(defaultWeddingData)
    setSelectedTemplate(null)
    setShowTemplates(false)
    setIsEditing(true)
  }

  const handleSave = () => {
    localStorage.setItem('weddingPlanningData', JSON.stringify(weddingData))
    setHasUnsavedChanges(false)
    setIsEditing(false)
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(weddingData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'wedding-plan.json'
    link.click()
  }

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('weddingPlanningData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setWeddingData(parsedData)
        setShowTemplates(false)
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }, [])

  if (showTemplates) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        {/* Enhanced Header with Navigation */}
        <header
          className={`fixed top-0 w-full z-50 transition-all duration-500 ${
            isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-white/20" : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Link href="/" className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                      WeddingBazaar
                    </span>
                  </Link>
                </div>
              </div>

              <nav className="hidden lg:block">
                <div className="flex items-center space-x-8">
                  {[
                    { name: "Home", href: "/" },
                    { name: "Vendors", href: "/vendors" },
                    { name: "Real Weddings", href: "/real-weddings" },
                    { name: "Blog", href: "/blog" },
                    { name: "E-Invites", href: "/e-invites" },
                    { name: "Planning Tool", href: "/planning-tool", active: true },
                  ].map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-pink-600 group ${
                        item.active ? "text-pink-600" : isScrolled ? "text-gray-700" : "text-white"
                      }`}
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  ))}
                </div>
              </nav>

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`hidden sm:inline-flex transition-all duration-300 ${
                    isScrolled ? "text-gray-700 hover:text-pink-600" : "text-white hover:text-pink-200"
                  }`}
                  onClick={() => router.push("/auth/login")}
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => router.push("/auth/signup")}
                >
                  Sign Up
                </Button>
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 ${
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden bg-white/95 backdrop-blur-lg border-t border-white/20`}
          >
            <div className="px-4 py-6 space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "Vendors", href: "/vendors" },
                { name: "Real Weddings", href: "/real-weddings" },
                { name: "Blog", href: "/blog" },
                { name: "E-Invites", href: "/e-invites" },
                { name: "Planning Tool", href: "/planning-tool", active: true },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block transition-colors ${
                    item.active ? "text-pink-600 font-medium" : "text-gray-700 hover:text-pink-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 pt-32">
          {/* Enhanced Header Content */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Wedding Planning Tool
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create your perfect wedding plan with our advanced planning tools and beautiful templates
            </p>
          </div>

          {/* Template Selection */}
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Start from Scratch Option */}
            <Card className="border-2 border-dashed border-gray-300 hover:border-pink-400 transition-colors cursor-pointer group">
              <CardContent className="p-8 text-center" onClick={handleStartFromScratch}>
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <PlusCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Start from Scratch</h3>
                <p className="text-gray-600">Create your wedding plan with completely blank forms</p>
              </CardContent>
            </Card>

            {/* Template Options */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Choose a Template
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {weddingTemplates.map((template, index) => (
                  <div
                    key={template.id}
                    className="animate-in fade-in duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-pink-300">
                      <CardContent className="p-6" onClick={() => handleTemplateSelect(template.id)}>
                        <div className="text-center">
                          <div className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                            <div className="text-white">{template.icon}</div>
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                          <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Budget:</span>
                              <span className="font-medium">₹{(template.estimatedBudget / 100000).toFixed(1)}L</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Guests:</span>
                              <span className="font-medium">{template.guestCount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Duration:</span>
                              <span className="font-medium">{template.duration}</span>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <Badge variant="outline">{template.theme}</Badge>
                            <Badge variant="outline">{template.style}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Enhanced Header with Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-white/20" : "bg-white/90 backdrop-blur-sm shadow-sm border-b"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    WeddingBazaar
                  </span>
                </Link>
              </div>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-semibold text-gray-900">Wedding Planner</h1>
                {selectedTemplate && (
                  <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                    {weddingTemplates.find(t => t.id === selectedTemplate)?.name}
                  </Badge>
                )}
              </div>
            </div>

            <nav className="hidden lg:block">
              <div className="flex items-center space-x-8">
                {[
                  { name: "Home", href: "/" },
                  { name: "Vendors", href: "/vendors" },
                  { name: "Real Weddings", href: "/real-weddings" },
                  { name: "Blog", href: "/blog" },
                  { name: "E-Invites", href: "/e-invites" },
                  { name: "Planning Tool", href: "/planning-tool", active: true },
                ].map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-pink-600 group ${
                      item.active ? "text-pink-600" : "text-gray-700"
                    }`}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>
            </nav>

            <div className="flex items-center space-x-4">
              {hasUnsavedChanges && (
                <Badge variant="destructive" className="animate-pulse">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Unsaved Changes
                </Badge>
              )}
              <Button variant="outline" size="sm" onClick={() => setShowTemplates(true)}>
                <FileText className="w-4 h-4 mr-2" />
                Templates
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm" onClick={handleSave} className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Save className="w-4 h-4 mr-2" />
                Save Plan
              </Button>
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden bg-white/95 backdrop-blur-lg border-t border-white/20`}
        >
          <div className="px-4 py-6 space-y-4">
            {[
              { name: "Home", href: "/" },
              { name: "Vendors", href: "/vendors" },
              { name: "Real Weddings", href: "/real-weddings" },
              { name: "Blog", href: "/blog" },
              { name: "E-Invites", href: "/e-invites" },
              { name: "Planning Tool", href: "/planning-tool", active: true },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block transition-colors ${
                  item.active ? "text-pink-600 font-medium" : "text-gray-700 hover:text-pink-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
        {/* Enhanced Progress Overview */}
        <div className="mb-8 animate-in fade-in duration-500">
          <Card className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-purple-600/20 backdrop-blur-sm"></div>
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Wedding Planning Progress</h2>
                      <p className="text-pink-100">Track your journey to the perfect wedding</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{weddingData.timeline.length}</div>
                      <div className="text-sm text-pink-100">Tasks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{weddingData.guests.length}</div>
                      <div className="text-sm text-pink-100">Guests</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{weddingData.vendors.length}</div>
                      <div className="text-sm text-pink-100">Vendors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {weddingData.basicInfo.weddingDate
                          ? Math.ceil((new Date(weddingData.basicInfo.weddingDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                          : "—"
                        }
                      </div>
                      <div className="text-sm text-pink-100">Days Left</div>
                    </div>
                  </div>
                </div>

                <div className="text-center ml-8">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="white"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 50}`}
                        strokeDashoffset={`${2 * Math.PI * 50 * (1 - completionPercentage() / 100)}`}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold">{completionPercentage()}%</div>
                        <div className="text-xs text-pink-100">Complete</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-in fade-in duration-500" style={{ animationDelay: "100ms" }}>
          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-pink-50 to-rose-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                  <CalendarIcon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">Wedding Date</p>
                  <p className="text-lg font-bold text-gray-900">
                    {weddingData.basicInfo.weddingDate
                      ? format(weddingData.basicInfo.weddingDate, "MMM dd, yyyy")
                      : "Not set"
                    }
                  </p>
                  {weddingData.basicInfo.weddingDate && (
                    <p className="text-xs text-pink-600 font-medium">
                      {Math.ceil((new Date(weddingData.basicInfo.weddingDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days to go
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Budget</p>
                  <p className="text-lg font-bold text-gray-900">
                    {weddingData.budget.totalBudget > 0
                      ? `₹${(weddingData.budget.totalBudget / 100000).toFixed(1)}L`
                      : "Not set"
                    }
                  </p>
                  {weddingData.budget.totalBudget > 0 && (
                    <p className="text-xs text-green-600 font-medium">
                      {Math.round((weddingData.budget.allocated.reduce((sum, item) => sum + item.spent, 0) / weddingData.budget.totalBudget) * 100)}% spent
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">Guest Count</p>
                  <p className="text-lg font-bold text-gray-900">
                    {weddingData.guests.length > 0
                      ? weddingData.guests.length
                      : weddingData.basicInfo.guestCount > 0
                        ? weddingData.basicInfo.guestCount
                        : "Not set"
                    }
                  </p>
                  {weddingData.guests.length > 0 && (
                    <p className="text-xs text-blue-600 font-medium">
                      {weddingData.guests.filter(g => g.rsvpStatus === "Confirmed").length} confirmed
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-purple-50 to-violet-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">Tasks Complete</p>
                  <p className="text-lg font-bold text-gray-900">
                    {weddingData.timeline.filter(t => t.completed).length}/{weddingData.timeline.length}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress
                      value={weddingData.timeline.length > 0
                        ? (weddingData.timeline.filter(t => t.completed).length / weddingData.timeline.length) * 100
                        : 0
                      }
                      className="flex-1 h-2"
                    />
                    <span className="text-xs text-purple-600 font-medium">
                      {weddingData.timeline.length > 0
                        ? Math.round((weddingData.timeline.filter(t => t.completed).length / weddingData.timeline.length) * 100)
                        : 0
                      }%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="guests">Guests</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-500">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-600" />
                    Wedding Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Bride:</span>
                      <p className="font-medium">{weddingData.basicInfo.brideName || "Not set"}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Groom:</span>
                      <p className="font-medium">{weddingData.basicInfo.groomName || "Not set"}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Date:</span>
                      <p className="font-medium">
                        {weddingData.basicInfo.weddingDate
                          ? format(weddingData.basicInfo.weddingDate, "PPP")
                          : "Not set"
                        }
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Venue:</span>
                      <p className="font-medium">{weddingData.basicInfo.venue || "Not set"}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Theme:</span>
                      <p className="font-medium">{weddingData.basicInfo.theme || "Not set"}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Style:</span>
                      <p className="font-medium">{weddingData.basicInfo.style || "Not set"}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setActiveTab("basic")}
                    className="w-full bg-pink-600 hover:bg-pink-700"
                  >
                    {weddingData.basicInfo.brideName ? "Edit Basic Info" : "Add Basic Info"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setActiveTab("budget")}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Set Budget
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setActiveTab("guests")}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Add Guests
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setActiveTab("timeline")}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Create Timeline
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setActiveTab("vendors")}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Find Vendors
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Wedding Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="brideName">Bride's Name</Label>
                    <Input
                      id="brideName"
                      placeholder="Enter bride's name"
                      value={weddingData.basicInfo.brideName}
                      onChange={(e) => {
                        setWeddingData(prev => ({
                          ...prev,
                          basicInfo: { ...prev.basicInfo, brideName: e.target.value }
                        }))
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="groomName">Groom's Name</Label>
                    <Input
                      id="groomName"
                      placeholder="Enter groom's name"
                      value={weddingData.basicInfo.groomName}
                      onChange={(e) => {
                        setWeddingData(prev => ({
                          ...prev,
                          basicInfo: { ...prev.basicInfo, groomName: e.target.value }
                        }))
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Wedding Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {weddingData.basicInfo.weddingDate ? (
                            format(weddingData.basicInfo.weddingDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={weddingData.basicInfo.weddingDate || undefined}
                          onSelect={(date) => {
                            setWeddingData(prev => ({
                              ...prev,
                              basicInfo: { ...prev.basicInfo, weddingDate: date || null }
                            }))
                            setHasUnsavedChanges(true)
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue</Label>
                    <Input
                      id="venue"
                      placeholder="Enter wedding venue"
                      value={weddingData.basicInfo.venue}
                      onChange={(e) => {
                        setWeddingData(prev => ({
                          ...prev,
                          basicInfo: { ...prev.basicInfo, venue: e.target.value }
                        }))
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="guestCount">Guest Count</Label>
                    <Input
                      id="guestCount"
                      type="number"
                      placeholder="Number of guests"
                      value={weddingData.basicInfo.guestCount || ""}
                      onChange={(e) => {
                        setWeddingData(prev => ({
                          ...prev,
                          basicInfo: { ...prev.basicInfo, guestCount: parseInt(e.target.value) || 0 }
                        }))
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme">Wedding Theme</Label>
                    <Select
                      value={weddingData.basicInfo.theme}
                      onValueChange={(value) => {
                        setWeddingData(prev => ({
                          ...prev,
                          basicInfo: { ...prev.basicInfo, theme: value }
                        }))
                        setHasUnsavedChanges(true)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Traditional">Traditional</SelectItem>
                        <SelectItem value="Modern">Modern</SelectItem>
                        <SelectItem value="Vintage">Vintage</SelectItem>
                        <SelectItem value="Rustic">Rustic</SelectItem>
                        <SelectItem value="Beach">Beach</SelectItem>
                        <SelectItem value="Garden">Garden</SelectItem>
                        <SelectItem value="Royal">Royal</SelectItem>
                        <SelectItem value="Minimalist">Minimalist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="style">Wedding Style</Label>
                    <Select
                      value={weddingData.basicInfo.style}
                      onValueChange={(value) => {
                        setWeddingData(prev => ({
                          ...prev,
                          basicInfo: { ...prev.basicInfo, style: value }
                        }))
                        setHasUnsavedChanges(true)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Grand">Grand</SelectItem>
                        <SelectItem value="Intimate">Intimate</SelectItem>
                        <SelectItem value="Luxury">Luxury</SelectItem>
                        <SelectItem value="Simple">Simple</SelectItem>
                        <SelectItem value="Elegant">Elegant</SelectItem>
                        <SelectItem value="Fun">Fun</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Budget Planning
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const totalBudget = prompt("Enter total budget (₹):")
                      if (totalBudget) {
                        setWeddingData(prev => ({
                          ...prev,
                          budget: { ...prev.budget, totalBudget: parseInt(totalBudget) }
                        }))
                        setHasUnsavedChanges(true)
                      }
                    }}
                  >
                    Set Total Budget
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {weddingData.budget.totalBudget === 0 ? (
                  <div className="text-center py-8">
                    <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Budget Set</h3>
                    <p className="text-gray-600 mb-4">Set your total wedding budget to start planning</p>
                    <Button
                      onClick={() => {
                        const totalBudget = prompt("Enter total budget (₹):")
                        if (totalBudget) {
                          setWeddingData(prev => ({
                            ...prev,
                            budget: { ...prev.budget, totalBudget: parseInt(totalBudget) }
                          }))
                          setHasUnsavedChanges(true)
                        }
                      }}
                      className="bg-pink-600 hover:bg-pink-700"
                    >
                      Set Budget
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                      <h3 className="text-2xl font-bold text-gray-900">
                        ₹{weddingData.budget.totalBudget.toLocaleString()}
                      </h3>
                      <p className="text-gray-600">Total Budget</p>
                    </div>

                    <div className="grid gap-4">
                      {weddingData.budget.allocated.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              {item.category === "Venue" && <Home className="w-5 h-5" />}
                              {item.category === "Photography" && <Camera className="w-5 h-5" />}
                              {item.category === "Catering" && <Utensils className="w-5 h-5" />}
                              {item.category === "Decorations" && <Flower className="w-5 h-5" />}
                              {item.category === "Music/DJ" && <Music className="w-5 h-5" />}
                              {item.category === "Transportation" && <Car className="w-5 h-5" />}
                              {item.category === "Attire" && <Shirt className="w-5 h-5" />}
                              {item.category === "Miscellaneous" && <Gift className="w-5 h-5" />}
                            </div>
                            <div>
                              <h4 className="font-medium">{item.category}</h4>
                              <p className="text-sm text-gray-600">
                                Allocated: ₹{item.amount.toLocaleString()} | Spent: ₹{item.spent.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const amount = prompt(`Enter budget for ${item.category} (₹):`)
                              if (amount) {
                                const newAllocated = [...weddingData.budget.allocated]
                                newAllocated[index].amount = parseInt(amount)
                                setWeddingData(prev => ({
                                  ...prev,
                                  budget: { ...prev.budget, allocated: newAllocated }
                                }))
                                setHasUnsavedChanges(true)
                              }
                            }}
                          >
                            Set Amount
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Guest Management
                  <Button
                    onClick={() => {
                      const name = prompt("Guest name:")
                      const email = prompt("Guest email:")
                      if (name && email) {
                        const newGuest = {
                          id: Date.now().toString(),
                          name,
                          email,
                          phone: "",
                          category: "Family",
                          rsvpStatus: "Pending",
                          plusOne: false
                        }
                        setWeddingData(prev => ({
                          ...prev,
                          guests: [...prev.guests, newGuest]
                        }))
                        setHasUnsavedChanges(true)
                      }
                    }}
                    className="bg-pink-600 hover:bg-pink-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Guest
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {weddingData.guests.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Guests Added</h3>
                    <p className="text-gray-600 mb-4">Start building your guest list</p>
                    <Button
                      onClick={() => {
                        const name = prompt("Guest name:")
                        const email = prompt("Guest email:")
                        if (name && email) {
                          const newGuest = {
                            id: Date.now().toString(),
                            name,
                            email,
                            phone: "",
                            category: "Family",
                            rsvpStatus: "Pending",
                            plusOne: false
                          }
                          setWeddingData(prev => ({
                            ...prev,
                            guests: [...prev.guests, newGuest]
                          }))
                          setHasUnsavedChanges(true)
                        }
                      }}
                      className="bg-pink-600 hover:bg-pink-700"
                    >
                      Add First Guest
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{weddingData.guests.length}</div>
                        <div className="text-sm text-gray-600">Total Guests</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {weddingData.guests.filter(g => g.rsvpStatus === "Confirmed").length}
                        </div>
                        <div className="text-sm text-gray-600">Confirmed</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">
                          {weddingData.guests.filter(g => g.rsvpStatus === "Pending").length}
                        </div>
                        <div className="text-sm text-gray-600">Pending</div>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      {weddingData.guests.map((guest) => (
                        <div key={guest.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{guest.name}</h4>
                            <p className="text-sm text-gray-600">{guest.email}</p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline">{guest.category}</Badge>
                              <Badge
                                className={
                                  guest.rsvpStatus === "Confirmed" ? "bg-green-100 text-green-800" :
                                  guest.rsvpStatus === "Declined" ? "bg-red-100 text-red-800" :
                                  "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {guest.rsvpStatus}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setWeddingData(prev => ({
                                ...prev,
                                guests: prev.guests.filter(g => g.id !== guest.id)
                              }))
                              setHasUnsavedChanges(true)
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Wedding Timeline
                  <Button
                    onClick={() => {
                      const task = prompt("Task description:")
                      if (task) {
                        const newTask = {
                          id: Date.now().toString(),
                          task,
                          category: "Planning",
                          dueDate: null,
                          completed: false,
                          priority: "Medium"
                        }
                        setWeddingData(prev => ({
                          ...prev,
                          timeline: [...prev.timeline, newTask]
                        }))
                        setHasUnsavedChanges(true)
                      }
                    }}
                    className="bg-pink-600 hover:bg-pink-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {weddingData.timeline.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Tasks Added</h3>
                    <p className="text-gray-600 mb-4">Create your wedding planning timeline</p>
                    <Button
                      onClick={() => {
                        const task = prompt("Task description:")
                        if (task) {
                          const newTask = {
                            id: Date.now().toString(),
                            task,
                            category: "Planning",
                            dueDate: null,
                            completed: false,
                            priority: "Medium"
                          }
                          setWeddingData(prev => ({
                            ...prev,
                            timeline: [...prev.timeline, newTask]
                          }))
                          setHasUnsavedChanges(true)
                        }
                      }}
                      className="bg-pink-600 hover:bg-pink-700"
                    >
                      Add First Task
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {weddingData.timeline.map((task) => (
                      <div key={task.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <button
                          onClick={() => {
                            setWeddingData(prev => ({
                              ...prev,
                              timeline: prev.timeline.map(t =>
                                t.id === task.id ? { ...t, completed: !t.completed } : t
                              )
                            }))
                            setHasUnsavedChanges(true)
                          }}
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-400" />
                          )}
                        </button>

                        <div className="flex-1">
                          <h4 className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
                            {task.task}
                          </h4>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline">{task.category}</Badge>
                            <Badge
                              className={
                                task.priority === "High" ? "bg-red-100 text-red-800" :
                                task.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                                "bg-green-100 text-green-800"
                              }
                            >
                              {task.priority}
                            </Badge>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setWeddingData(prev => ({
                              ...prev,
                              timeline: prev.timeline.filter(t => t.id !== task.id)
                            }))
                            setHasUnsavedChanges(true)
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Vendor Management
                  <Button
                    onClick={() => {
                      const name = prompt("Vendor name:")
                      const category = prompt("Vendor category:")
                      if (name && category) {
                        const newVendor = {
                          id: Date.now().toString(),
                          category,
                          name,
                          contact: "",
                          cost: 0,
                          status: "Contacted",
                          notes: ""
                        }
                        setWeddingData(prev => ({
                          ...prev,
                          vendors: [...prev.vendors, newVendor]
                        }))
                        setHasUnsavedChanges(true)
                      }
                    }}
                    className="bg-pink-600 hover:bg-pink-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Vendor
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {weddingData.vendors.length === 0 ? (
                  <div className="text-center py-8">
                    <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Vendors Added</h3>
                    <p className="text-gray-600 mb-4">Start building your vendor list</p>
                    <Button
                      onClick={() => {
                        const name = prompt("Vendor name:")
                        const category = prompt("Vendor category:")
                        if (name && category) {
                          const newVendor = {
                            id: Date.now().toString(),
                            category,
                            name,
                            contact: "",
                            cost: 0,
                            status: "Contacted",
                            notes: ""
                          }
                          setWeddingData(prev => ({
                            ...prev,
                            vendors: [...prev.vendors, newVendor]
                          }))
                          setHasUnsavedChanges(true)
                        }
                      }}
                      className="bg-pink-600 hover:bg-pink-700"
                    >
                      Add First Vendor
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {weddingData.vendors.map((vendor) => (
                      <div key={vendor.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{vendor.name}</h4>
                            <p className="text-sm text-gray-600">{vendor.category}</p>
                            <div className="flex gap-2 mt-1">
                              <Badge
                                className={
                                  vendor.status === "Booked" ? "bg-green-100 text-green-800" :
                                  vendor.status === "Contacted" ? "bg-blue-100 text-blue-800" :
                                  "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {vendor.status}
                              </Badge>
                              {vendor.cost > 0 && (
                                <Badge variant="outline">₹{vendor.cost.toLocaleString()}</Badge>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setWeddingData(prev => ({
                                ...prev,
                                vendors: prev.vendors.filter(v => v.id !== vendor.id)
                              }))
                              setHasUnsavedChanges(true)
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
