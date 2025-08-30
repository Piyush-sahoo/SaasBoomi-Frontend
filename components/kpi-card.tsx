import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

type KPIProps = {
  title: string
  value: string
  sublabel?: string
  trend?: string
  accent?: "blue" | "green" | "amber"
  icon?: LucideIcon
}

const gradientByAccent = {
  blue: "from-gray-900 via-gray-700 to-gray-500",
  green: "from-gray-800 via-gray-600 to-gray-400",
  amber: "from-black via-gray-800 to-gray-600",
}

const bgByAccent = {
  blue: "from-gray-50 to-gray-100",
  green: "from-gray-50 to-gray-100",
  amber: "from-gray-50 to-gray-100",
}

export function KpiCard({ title, value, sublabel, trend, accent = "blue", icon }: KPIProps) {
  return (
    <Card className="card-professional hover-lift group">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
          {title}
          {icon && (
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradientByAccent[accent]} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              {React.createElement(icon, { className: "w-5 h-5 text-white" })}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-bold text-gray-800 mb-2">{value}</div>
        {sublabel && <p className="text-xs text-gray-500 mb-2">{sublabel}</p>}
        {trend && (
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${bgByAccent[accent]} text-gray-700`}>
            {trend}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
