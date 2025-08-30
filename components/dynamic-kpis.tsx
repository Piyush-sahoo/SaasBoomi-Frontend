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
        const snap = await get(ref(rtdb, "sites/default/kpis"))
        const val = snap.val()
        setKpis((val || {}) as KPIs)
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
