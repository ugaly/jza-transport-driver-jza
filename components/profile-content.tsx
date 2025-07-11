"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Phone, Mail, MapPin, Calendar, Truck, Edit, Camera, Star, Award, TrendingUp } from "lucide-react"

export default function ProfileContent() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Driver Name",
    phone: "+255 123 456 789",
    email: "john.mwalimu@jzatech.com",
    location: "Dar es Salaam, Tanzania",
    licenseNumber: "DL-2024-001234",
    vehicleNumber: "T 123 ABC",
    joinDate: "2024-01-15",
  })

  const handleSave = () => {
    setIsEditing(false)
    // Save profile data
  }

  const handleChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Driver Profile</h1>
        <p className="text-gray-600">Manage your profile and account settings</p>
      </motion.div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    JM
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 bg-blue-600 hover:bg-blue-700"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
                <p className="text-gray-600 mb-2">Professional Driver</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                  <Badge className="bg-blue-100 text-blue-800">Verified</Badge>
                  <Badge className="bg-yellow-100 text-yellow-800">5★ Rating</Badge>
                </div>
              </div>

              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "default" : "outline"}
                className="md:self-start"
              >
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-800">156</p>
            <p className="text-sm text-green-600">Completed Trips</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-800">4.9</p>
            <p className="text-sm text-blue-600">Average Rating</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-800">2</p>
            <p className="text-sm text-purple-600">Years Experience</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Profile Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    value={profileData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="license">License Number</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="license"
                    value={profileData.licenseNumber}
                    onChange={(e) => handleChange("licenseNumber", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicle">Vehicle Number</Label>
                <div className="relative">
                  <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="vehicle"
                    value={profileData.vehicleNumber}
                    onChange={(e) => handleChange("vehicleNumber", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="joinDate">Join Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input id="joinDate" value={profileData.joinDate} disabled className="pl-10 bg-gray-50" />
              </div>
            </div>

            {isEditing && (
              <div className="flex space-x-4 pt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Save Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Completed journey to Mwanza", time: "2 hours ago", type: "success" },
                { action: "Added fuel expense", time: "1 day ago", type: "expense" },
                { action: "Started new journey", time: "2 days ago", type: "info" },
                { action: "Profile updated", time: "1 week ago", type: "info" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      activity.type === "success"
                        ? "bg-green-500"
                        : activity.type === "expense"
                          ? "bg-red-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
