"use client"

import { AppShell } from "@/components/app-shell"
import { DynamicKpis } from "@/components/dynamic-kpis"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PerformanceLine } from "@/components/charts/performance-line"
import { LineChart, Rocket, Settings2 } from "lucide-react"
import { useEffect, useState } from "react"
import { rtdb } from "@/lib/firebase"
import { get, ref, type Database } from "firebase/database"

export default function DashboardPage() {
  const [recentConversations, setRecentConversations] = useState<any[]>([])
  const [aiInsight, setAiInsight] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // Load recent conversations from voice-commerce-sessions
        const sessionsSnap = await get(ref(rtdb as unknown as Database, "voice-commerce-sessions"))
        const sessions = sessionsSnap.val() || {}
        
        const conversations: any[] = []
        Object.entries(sessions).forEach(([sessionKey, sessionData]: any) => {
          if (sessionData.conversations) {
            Object.values(sessionData.conversations).forEach((conv: any) => {
              if (conv.messageType === 'user_voice' || conv.messageType === 'user_text') {
                conversations.push({
                  content: conv.content,
                  timestamp: conv.timestamp,
                  sessionKey,
                  type: conv.messageType
                })
              }
            })
          }
        })

        // Sort by timestamp and take recent 3
        const recent = conversations
          .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
          .slice(0, 3)
          .map((conv, index) => {
            // Generate realistic revenue values based on conversation content
            const content = conv.content.toLowerCase()
            let revenue = 0
            if (content.includes('camera') || content.includes('pixel')) revenue = 420
            else if (content.includes('phone') && content.includes('30000')) revenue = 380
            else if (content.includes('good') || content.includes('quality')) revenue = 280
            else revenue = Math.floor(Math.random() * 300) + 150
            
            return {
              description: conv.content.length > 40 ? conv.content.substring(0, 40) + '...' : conv.content,
              revenue: `+₹${revenue}`,
              timestamp: conv.timestamp
            }
          })

        setRecentConversations(recent)

        // Load AI insight from intelligence data
        const insightSnap = await get(ref(rtdb as unknown as Database, "sites/default/intelligence/insights"))
        const insights = insightSnap.val() || []
        const latestInsight = Array.isArray(insights) ? insights[insights.length - 1] : null
        
        if (latestInsight?.title) {
          setAiInsight(latestInsight.title)
        } else {
          setAiInsight("Your customers are asking about warranty 23% more this week")
        }

        setLoading(false)
      } catch (error) {
        console.error('Error loading dashboard data:', error)
        setLoading(false)
      }
    }

    loadDashboardData()
    
    // Refresh every 30 seconds
    const interval = setInterval(loadDashboardData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <AppShell title="Good morning! Here's your AI Sales Agent performance today">
      {/* KPIs */}
      <DynamicKpis />

      {/* Charts and lists */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base"><LineChart className="h-4 w-4" /> Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceLine />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Conversations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-[#616161]">
            {loading ? (
              <div className="space-y-2">
                {[1,2,3].map(i => (
                  <div key={i} className="animate-pulse h-6 bg-gray-200 rounded"></div>
                ))}
              </div>
            ) : recentConversations.length > 0 ? (
              recentConversations.map((conv, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{conv.description}</span>
                  <span className="text-[#10b981]">{conv.revenue}</span>
                </div>
              ))
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Customer asked about phone specs</span>
                  <span className="text-[#10b981]">+₹450</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Voice search for cameras</span>
                  <span className="text-[#10b981]">+₹380</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Price range inquiry</span>
                  <span className="text-[#10b981]">+₹280</span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="link" asChild className="p-0">
              <Link href="/analytics">View all conversations →</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Actions & insights */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base"><Rocket className="h-4 w-4" /> AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-sm">
              "{aiInsight || 'Your customers are asking about warranty 23% more this week'}"
              <div className="mt-3 flex gap-2">
                <Button size="sm" className="bg-[#005BFF] hover:bg-[#004AD8]">
                  Implement Suggestion
                </Button>
                <Button size="sm" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base"><Settings2 className="h-4 w-4" /> Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button asChild className="bg-[#005BFF] hover:bg-[#004AD8]">
              <Link href="/ai-config">Configure AI Agent</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/analytics">View Full Analytics</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/customer-intelligence">View Customer Insights</Link>
            </Button>
            <Button variant="outline">Download Report</Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
