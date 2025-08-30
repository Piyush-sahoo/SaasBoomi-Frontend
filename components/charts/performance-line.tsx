"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Mon", ai: 12, nonAi: 8 },
  { name: "Tue", ai: 16, nonAi: 9 },
  { name: "Wed", ai: 20, nonAi: 11 },
  { name: "Thu", ai: 23, nonAi: 12 },
  { name: "Fri", ai: 26, nonAi: 13 },
  { name: "Sat", ai: 28, nonAi: 14 },
  { name: "Sun", ai: 30, nonAi: 15 },
]

export function PerformanceLine() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#8E8E8E" />
          <YAxis stroke="#8E8E8E" />
          <Tooltip />
          <Line type="monotone" dataKey="ai" stroke="#005BFF" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="nonAi" stroke="#9CA3AF" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
