"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts"
import { rtdb } from "@/lib/firebase"
import { get, ref } from "firebase/database"

type Item = { name: string; value: number; fill?: string }

export function RevenueAttribution() {
  const [data, setData] = useState<Item[] | null>(null)
  useEffect(() => {
    async function run() {
      try {
        const snap = await get(ref(rtdb, "events"))
        const events = snap.val() || {}
        let add = 0, view = 0, engage = 0
        Object.values(events).forEach((ipNode: any) => {
          Object.values(ipNode || {}).forEach((sessNode: any) => {
            Object.values(sessNode || {}).forEach((ev: any) => {
              if (!ev) return
              if (ev.type === 'add_to_cart_success') add++
              if (ev.type === 'view_cart') view++
              if (ev.type === 'message') engage++
            })
          })
        })
        setData([
          { name: 'Add to Cart', value: add, fill: '#3b82f6' },
          { name: 'Cart Views', value: view, fill: '#10b981' },
          { name: 'Engagement', value: engage, fill: '#f59e0b' },
        ])
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
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#8E8E8E" />
            <YAxis stroke="#8E8E8E" />
            <Tooltip />
            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill || "#3b82f6"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
