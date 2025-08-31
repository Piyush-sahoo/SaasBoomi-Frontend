"use client"

import { useEffect, useState } from "react"
import { KpiCard } from "@/components/kpi-card"
import { rtdb } from "@/lib/firebase"
import { get, ref, type Database } from "firebase/database"
import { TrendingUp, DollarSign, MessageCircle, Rocket } from "lucide-react"

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
    // Hardcoded KPI data as requested
    const hardcodedKpis = {
      conversionRate: "12.5%", // 12 converted / 41 visitors * 100
      conversionTrend: "↑ 8.2%",
      avgOrderValue: "₹38,500",
      aovTrend: "↑ 15.3%",
      totalConversations: "33", // Total conversions = 33
      revenueGenerated: "₹4,87,250",
    }
    
    setKpis(hardcodedKpis)
  }, [])

  if (!kpis) {
    return (
      <div className="grid gap-6 md:grid-cols-4">
        {[0,1,2,3].map((i) => (
          <div key={i} className="h-32 animate-pulse rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-200/30" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-4">
      <KpiCard title="Conversion Rate" value={kpis.conversionRate || "—"} trend={kpis.conversionTrend} icon={TrendingUp} />
      <KpiCard title="Avg Order Value" value={kpis.avgOrderValue || "—"} trend={kpis.aovTrend} accent="green" icon={DollarSign} />
      <KpiCard title="Total Conversations" value={kpis.totalConversations || "—"} icon={MessageCircle} />
      <KpiCard title="Revenue Generated" value={kpis.revenueGenerated || "—"} accent="amber" icon={Rocket} />
    </div>
  )
}
