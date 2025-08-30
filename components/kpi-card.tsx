import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type KPIProps = {
  title: string
  value: string
  sublabel?: string
  trend?: string
  accent?: "blue" | "green" | "amber"
}

const colorByAccent = {
  blue: "text-[#005BFF]",
  green: "text-[#10b981]",
  amber: "text-[#f59e0b]",
}

export function KpiCard({ title, value, sublabel, trend, accent = "blue" }: KPIProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-[#616161]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-semibold ${colorByAccent[accent]}`}>{value}</div>
        {sublabel && <p className="mt-1 text-xs text-[#8E8E8E]">{sublabel}</p>}
        {trend && <p className="mt-1 text-xs text-[#10b981]">{trend}</p>}
      </CardContent>
    </Card>
  )
}
