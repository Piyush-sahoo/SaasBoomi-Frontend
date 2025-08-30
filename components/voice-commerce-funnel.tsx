"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { subscribeToVoiceCommerceMetrics, type VoiceCommerceMetrics } from "@/lib/voice-commerce-analytics"
import { Users, MessageSquare, ShoppingCart, CreditCard, TrendingUp, Clock, Search } from "lucide-react"

export function VoiceCommerceFunnel() {
  const [metrics, setMetrics] = useState<VoiceCommerceMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToVoiceCommerceMetrics((newMetrics) => {
      setMetrics(newMetrics)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-pulse text-muted-foreground">Loading voice commerce metrics...</div>
        </CardContent>
      </Card>
    )
  }

  if (!metrics) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">No data available</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Funnel */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Voice Commerce Funnel (Real-time)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="rounded-md bg-[#E5F0FF] px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Visitors</span>
            </div>
            <span className="font-bold">{metrics.visited.toLocaleString()}</span>
          </div>
          
          <div className="rounded-md bg-[#DCEAFE] px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-700" />
              <span className="font-medium">Engaged (Spoke with AI)</span>
            </div>
            <div className="text-right">
              <span className="font-bold">{metrics.engaged.toLocaleString()}</span>
              <span className="text-xs text-gray-600 ml-2">({metrics.engagementRate}%)</span>
            </div>
          </div>
          
          <div className="rounded-md bg-[#C7DBFF] px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-blue-800" />
              <span className="font-medium">Qualified (Added to Cart)</span>
            </div>
            <div className="text-right">
              <span className="font-bold">{metrics.qualified.toLocaleString()}</span>
              <span className="text-xs text-gray-600 ml-2">({metrics.qualificationRate}%)</span>
            </div>
          </div>
          
          <div className="rounded-md bg-[#B5CEFF] px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-blue-900" />
              <span className="font-medium">Converted (Checkout Click)</span>
            </div>
            <div className="text-right">
              <span className="font-bold">{metrics.converted.toLocaleString()}</span>
              <span className="text-xs text-gray-600 ml-2">({metrics.conversionRate}%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="h-3 w-3" />
              Avg Session Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.floor(metrics.avgSessionTime / 60)}m {metrics.avgSessionTime % 60}s
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Per engaged user
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Cart Abandonment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {metrics.cartAbandonment}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Added but not checked out
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Search Queries */}
      {metrics.topSearchQueries.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Search className="h-3 w-3" />
              Top Search Queries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {metrics.topSearchQueries.map((query, index) => (
                <div key={index} className="text-xs py-1 px-2 bg-gray-50 rounded">
                  {index + 1}. {query}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Last Updated */}
      <div className="text-xs text-muted-foreground text-center">
        Last updated: {new Date(metrics.lastUpdated).toLocaleTimeString()}
      </div>
    </div>
  )
}