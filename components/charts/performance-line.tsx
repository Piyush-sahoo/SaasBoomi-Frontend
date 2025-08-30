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
        const snap = await get(ref(rtdb, "events"))
        const events = snap.val() || {}
        const buckets: Record<string, { ai: number; nonAi: number }> = {}
        const now = Date.now()
        const day = 24 * 60 * 60 * 1000
        function dayKey(ts: number) {
          const d = new Date(ts)
          return d.toLocaleDateString(undefined, { weekday: 'short' })
        }
        Object.values(events).forEach((ipNode: any) => {
          Object.values(ipNode || {}).forEach((sessNode: any) => {
            Object.values(sessNode || {}).forEach((ev: any) => {
              if (!ev || ev.type !== 'message') return
              const ts = Number(ev.t || now)
              if (now - ts > 7 * day) return
              const key = dayKey(ts)
              if (!buckets[key]) buckets[key] = { ai: 0, nonAi: 0 }
              if (ev.data?.sender === 'assistant') buckets[key].ai++
              if (ev.data?.sender === 'user') buckets[key].nonAi++
            })
          })
        })
        const labels = Array.from({ length: 7 }, (_, i) => dayKey(now - (6 - i) * day))
        const pts: Point[] = labels.map((k) => ({ name: k, ai: buckets[k]?.ai || 0, nonAi: buckets[k]?.nonAi || 0 }))
        setData(pts)
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
