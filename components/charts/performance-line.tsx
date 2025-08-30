"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { rtdb } from "@/lib/firebase"
import { get, ref } from "firebase/database"

type Point = { name: string; ai: number; nonAi: number }

export function PerformanceLine() {
  const [data, setData] = useState<Point[] | null>(null)
  useEffect(() => {
    async function run() {
      try {
        const snap = await get(ref(rtdb, "sites/default/metrics/performance"))
        const val = snap.val() || []
        let items: any[] = []
        if (Array.isArray(val)) items = val.filter(Boolean)
        else items = Object.values(val)
        items.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
        setData(items as Point[])
      } catch (e) {
        setData([])
      }
    }
    run()
  }, [])

  return (
    <div className="h-64 w-full">
      {!data ? (
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Loading…</div>
      ) : data.length === 0 ? (
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No data</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#8E8E8E" />
            <YAxis stroke="#8E8E8E" />
            <Tooltip />
            <Line type="monotone" dataKey="ai" stroke="#005BFF" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="nonAi" stroke="#9CA3AF" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
