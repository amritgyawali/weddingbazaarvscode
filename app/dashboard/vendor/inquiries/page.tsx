"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Mail,
  MessageCircle,
  Phone,
  Clock,
  User,
  Calendar,
  DollarSign,
  Send,
  Reply,
  Forward,
  Archive,
  Star,
  Flag,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Download,
  Upload,
  RefreshCw,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function VendorInquiriesPage() {
  const [activeTab, setActiveTab] = useState("inbox")
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const inquiries = [
    {
      id: "INQ001",
      customer: "Anjali Sharma",
      email: "anjali@example.com",
      phone: "+91 98765 43210",
      subject: "Wedding Photography Inquiry",
      message:
        "Hi, I'm looking for a wedding photographer for my wedding on August 15th, 2024. Could you please share your packages and availability?",
      date: "2024-07-20",
      time: "10:30 AM",
      status: "new",
      priority: "high",
      budget: "₹80,000",
      eventDate: "2024-08-15",
      venue: "Royal Palace Hotel",
      guestCount: 300,
      services: ["Photography", "Videography"],
      source: "website",
      responded: false,
      starred: true,
    },
    {
      id: "INQ002",
      customer: "Sneha Patel",
      email: "sneha@example.com",
      phone: "+91 87654 32109",
      subject: "Pre-wedding Shoot",
      message: "We are interested in a pre-wedding photoshoot. Please let us know your availability for September.",
      date: "2024-07-19",
      time: "2:15 PM",
      status: "responded",
      priority: "medium",
      budget: "₹35,000",
      eventDate: "2024-09-22",
      venue: "Sunset Gardens",
      guestCount: 50,
      services: ["Photography"],
      source: "social_media",
      responded: true,
      starred: false,
    },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Bookings", href: "/dashboard/vendor/bookings", icon: <Calendar className="w-4 h-4" /> },
    { label: "Inquiries", href: "/dashboard/vendor/inquiries", icon: <Mail className="w-4 h-4" />, active: true },
    { label: "Portfolio", href: "/dashboard/vendor/portfolio", icon: <Star className="w-4 h-4" /> },
    { label: "Analytics", href: "/dashboard/vendor/analytics", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Payments", href: "/dashboard/vendor/payments", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Reviews", href: "/dashboard/vendor/reviews", icon: <Star className="w-4 h-4" /> },
    { label: "Profile", href: "/dashboard/vendor/profile", icon: <User className="w-4 h-4" /> },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800"
      case "responded":
        return "bg-blue-100 text-blue-800"
      case "quoted":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="vendor">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inquiries Management</h1>
            <p className="text-gray-600">Manage customer inquiries and communications</p>
          </div>
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Plus className="w-4 h-4 mr-2" />
            New Inquiry
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="inbox" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">New Inquiries</p>
                      <p className="text-2xl font-bold text-red-600">8</p>
                    </div>
                    <Mail className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Responded</p>
                      <p className="text-2xl font-bold text-blue-600">15</p>
                    </div>
                    <Reply className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                      <p className="text-2xl font-bold text-green-600">68%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Response</p>
                      <p className="text-2xl font-bold text-purple-600">2.5h</p>
                    </div>
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search inquiries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="responded">Responded</SelectItem>
                      <SelectItem value="quoted">Quoted</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Inquiries List */}
            <div className="grid gap-6">
              {inquiries.map((inquiry) => (
                <Card key={inquiry.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            {inquiry.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                            <h3 className="text-lg font-semibold">{inquiry.customer}</h3>
                          </div>
                          <Badge className={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                          <Badge className={getPriorityColor(inquiry.priority)}>{inquiry.priority}</Badge>
                        </div>

                        <h4 className="font-medium text-gray-900 mb-2">{inquiry.subject}</h4>
                        <p className="text-gray-600 mb-4 line-clamp-2">{inquiry.message}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{inquiry.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{inquiry.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{inquiry.eventDate}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">Budget: {inquiry.budget}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">Guests: {inquiry.guestCount}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">
                              {inquiry.date} at {inquiry.time}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {inquiry.services.map((service, index) => (
                            <Badge key={index} variant="outline">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                          <Reply className="w-4 h-4 mr-2" />
                          Reply
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline">
                          <Archive className="w-4 h-4 mr-2" />
                          Archive
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="responses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Response Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Quick Response</h4>
                      <Textarea placeholder="Type your response..." className="mb-3" />
                      <div className="flex gap-2">
                        <Button size="sm">Send</Button>
                        <Button size="sm" variant="outline">
                          Save Template
                        </Button>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Response Templates</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          Initial Response Template
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Package Information
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Availability Check
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Quote Follow-up
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Available Templates</h4>
                    <div className="space-y-2">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium">Welcome & Introduction</h5>
                        <p className="text-sm text-gray-600">Initial response to new inquiries</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium">Package Details</h5>
                        <p className="text-sm text-gray-600">Detailed service packages</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium">Quote & Pricing</h5>
                        <p className="text-sm text-gray-600">Custom pricing proposals</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium">Follow-up</h5>
                        <p className="text-sm text-gray-600">Follow-up after initial contact</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Create New Template</h4>
                    <div className="space-y-3">
                      <Input placeholder="Template name" />
                      <Input placeholder="Subject line" />
                      <Textarea placeholder="Email content..." rows={8} />
                      <Button>Save Template</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Automation Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Auto-Response Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Auto-reply to new inquiries</Label>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Send follow-up after 24 hours</Label>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Priority flagging for high budgets</Label>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Notification Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Email notifications</Label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>SMS notifications</Label>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Push notifications</Label>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Inquiry Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Response Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Average Response Time</span>
                        <span className="font-medium">2.5 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Response Rate</span>
                        <span className="font-medium">95%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversion Rate</span>
                        <span className="font-medium">68%</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Inquiry Sources</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Website</span>
                        <span className="font-medium">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Social Media</span>
                        <span className="font-medium">30%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Referrals</span>
                        <span className="font-medium">25%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 20 Inquiry Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Reply className="w-6 h-6 mb-2" />
                <span className="text-sm">Quick Reply</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Forward className="w-6 h-6 mb-2" />
                <span className="text-sm">Forward Inquiry</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Archive className="w-6 h-6 mb-2" />
                <span className="text-sm">Archive</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Star className="w-6 h-6 mb-2" />
                <span className="text-sm">Mark Important</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Flag className="w-6 h-6 mb-2" />
                <span className="text-sm">Flag Follow-up</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Phone className="w-6 h-6 mb-2" />
                <span className="text-sm">Schedule Call</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Calendar className="w-6 h-6 mb-2" />
                <span className="text-sm">Book Meeting</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Send className="w-6 h-6 mb-2" />
                <span className="text-sm">Send Quote</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Download className="w-6 h-6 mb-2" />
                <span className="text-sm">Export Data</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Upload className="w-6 h-6 mb-2" />
                <span className="text-sm">Import Contacts</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <RefreshCw className="w-6 h-6 mb-2" />
                <span className="text-sm">Sync CRM</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <AlertCircle className="w-6 h-6 mb-2" />
                <span className="text-sm">Set Reminder</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <CheckCircle className="w-6 h-6 mb-2" />
                <span className="text-sm">Mark Resolved</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <XCircle className="w-6 h-6 mb-2" />
                <span className="text-sm">Mark Spam</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <User className="w-6 h-6 mb-2" />
                <span className="text-sm">Client Profile</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <TrendingUp className="w-6 h-6 mb-2" />
                <span className="text-sm">Analytics</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Edit className="w-6 h-6 mb-2" />
                <span className="text-sm">Edit Template</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <MessageCircle className="w-6 h-6 mb-2" />
                <span className="text-sm">Live Chat</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <DollarSign className="w-6 h-6 mb-2" />
                <span className="text-sm">Price Calculator</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Filter className="w-6 h-6 mb-2" />
                <span className="text-sm">Smart Filter</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
