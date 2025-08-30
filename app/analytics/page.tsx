"use client"

import { AppShell } from "@/components/app-shell"
import { DynamicKpis } from "@/components/dynamic-kpis"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarRange, Filter, Share2, TrendingUp, Target } from "lucide-react"
import { RevenueAttribution } from "@/components/charts/revenue-attribution"
import { PerformanceLine } from "@/components/charts/performance-line"
import { VoiceCommerceFunnel } from "@/components/voice-commerce-funnel"
import { VoiceCommerceInsights } from "@/components/voice-commerce-insights"
import Link from "next/link"
import { useEffect, useState } from "react"
import { rtdb } from "@/lib/firebase"
import { get, ref, type Database } from "firebase/database"

export default function AnalyticsPage() {
  const [topConversations, setTopConversations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAnalyticsData() {
      try {
        // Load top conversations data
        const topConvSnap = await get(ref(rtdb as unknown as Database, "sites/default/analytics/topConversations"))
        const topConvData = topConvSnap.val() || []
        
        setTopConversations(Array.isArray(topConvData) ? topConvData : Object.values(topConvData))
        setLoading(false)
      } catch (error) {
        console.error('Error loading analytics data:', error)
        setLoading(false)
      }
    }

    loadAnalyticsData()
    
    // Refresh every 30 seconds
    const interval = setInterval(loadAnalyticsData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <AppShell
      title="Analytics & Performance"
    >
      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Button className="btn-gradient hover-scale" size="sm">
          <CalendarRange className="mr-2 h-4 w-4" />Last 7 days
        </Button>
        <Button variant="outline" size="sm" className="btn-outline-dark">
          <Filter className="mr-2 h-4 w-4" />All Categories
        </Button>
        <Button variant="outline" size="sm" className="btn-outline-dark">
          <Filter className="mr-2 h-4 w-4" />All Sources
        </Button>
        <Button variant="ghost" size="sm" className="hover:bg-gray-50">Reset</Button>
        <div className="ml-auto flex gap-3">
          <Button variant="outline" className="btn-outline-dark">Export</Button>
          <Button asChild className="btn-gradient hover-scale">
            <Link href="/customer-intelligence"><Share2 className="mr-2 h-4 w-4" />Share</Link>
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <DynamicKpis />

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 card-professional hover-lift">
          <CardHeader className="pb-3 bg-gradient-to-r from-gray-50/30 to-transparent rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <div className="w-8 h-8 bg-gradient-dark-card rounded-lg flex items-center justify-center shadow-professional">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              Conversion Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <PerformanceLine />
          </CardContent>
          <CardFooter>
            <Button variant="link" className="p-0 text-gray-600 hover:text-gray-800">
              View Details
            </Button>
          </CardFooter>
        </Card>
        <VoiceCommerceFunnel />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card className="card-professional hover-lift">
          <CardHeader className="pb-3 bg-gradient-to-r from-gray-50/30 to-transparent rounded-t-lg">
            <CardTitle className="text-lg font-semibold text-gray-800">Revenue Attribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <RevenueAttribution />
          </CardContent>
          <CardFooter className="text-sm text-gray-600 bg-gradient-to-r from-gray-50/30 to-transparent rounded-b-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-dark-card rounded-full"></div>
              Total AI-Attributed: <span className="font-semibold text-gray-700">$23,450</span>
            </div>
          </CardFooter>
        </Card>

        <Card className="card-professional hover-lift">
          <CardHeader className="pb-3 bg-gradient-to-r from-gray-50/30 to-transparent rounded-t-lg">
            <CardTitle className="text-lg font-semibold text-gray-800">Top Performing Conversations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm pt-4">
            {loading ? (
              <div className="space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="animate-pulse h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded"></div>
                ))}
              </div>
            ) : topConversations.length > 0 ? (
              topConversations.slice(0, 3).map((conv, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50/30 to-transparent hover:from-gray-50/50 transition-all">
                  <span className="text-gray-700 font-medium">{conv.description}</span>
                  <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full text-xs">{conv.revenue}</span>
                </div>
              ))
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50/30 to-transparent">
                  <span className="text-gray-700 font-medium">Phone camera quality inquiry</span>
                  <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full text-xs">+₹420</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50/30 to-transparent">
                  <span className="text-gray-700 font-medium">Price range voice search</span>
                  <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full text-xs">+₹380</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50/30 to-transparent">
                  <span className="text-gray-700 font-medium">Feature comparison request</span>
                  <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full text-xs">+₹320</span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="link" className="p-0 text-gray-600 hover:text-gray-800">
              View all performance data →
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Voice Commerce Insights */}
      <div className="mt-6">
        <VoiceCommerceInsights />
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-200/50 bg-gradient-to-r from-gray-50/30 to-gray-100/20 px-4 py-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gradient-dark-card rounded-full animate-pulse"></div>
          <span className="font-medium">Data updated: Real-time from Firebase</span>
        </div>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-gray-600" />
          <span className="font-medium">Conversion rate goal: 15%</span>
        </div>
      </div>
    </AppShell>
  )
}
