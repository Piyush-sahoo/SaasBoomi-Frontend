"use client"

import { AppShell } from "@/components/app-shell"
import { DynamicKpis } from "@/components/dynamic-kpis"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarRange, Filter, Share2, TrendingUp } from "lucide-react"
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
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Button variant="secondary" size="sm"><CalendarRange className="mr-2 h-4 w-4" />Last 7 days</Button>
        <Button variant="secondary" size="sm"><Filter className="mr-2 h-4 w-4" />All Categories</Button>
        <Button variant="secondary" size="sm"><Filter className="mr-2 h-4 w-4" />All Sources</Button>
        <Button variant="ghost" size="sm">Reset</Button>
        <div className="ml-auto flex gap-2">
          <Button variant="outline">Export</Button>
          <Button asChild className="bg-primary text-primary-foreground hover:opacity-90">
            <Link href="/customer-intelligence"><Share2 className="mr-2 h-4 w-4" />Share</Link>
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <DynamicKpis />

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="h-4 w-4" /> Conversion Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceLine />
          </CardContent>
          <CardFooter>
            <Button variant="link" className="p-0">
              View Details
            </Button>
          </CardFooter>
        </Card>
        <VoiceCommerceFunnel />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Revenue Attribution</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueAttribution />
          </CardContent>
          <CardFooter className="text-sm text-[#616161]">Total AI-Attributed: $23,450</CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Top Performing Conversations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-[#616161]">
            {loading ? (
              <div className="space-y-2">
                {[1,2,3].map(i => (
                  <div key={i} className="animate-pulse h-6 bg-gray-200 rounded"></div>
                ))}
              </div>
            ) : topConversations.length > 0 ? (
              topConversations.slice(0, 3).map((conv, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{conv.description}</span>
                  <span className="text-[#10b981]">{conv.revenue}</span>
                </div>
              ))
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Phone camera quality inquiry</span>
                  <span className="text-[#10b981]">+₹420</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Price range voice search</span>
                  <span className="text-[#10b981]">+₹380</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Feature comparison request</span>
                  <span className="text-[#10b981]">+₹320</span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="link" className="p-0">
              View all performance data →
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Voice Commerce Insights */}
      <div className="mt-4">
        <VoiceCommerceInsights />
      </div>

      <div className="mt-4 flex items-center justify-between rounded-md border border-[#E5E7EB] px-3 py-2 text-xs text-[#616161]">
        <span>Data updated: Real-time from Firebase</span>
        <span>Conversion rate goal: 15%</span>
      </div>
    </AppShell>
  )
}
