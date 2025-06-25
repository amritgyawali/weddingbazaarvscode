"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Heart,
  CalendarIcon,
  MapPin,
  Users,
  Camera,
  Music,
  Palette,
  Clock,
  Edit,
  Eye,
  Settings,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Gift,
} from "lucide-react"

export default function MyWeddingPage() {
  const [weddingDetails, setWeddingDetails] = useState({
    brideName: "Priya Sharma",
    groomName: "Rahul Gupta",
    weddingDate: "2024-08-15", // store as ISO-date string
    venue: "Royal Palace Gardens",
    city: "Mumbai",
    guestCount: 250,
    budget: 500000,
    theme: "Royal Traditional",
    colors: ["#D4AF37", "#8B0000", "#FFFFFF"],
  })

  const [ceremonies, setCeremonies] = useState([
    { name: "Mehendi", date: "2024-08-13", time: "10:00 AM", venue: "Home", status: "planned" },
    { name: "Sangam", date: "2024-08-13", time: "6:00 PM", venue: "Banquet Hall", status: "planned" },
    { name: "Haldi", date: "2024-08-14", time: "8:00 AM", venue: "Home", status: "planned" },
    { name: "Wedding", date: "2024-08-15", time: "7:00 PM", venue: "Royal Palace Gardens", status: "confirmed" },
    { name: "Reception", date: "2024-08-16", time: "7:00 PM", venue: "Grand Ballroom", status: "planned" },
  ])

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "My Wedding", href: "/dashboard/wedding", icon: <Heart className="w-4 h-4" />, active: true },
    { label: "Vendors", href: "/dashboard/vendors", icon: <Users className="w-4 h-4" /> },
    { label: "Budget", href: "/dashboard/budget", icon: <Gift className="w-4 h-4" /> },
    { label: "Guest List", href: "/dashboard/guests", icon: <Users className="w-4 h-4" /> },
    { label: "Timeline", href: "/dashboard/timeline", icon: <CalendarIcon className="w-4 h-4" /> },
    { label: "Documents", href: "/dashboard/documents", icon: <Settings className="w-4 h-4" /> },
    { label: "Messages", href: "/dashboard/messages", icon: <Settings className="w-4 h-4" /> },
  ]

  return (
    <DashboardLayout menuItems={menuItems} userRole="customer">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">My Wedding Details 💕</h1>
          <p className="text-pink-100">Manage all aspects of your dream wedding</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ceremonies">Ceremonies</TabsTrigger>
            <TabsTrigger value="theme">Theme & Style</TabsTrigger>
            <TabsTrigger value="venues">Venues</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Basic Details */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Wedding Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Bride's Name</Label>
                      <Input
                        value={weddingDetails.brideName}
                        onChange={(e) => setWeddingDetails({ ...weddingDetails, brideName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Groom's Name</Label>
                      <Input
                        value={weddingDetails.groomName}
                        onChange={(e) => setWeddingDetails({ ...weddingDetails, groomName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Wedding Date</Label>
                      <Input
                        type="date"
                        value={weddingDetails.weddingDate}
                        onChange={(e) =>
                          setWeddingDetails({
                            ...weddingDetails,
                            weddingDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Guest Count</Label>
                      <Input
                        type="number"
                        value={weddingDetails.guestCount}
                        onChange={(e) =>
                          setWeddingDetails({ ...weddingDetails, guestCount: Number.parseInt(e.target.value) })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Main Venue</Label>
                    <Input
                      value={weddingDetails.venue}
                      onChange={(e) => setWeddingDetails({ ...weddingDetails, venue: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>City</Label>
                    <Input
                      value={weddingDetails.city}
                      onChange={(e) => setWeddingDetails({ ...weddingDetails, city: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Wedding Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-600">127</div>
                    <div className="text-sm text-gray-600">Days to go</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Planning Progress</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <Progress value={68} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 bg-pink-50 rounded">
                      <div className="font-bold">8</div>
                      <div className="text-xs">Vendors</div>
                    </div>
                    <div className="p-2 bg-blue-50 rounded">
                      <div className="font-bold">5</div>
                      <div className="text-xs">Ceremonies</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Wedding Tools Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                { name: "Wedding Website", icon: <Eye className="w-5 h-5" />, color: "bg-pink-100 text-pink-600" },
                {
                  name: "Invitation Designer",
                  icon: <Edit className="w-5 h-5" />,
                  color: "bg-purple-100 text-purple-600",
                },
                { name: "Seating Planner", icon: <Users className="w-5 h-5" />, color: "bg-blue-100 text-blue-600" },
                { name: "Menu Planner", icon: <Settings className="w-5 h-5" />, color: "bg-green-100 text-green-600" },
                {
                  name: "Photo Booth Props",
                  icon: <Camera className="w-5 h-5" />,
                  color: "bg-yellow-100 text-yellow-600",
                },
                { name: "Music Playlist", icon: <Music className="w-5 h-5" />, color: "bg-red-100 text-red-600" },
                {
                  name: "Decoration Ideas",
                  icon: <Palette className="w-5 h-5" />,
                  color: "bg-indigo-100 text-indigo-600",
                },
                {
                  name: "Timeline Creator",
                  icon: <Clock className="w-5 h-5" />,
                  color: "bg-orange-100 text-orange-600",
                },
                { name: "Gift Registry", icon: <Gift className="w-5 h-5" />, color: "bg-teal-100 text-teal-600" },
                {
                  name: "Weather Forecast",
                  icon: <AlertCircle className="w-5 h-5" />,
                  color: "bg-gray-100 text-gray-600",
                },
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div
                      className={`w-12 h-12 rounded-full ${tool.color} flex items-center justify-center mx-auto mb-2`}
                    >
                      {tool.icon}
                    </div>
                    <p className="text-sm font-medium">{tool.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Ceremonies Tab */}
          <TabsContent value="ceremonies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Wedding Ceremonies</span>
                  <Button>Add Ceremony</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ceremonies.map((ceremony, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-3 h-3 rounded-full ${ceremony.status === "confirmed" ? "bg-green-500" : "bg-yellow-500"}`}
                        ></div>
                        <div>
                          <h4 className="font-medium">{ceremony.name}</h4>
                          <p className="text-sm text-gray-600">
                            {ceremony.date} at {ceremony.time}
                          </p>
                          <p className="text-sm text-gray-500">{ceremony.venue}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={ceremony.status === "confirmed" ? "default" : "secondary"}>
                          {ceremony.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ceremony Planning Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Ritual Checklist",
                "Priest Booking",
                "Ceremony Timeline",
                "Traditional Outfits",
                "Jewelry Planning",
                "Makeup Schedule",
                "Photography Shots",
                "Video Coverage",
                "Guest Seating",
                "Decoration Setup",
                "Catering Menu",
                "Music Selection",
                "Transportation",
                "Accommodation",
                "Gift Exchange",
                "Cultural Customs",
                "Weather Backup",
                "Emergency Contacts",
                "Ceremony Script",
                "Live Streaming",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-sm font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Theme & Style Tab */}
          <TabsContent value="theme" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Wedding Theme</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Theme Style</Label>
                    <Select defaultValue="royal-traditional">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="royal-traditional">Royal Traditional</SelectItem>
                        <SelectItem value="modern-elegant">Modern Elegant</SelectItem>
                        <SelectItem value="rustic-vintage">Rustic Vintage</SelectItem>
                        <SelectItem value="beach-destination">Beach Destination</SelectItem>
                        <SelectItem value="garden-outdoor">Garden Outdoor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Color Palette</Label>
                    <div className="flex gap-2 mt-2">
                      {weddingDetails.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                      <Button variant="outline" size="sm">
                        Add Color
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Decoration Style</Label>
                    <Textarea placeholder="Describe your decoration preferences..." />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Style Inspiration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4">Upload Inspiration Photos</Button>
                </CardContent>
              </Card>
            </div>

            {/* Style Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Color Palette Generator",
                "Theme Mood Board",
                "Decoration Planner",
                "Floral Arrangements",
                "Lighting Design",
                "Fabric Selection",
                "Centerpiece Ideas",
                "Backdrop Design",
                "Table Settings",
                "Entrance Decor",
                "Stage Design",
                "Photo Booth Setup",
                "Ceiling Draping",
                "Aisle Decoration",
                "Mandap Design",
                "Reception Styling",
                "Outdoor Setup",
                "Weather Protection",
                "Seasonal Themes",
                "Cultural Elements",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Palette className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Venues Tab */}
          <TabsContent value="venues" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Venue Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Royal Palace Gardens",
                      type: "Main Wedding",
                      capacity: 300,
                      status: "Booked",
                      price: "₹2,50,000",
                    },
                    { name: "Grand Ballroom", type: "Reception", capacity: 250, status: "Booked", price: "₹1,80,000" },
                    { name: "Garden Lawn", type: "Mehendi", capacity: 100, status: "Confirmed", price: "₹50,000" },
                  ].map((venue, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <MapPin className="w-5 h-5 text-blue-500" />
                        <div>
                          <h4 className="font-medium">{venue.name}</h4>
                          <p className="text-sm text-gray-600">
                            {venue.type} • Capacity: {venue.capacity}
                          </p>
                          <p className="text-sm font-medium text-green-600">{venue.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>{venue.status}</Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Venue Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Venue Comparison",
                "Capacity Calculator",
                "Layout Planner",
                "Accessibility Check",
                "Parking Assessment",
                "Catering Kitchen",
                "Sound System",
                "Lighting Setup",
                "Weather Backup",
                "Guest Flow",
                "Security Planning",
                "Vendor Access",
                "Photography Spots",
                "Ceremony Space",
                "Reception Area",
                "Bridal Suite",
                "Guest Facilities",
                "Decoration Limits",
                "Timing Restrictions",
                "Cleanup Plan",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <MapPin className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Photo Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4">Upload Photos</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Photo Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    "Engagement",
                    "Pre-wedding",
                    "Mehendi",
                    "Sangam",
                    "Haldi",
                    "Wedding",
                    "Reception",
                    "Couple Shots",
                    "Family Photos",
                    "Candid Moments",
                  ].map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                      <span className="text-sm">{category}</span>
                      <Badge variant="secondary">12</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Photo Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Photo Organizer",
                "Album Creator",
                "Slideshow Maker",
                "Photo Editing",
                "Filter Effects",
                "Collage Maker",
                "Print Ordering",
                "Digital Frames",
                "Social Sharing",
                "Backup Storage",
                "Face Recognition",
                "Auto Tagging",
                "Timeline View",
                "Favorite Marking",
                "Download Manager",
                "Privacy Settings",
                "Guest Sharing",
                "Professional Editing",
                "Photo Books",
                "Canvas Prints",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Camera className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Public Wedding Profile</Label>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Guest Photo Sharing</Label>
                    <Button variant="outline" size="sm">
                      Allow
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Vendor Reviews</Label>
                    <Button variant="outline" size="sm">
                      Public
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Email Reminders</Label>
                    <Button variant="outline" size="sm">
                      On
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>SMS Alerts</Label>
                    <Button variant="outline" size="sm">
                      On
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Vendor Updates</Label>
                    <Button variant="outline" size="sm">
                      On
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Settings Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Account Settings",
                "Privacy Controls",
                "Notification Preferences",
                "Data Export",
                "Backup Settings",
                "Security Options",
                "Two-Factor Auth",
                "Password Manager",
                "Login History",
                "Device Management",
                "Sharing Permissions",
                "Guest Access",
                "Vendor Permissions",
                "Admin Controls",
                "API Settings",
                "Integration Setup",
                "Webhook Config",
                "Custom Fields",
                "Workflow Rules",
                "Automation Settings",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Settings className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
