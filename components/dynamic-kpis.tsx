"use client"

import { useEffect, useState } from "react"
import { KpiCard } from "@/components/kpi-card"
import { rtdb } from "@/lib/firebase"
import { get, ref } from "firebase/database"

type KPIs = {
  conversionRate?: string
  conversionTrend?: string
  avgOrderValue?: string
  aovTrend?: string
  totalConversations?: string
  revenueGenerated?: string
}

export function DynamicKpis() {
  const [kpis, setKpis] = useState<KPIs | null>(null)

  useEffect(() => {
    async function run() {
      try {
        const snap = await get(ref(rtdb, "events"))
        const events = snap.val() || {}
        // Flatten events: events[ip][sessionId][eventId] -> array
        const flattened: any[] = []
        Object.values(events).forEach((ipNode: any) => {
          if (!ipNode) return
          Object.values(ipNode).forEach((sessNode: any) => {
            if (!sessNode) return
            Object.values(sessNode).forEach((ev: any) => flattened.push(ev))
          })
        })

        // Compute metrics
        const sessionsWithUserMsg = new Set<string>()
        let addToCart = 0
        let totalUserMsgs = 0
        const cartTotalsBySession = new Map<string, number>()

        flattened.forEach((e) => {
          if (!e) return
          if (e.type === 'message') {
            if (e.data?.sender === 'user') {
              totalUserMsgs++
              // We don't have sessionId in event here (stored in path), so approximate by ip+t
            }
          }
          if (e.type === 'add_to_cart_success') addToCart++
        })

        // Compute cart totals per ip by taking last cart_update per ip
        const perIpLastTotal = new Map<string, number>()
        Object.entries(events).forEach(([ip, ipNode]: any) => {
          let lastTotal = 0
          Object.values(ipNode || {}).forEach((sessNode: any) => {
            Object.values(sessNode || {}).forEach((ev: any) => {
              if (ev?.type === 'cart_update') {
                lastTotal = ev.data?.total ?? lastTotal
              }
            })
          })
          perIpLastTotal.set(ip, lastTotal)
        })

        const revenueGenerated = Array.from(perIpLastTotal.values()).reduce((a, b) => a + (Number(b) || 0), 0)
        // Sessions with user messages (approx): distinct ip counts with any user message
        const ipsWithUserMsgs = new Set<string>()
        Object.entries(events).forEach(([ip, ipNode]: any) => {
          let has = false
          Object.values(ipNode || {}).forEach((sessNode: any) => {
            Object.values(sessNode || {}).forEach((ev: any) => {
              if (ev?.type === 'message' && ev?.data?.sender === 'user') has = true
            })
          })
          if (has) ipsWithUserMsgs.add(ip)
        })
        const conversationSessions = ipsWithUserMsgs.size || 1
        const conversionRate = (addToCart / conversationSessions) * 100

        setKpis({
          conversionRate: `${conversionRate.toFixed(1)}%`,
          avgOrderValue: `₹${(revenueGenerated / Math.max(1, perIpLastTotal.size)).toFixed(0)}`,
          totalConversations: String(totalUserMsgs),
          revenueGenerated: `₹${revenueGenerated.toFixed(0)}`,
        })
      } catch {
        setKpis({})
      }
    }
    run()
  }, [])

  if (!kpis) {
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {[0,1,2,3].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-md border bg-muted" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <KpiCard title="Conversion Rate" value={kpis.conversionRate || "—"} trend={kpis.conversionTrend} />
      <KpiCard title="Avg Order Value" value={kpis.avgOrderValue || "—"} trend={kpis.aovTrend} accent="green" />
      <KpiCard title="Total Conversations" value={kpis.totalConversations || "—"} />
      <KpiCard title="Revenue Generated" value={kpis.revenueGenerated || "—"} accent="amber" />
    </div>
  )
}
