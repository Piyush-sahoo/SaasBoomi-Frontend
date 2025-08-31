"use client"

import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { rtdb } from "@/lib/firebase"
import { get, ref } from "firebase/database"
import { RefreshCw, Brain, Sparkles } from "lucide-react"

type Summary = {
  newInsights?: { value?: number | string; trend?: string }
  trendingTopics?: { value?: number | string; trend?: string }
  sentiment?: { value?: number | string; trend?: string }
  actionItems?: { value?: number | string; trend?: string }
}

type Insight = { title?: string; quote?: string; color?: string; actions?: string[] }
type Objection = { label?: string; percent?: number }
type Interest = { label?: string; value?: number; color?: string }

export default function CustomerIntelligencePage() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [insights, setInsights] = useState<Insight[]>([])
  const [objections, setObjections] = useState<Objection[]>([])
  const [interestMap, setInterestMap] = useState<Interest[]>([])
  const [journey, setJourney] = useState<string[]>([])
  const [footer, setFooter] = useState<{ updated?: string; accuracy?: string; pending?: string } | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  // Function to load hardcoded data as requested
  const loadData = async () => {
    // Hardcoded customer intelligence data
    const hardcodedSummary = {
      newInsights: { value: 3, trend: "↑ This week" },
      trendingTopics: { value: 5, trend: "↑ Active" },
      sentiment: { value: "Positive", trend: "↑ 85% satisfaction" },
      // Action Items Generated removed as requested
    }

    const hardcodedInsights = [
      {
        title: "Voice commands drive 35% higher conversion rates",
        quote: "I prefer speaking to the assistant rather than typing - it feels more natural and faster",
        color: "bg-blue-50 border-blue-200",
        actions: [
          "Promote voice feature more prominently on homepage",
          "Add voice tutorials for new users",
          "Optimize voice recognition for mobile users"
        ]
      },
      {
        title: "Mobile users prefer shorter interaction sessions (8-10 mins)",
        quote: "On mobile, I want quick answers. The voice assistant helps me find what I need fast",
        color: "bg-green-50 border-green-200", 
        actions: [
          "Optimize mobile voice interface for speed",
          "Implement quick product suggestions",
          "Add voice shortcuts for common queries"
        ]
      },
      {
        title: "Product search queries peak during lunch hours (12-2 PM)",
        quote: "I usually browse phones during lunch break when I have free time",
        color: "bg-purple-50 border-purple-200",
        actions: [
          "Schedule targeted notifications during peak hours",
          "Prepare lunch-time product recommendations",
          "Ensure optimal server capacity during 12-2 PM"
        ]
      }
    ]

    const hardcodedObjections = [
      { label: "Price concerns", percent: 32 },
      { label: "Feature comparisons needed", percent: 28 },
      { label: "Warranty questions", percent: 23 },
      { label: "Delivery time concerns", percent: 17 }
    ]

    const hardcodedInterestMap = [
      { label: "iPhone 15 Pro", value: 85, color: "bg-blue-500" },
      { label: "Samsung Galaxy S24", value: 72, color: "bg-green-500" },
      { label: "Phones under ₹30K", value: 68, color: "bg-purple-500" },
      { label: "Gaming phones", value: 45, color: "bg-orange-500" },
      { label: "Camera quality", value: 89, color: "bg-red-500" }
    ]

    const hardcodedJourney = [
      "User arrives via voice search",
      "Engages with AI assistant",
      "Asks about product specifications", 
      "Compares 2-3 options",
      "Adds preferred item to cart",
      "Proceeds to checkout"
    ]

    const hardcodedFooter = {
      updated: new Date().toLocaleString(),
      accuracy: "94.2%",
      pending: "0 items" // No action items as requested
    }

    setSummary(hardcodedSummary)
    setInsights(hardcodedInsights)
    setObjections(hardcodedObjections)
    setInterestMap(hardcodedInterestMap)
    setJourney(hardcodedJourney)
    setFooter(hardcodedFooter)
    setLastRefresh(new Date())
  }

  // Function to trigger insight generation
  const generateInsights = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('http://voice-agent-server-443142017693.asia-south1.run.app/api/generate-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (response.ok) {
        console.log('✅ Insight generation triggered')
        // Wait a moment then refresh data
        setTimeout(() => {
          loadData()
        }, 3000)
      } else {
        console.error('Failed to trigger insight generation')
      }
    } catch (error) {
      console.error('Error triggering insights:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    loadData()
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(loadData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <AppShell title="Customer Intelligence">
      {/* Control Panel */}
      <div className="mb-4 flex items-center justify-between rounded-lg border bg-gradient-to-r from-blue-50 to-purple-50 p-4">
        <div className="flex items-center gap-3">
          <Brain className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="font-medium text-gray-900">AI-Powered Customer Insights</h3>
            <p className="text-sm text-gray-600">
              {lastRefresh ? `Last updated: ${lastRefresh.toLocaleTimeString()}` : 'Loading insights...'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadData}
            disabled={isGenerating}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button 
            onClick={generateInsights}
            disabled={isGenerating}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            size="sm"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isGenerating ? 'Generating...' : 'Generate Insights'}
          </Button>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid gap-4 md:grid-cols-3">
        {(() => {
          const s = summary || {}
          const cards = [
            { label: "New Insights This Week", v: s.newInsights },
            { label: "Trending Topics", v: s.trendingTopics },
            { label: "Customer Sentiment", v: s.sentiment },
            // Action Items Generated removed as requested
          ]
          return cards.map((c) => (
            <Card key={c.label}>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">{c.label}</div>
                <div className="text-2xl font-semibold text-primary">{c.v?.value ?? "—"}</div>
                <div className="text-xs text-emerald-500">{c.v?.trend ?? ""}</div>
              </CardContent>
            </Card>
          ))
        })()}
      </div>

      {/* Voice Insights + Objections */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Customer Voice Insights - What They're Really Thinking</span>
              {insights.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">
                    {insights.length} insights available
                  </span>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.length === 0 ? (
              <div className="text-center py-8">
                <Brain className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="text-sm text-muted-foreground">No insights generated yet</div>
                <p className="text-xs text-gray-500 mt-1">
                  Customer conversations will be automatically analyzed to generate insights
                </p>
              </div>
            ) : (
              insights.map((i, idx) => (
                <div key={(i.title || "insight") + idx} className={`rounded-md border p-4 ${i.color || "bg-blue-50 border-blue-200"} transition-all hover:shadow-md`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-sm font-medium text-gray-900">{i.title}</div>
                    <Sparkles className="h-4 w-4 text-blue-500" />
                  </div>
                  {i.quote && (
                    <blockquote className="mt-2 border-l-4 border-blue-300 pl-3 text-sm text-gray-700 italic">
                      "{i.quote}"
                    </blockquote>
                  )}
                  {Array.isArray(i.actions) && i.actions.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-gray-600 mb-1">Recommended Actions:</p>
                      <ul className="space-y-1">
                        {i.actions.map((a, k) => (
                          <li key={k} className="text-xs text-gray-600 flex items-start">
                            <span className="mr-2 text-blue-500">•</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Objection Patterns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {objections.length === 0 ? (
              <div className="text-sm text-muted-foreground">No data</div>
            ) : (
              objections.map((o, i) => (
                <div key={(o.label || "obj") + i} className="rounded-md border p-2">
                  {o.label} — {o.percent ?? "—"}%
                </div>
              ))
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full bg-transparent">
              Analyze Patterns
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Product Map + Journey */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Product Interest Map</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {interestMap.length === 0 ? (
              <div className="text-sm text-muted-foreground">No data</div>
            ) : (
              interestMap.map((row, i) => (
                <div key={(row.label || "item") + i}>
                  <div className="mb-1 flex items-center justify-between">
                    <span>{row.label}</span>
                    <span className="text-muted-foreground">{row.value}</span>
                  </div>
                  <div className="h-2 w-full rounded bg-muted">
                    <div className={`h-2 rounded ${row.color || "bg-primary"}`} style={{ width: `${Math.min(100, Number(row.value) || 0)}%` }} />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Customer Journey Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {journey.length === 0 ? (
              <div className="text-sm text-muted-foreground">No data</div>
            ) : (
              journey.map((p, i) => (
                <div key={i} className="rounded border px-3 py-2 text-sm">
                  {p}
                </div>
              ))
            )}
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary text-primary-foreground hover:opacity-90">
              <Link href="/analytics">View Journey Details</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-md border px-3 py-2 text-xs text-muted-foreground">
        <span>Insights updated: {footer?.updated || "—"}</span>
        <span>Sentiment accuracy: {footer?.accuracy || "—"}</span>
        <span>Action items: {footer?.pending || "—"}</span>
      </div>
    </AppShell>
  )
}
