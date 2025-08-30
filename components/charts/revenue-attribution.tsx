"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "AI Direct", value: 19720, fill: "#005BFF" },
  { name: "AI Influenced", value: 2980, fill: "#10b981" },
  { name: "Upsells", value: 750, fill: "#f59e0b" },
]

export function RevenueAttribution() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#8E8E8E" />
          <YAxis stroke="#8E8E8E" />
          <Tooltip />
          <Bar dataKey="value">
            {data.map((entry, index) => (
              <cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
