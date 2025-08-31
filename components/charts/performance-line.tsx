"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type Point = { name: string; ai: number }

export function PerformanceLine() {
  const [data, setData] = useState<Point[] | null>(null)
  useEffect(() => {
    // Hardcoded data for Saturday and Sunday only, AI conversions only
    const hardcodedData: Point[] = [
      { name: 'Sat', ai: 20 }, // Saturday conversions
      { name: 'Sun', ai: 13 }  // Sunday conversions
    ]
    
    setData(hardcodedData)
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
            <Tooltip 
              formatter={(value, name) => [value, 'Conversions']}
              labelFormatter={(label) => `${label === 'Sat' ? 'Saturday' : 'Sunday'}`}
            />
            <Line type="monotone" dataKey="ai" stroke="#005BFF" strokeWidth={3} dot={{ fill: "#005BFF", strokeWidth: 2, r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
