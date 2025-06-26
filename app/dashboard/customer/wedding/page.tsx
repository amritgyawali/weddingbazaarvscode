"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  MessageCircle,
  Camera,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  Users,
  FileText,
  Phone,
  Mail,
  MapPin,
  Award,
  Target,
  Zap,
  Shield,
  Briefcase,
  Heart,
  Gift,
  Sparkles,
  Crown,
  Gem,
  Palette,
  Music,
  Video,
  Image,
  Edit,
  Share2,
  Download,
  Upload,
  RefreshCw,
  Search,
  Filter,
  Plus,
  Eye,
  AlertCircle,
  Bell,
  Bookmark,
  Archive,
  Trash2,
  Copy,
  ExternalLink,
  Maximize,
  Minimize,
  RotateCcw,
  Save,
  Send,
  Printer,
  Scissors,
  Layers,
  Grid,
  List,
  MoreHorizontal,
  CalendarDays,
  MapPinIcon,
  UsersIcon,
  ClockIcon,
  HeartIcon,
  FlowerIcon,
  CakeIcon,
  RingIcon,
  ChurchIcon,
  PartyPopperIcon,
} from "lucide-react"

export default function CustomerWeddingPage() {
  const [activeTab, setActiveTab] = useState("details")
  const [isEditing, setIsEditing] = useState(false)

  const weddingDetails = {
    brideName: "Priya Sharma",
    groomName: "Rahul Gupta",
    weddingDate: "2024-12-15",
    ceremonyTime: "10:00 AM",
    receptionTime: "7:00 PM",
    ceremonyVenue: "Sacred Heart Church, Mumbai",
    receptionVenue: "Royal Palace Hotel, Mumbai",
    guestCount: 250,
    theme: "Traditional Indian",
    colors: ["Red", "Gold", "Maroon"],
    budget: 500000,
    description: "A beautiful traditional Indian wedding celebrating the union of two hearts and families."
  }

  const weddingEvents = [
    {
      name: "Mehendi Ceremony",
      date: "2024-12-13",
      time: "4:00 PM",
      venue: "Bride's Home",
      status: "planned",
      guests: 50,
    },
    {
      name: "Sangam Ceremony",
      date: "2024-12-14",
      time: "6:00 PM", 
      venue: "Community Hall",
      status: "planned",
      guests: 100,
    },
    {
      name: "Wedding Ceremony",
      date: "2024-12-15",
      time: "10:00 AM",
      venue: "Sacred Heart Church",
      status: "confirmed",
      guests: 250,
    },
    {
      name: "Reception",
      date: "2024-12-15",
      time: "7:00 PM",
      venue: "Royal Palace Hotel",
      status: "confirmed", 
      guests: 300,
    },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/customer", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Wedding Details", href: "/dashboard/customer/wedding", icon: <Heart className="w-4 h-4" />, active: true },
    { label: "Budget", href: "/dashboard/customer/budget", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/customer/vendors", icon: <Users className="w-4 h-4" /> },
    { label: "Guest List", href: "/dashboard/customer/guests", icon: <Users className="w-4 h-4" /> },
    { label: "Timeline", href: "/dashboard/customer/timeline", icon: <Calendar className="w-4 h-4" /> },
    { label: "Documents", href: "/dashboard/customer/documents", icon: <FileText className="w-4 h-4" /> },
    { label: "Messages", href: "/dashboard/customer/messages", icon: <MessageCircle className="w-4 h-4" /> },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "planned":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="customer">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Wedding Details</h1>
            <p className="text-gray-600">Manage your wedding ceremony and reception details</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share Details
            </Button>
            <Button 
              className="bg-pink-600 hover:bg-pink-700"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "Save Changes" : "Edit Details"}
            </Button>
          </div>
        </div>

        {/* Wedding Overview */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{weddingDetails.brideName} & {weddingDetails.groomName}</h2>
              <p className="text-pink-100 text-lg mb-4">{weddingDetails.description}</p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{weddingDetails.weddingDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{weddingDetails.guestCount} Guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>Mumbai</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">45</div>
              <div className="text-pink-200">Days to go</div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="details">Basic Details</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="venues">Venues</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Couple Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="brideName">Bride's Name</Label>
                      <Input 
                        id="brideName"
                        defaultValue={weddingDetails.brideName}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="groomName">Groom's Name</Label>
                      <Input 
                        id="groomName"
                        defaultValue={weddingDetails.groomName}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Wedding Description</Label>
                    <Textarea 
                      id="description"
                      defaultValue={weddingDetails.description}
                      disabled={!isEditing}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Wedding Date & Time</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="weddingDate">Wedding Date</Label>
                    <Input 
                      id="weddingDate"
                      type="date"
                      defaultValue={weddingDetails.weddingDate}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ceremonyTime">Ceremony Time</Label>
                      <Input 
                        id="ceremonyTime"
                        type="time"
                        defaultValue="10:00"
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="receptionTime">Reception Time</Label>
                      <Input 
                        id="receptionTime"
                        type="time"
                        defaultValue="19:00"
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="guestCount">Expected Guests</Label>
                    <Input 
                      id="guestCount"
                      type="number"
                      defaultValue={weddingDetails.guestCount}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Wedding Theme & Style</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="theme">Wedding Theme</Label>
                    <Select disabled={!isEditing}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={weddingDetails.theme} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="traditional">Traditional Indian</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="vintage">Vintage</SelectItem>
                        <SelectItem value="destination">Destination</SelectItem>
                        <SelectItem value="beach">Beach</SelectItem>
                        <SelectItem value="garden">Garden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="budget">Total Budget</Label>
                    <Input 
                      id="budget"
                      type="number"
                      defaultValue={weddingDetails.budget}
                      disabled={!isEditing}
                      className="mt-1"
                      placeholder="Enter budget in ₹"
                    />
                  </div>
                </div>

                <div>
                  <Label>Color Scheme</Label>
                  <div className="flex gap-2 mt-2">
                    {weddingDetails.colors.map((color, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {color}
                        {isEditing && (
                          <button className="ml-2 text-gray-500 hover:text-red-500">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Color
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Wedding Events</h2>
              <Button className="bg-pink-600 hover:bg-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </div>

            <div className="grid gap-4">
              {weddingEvents.map((event, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{event.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {event.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.venue}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {event.guests} guests
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="venues" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChurchIcon className="w-5 h-5" />
                    Ceremony Venue
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="ceremonyVenue">Venue Name</Label>
                    <Input
                      id="ceremonyVenue"
                      defaultValue={weddingDetails.ceremonyVenue}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ceremonyAddress">Address</Label>
                    <Textarea
                      id="ceremonyAddress"
                      defaultValue="123 Church Street, Mumbai, Maharashtra 400001"
                      disabled={!isEditing}
                      className="mt-1"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ceremonyCapacity">Capacity</Label>
                      <Input
                        id="ceremonyCapacity"
                        defaultValue="300"
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ceremonyContact">Contact</Label>
                      <Input
                        id="ceremonyContact"
                        defaultValue="+91 98765 43210"
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PartyPopperIcon className="w-5 h-5" />
                    Reception Venue
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="receptionVenue">Venue Name</Label>
                    <Input
                      id="receptionVenue"
                      defaultValue={weddingDetails.receptionVenue}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="receptionAddress">Address</Label>
                    <Textarea
                      id="receptionAddress"
                      defaultValue="456 Palace Road, Mumbai, Maharashtra 400002"
                      disabled={!isEditing}
                      className="mt-1"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="receptionCapacity">Capacity</Label>
                      <Input
                        id="receptionCapacity"
                        defaultValue="400"
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="receptionContact">Contact</Label>
                      <Input
                        id="receptionContact"
                        defaultValue="+91 98765 43211"
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ceremony Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="ceremonyType">Ceremony Type</Label>
                    <Select disabled={!isEditing}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Traditional Hindu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hindu">Traditional Hindu</SelectItem>
                        <SelectItem value="christian">Christian</SelectItem>
                        <SelectItem value="muslim">Muslim</SelectItem>
                        <SelectItem value="sikh">Sikh</SelectItem>
                        <SelectItem value="civil">Civil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language">Ceremony Language</Label>
                    <Select disabled={!isEditing}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Hindi & English" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hindi-english">Hindi & English</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="marathi">Marathi</SelectItem>
                        <SelectItem value="gujarati">Gujarati</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="duration">Ceremony Duration</Label>
                    <Select disabled={!isEditing}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="2-3 hours" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 hours</SelectItem>
                        <SelectItem value="2-3">2-3 hours</SelectItem>
                        <SelectItem value="3-4">3-4 hours</SelectItem>
                        <SelectItem value="4+">4+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reception Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="foodType">Food Type</Label>
                    <Select disabled={!isEditing}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Vegetarian & Non-Vegetarian" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="both">Vegetarian & Non-Vegetarian</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian Only</SelectItem>
                        <SelectItem value="non-vegetarian">Non-Vegetarian Only</SelectItem>
                        <SelectItem value="vegan">Vegan Options</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="musicType">Music Type</Label>
                    <Select disabled={!isEditing}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Bollywood & Classical" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bollywood-classical">Bollywood & Classical</SelectItem>
                        <SelectItem value="bollywood">Bollywood</SelectItem>
                        <SelectItem value="classical">Classical</SelectItem>
                        <SelectItem value="western">Western</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="danceFloor">Dance Floor</Label>
                    <Select disabled={!isEditing}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Yes, with DJ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dj">Yes, with DJ</SelectItem>
                        <SelectItem value="live-band">Yes, with Live Band</SelectItem>
                        <SelectItem value="both">DJ & Live Band</SelectItem>
                        <SelectItem value="no">No Dancing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Wedding Planning Tools</h2>
              <p className="text-gray-600">Essential tools to plan your perfect wedding ceremony and reception</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 Wedding Planning Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-pink-50">
                <Heart className="w-6 h-6 mb-2 text-pink-600" />
                <span className="text-sm font-medium">Ceremony Planner</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <MapPin className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Venue Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <Calendar className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Event Timeline</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <Users className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">Guest Coordinator</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <Palette className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Theme Designer</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-teal-50">
                <Music className="w-6 h-6 mb-2 text-teal-600" />
                <span className="text-sm font-medium">Music Planner</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-indigo-50">
                <Camera className="w-6 h-6 mb-2 text-indigo-600" />
                <span className="text-sm font-medium">Photo Moments</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <Sparkles className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">Decoration Ideas</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-yellow-50">
                <Gift className="w-6 h-6 mb-2 text-yellow-600" />
                <span className="text-sm font-medium">Gift Registry</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-cyan-50">
                <FileText className="w-6 h-6 mb-2 text-cyan-600" />
                <span className="text-sm font-medium">Vow Writer</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-lime-50">
                <Clock className="w-6 h-6 mb-2 text-lime-600" />
                <span className="text-sm font-medium">Schedule Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-emerald-50">
                <Mail className="w-6 h-6 mb-2 text-emerald-600" />
                <span className="text-sm font-medium">Invitation Designer</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-violet-50">
                <Award className="w-6 h-6 mb-2 text-violet-600" />
                <span className="text-sm font-medium">Tradition Guide</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-rose-50">
                <Share2 className="w-6 h-6 mb-2 text-rose-600" />
                <span className="text-sm font-medium">Social Sharing</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-sky-50">
                <CheckCircle className="w-6 h-6 mb-2 text-sky-600" />
                <span className="text-sm font-medium">Checklist Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-stone-50">
                <Download className="w-6 h-6 mb-2 text-stone-600" />
                <span className="text-sm font-medium">Document Export</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-neutral-50">
                <Bell className="w-6 h-6 mb-2 text-neutral-600" />
                <span className="text-sm font-medium">Reminder System</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-slate-50">
                <Target className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm font-medium">Goal Tracker</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-zinc-50">
                <Crown className="w-6 h-6 mb-2 text-zinc-600" />
                <span className="text-sm font-medium">VIP Management</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-gray-50">
                <Gem className="w-6 h-6 mb-2 text-gray-600" />
                <span className="text-sm font-medium">Special Moments</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
