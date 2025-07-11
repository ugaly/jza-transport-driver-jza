"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Fuel, MapPin, FileText, AlertCircle } from "lucide-react"

interface FuelFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  actionType: "initial" | "refill" | "consume"
  isLoading?: boolean
  error?: string
}

export default function FuelForm({ onSubmit, onCancel, actionType, isLoading = false, error }: FuelFormProps) {
  const [formData, setFormData] = useState({
    litres: "",
    place: "",
    description: "",
  })

  const getFormTitle = () => {
    switch (actionType) {
      case "initial":
        return "Weka Kiwango cha Awali"
      case "refill":
        return "Jaza Mafuta"
      case "consume":
        return "Weka Yaliyobaki"
      default:
        return "Fuel Entry"
    }
  }

  const getFormDescription = () => {
    switch (actionType) {
      case "initial":
        return "Weka kiwango cha mafuta cha awali"
      case "refill":
        return "Jaza mafuta kwenye kituo"
      case "consume":
        return "Weka mafuta yaliyobaki"
      default:
        return "Enter fuel details"
    }
  }

  const getPlaceholder = () => {
    switch (actionType) {
      case "initial":
        return "Mfano: Kiwango cha awali kabla ya safari"
      case "refill":
        return "Mfano: Nimejaza kwenye kituo cha Total"
      case "consume":
        return "Mfano: Mafuta yaliyobaki baada ya safari"
      default:
        return "Describe the fuel entry..."
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      action_type: actionType,
      ...formData,
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={onCancel} disabled={isLoading}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <CardTitle className="flex items-center">
                <Fuel className="w-5 h-5 mr-2 text-blue-600" />
                {getFormTitle()}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">{getFormDescription()}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="litres">Lita</Label>
              <div className="relative">
                <Fuel className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="litres"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.litres}
                  onChange={(e) => handleChange("litres", e.target.value)}
                  className="pl-10 h-12 text-lg"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="place">Mahali</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="place"
                  placeholder="Mfano: Dar es Salaam, Kituo cha Total"
                  value={formData.place}
                  onChange={(e) => handleChange("place", e.target.value)}
                  className="pl-10 h-12"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Maelezo</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <Textarea
                  id="description"
                  placeholder={getPlaceholder()}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="pl-10 min-h-[80px]"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 h-12" disabled={isLoading}>
                Ghairi
              </Button>
              <Button
                type="submit"
                className={`flex-1 h-12 ${
                  actionType === "refill"
                    ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    : actionType === "consume"
                      ? "bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                } disabled:opacity-50`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Inahifadhi...</span>
                  </div>
                ) : (
                  "Hifadhi"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
