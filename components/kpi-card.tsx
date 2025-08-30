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
    <Card className="hover:border-primary/40 transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-semibold ${colorByAccent[accent]}`}>{value}</div>
        {sublabel && <p className="mt-1 text-xs text-muted-foreground">{sublabel}</p>}
        {trend && <p className="mt-1 text-xs text-emerald-500">{trend}</p>}
      </CardContent>
    </Card>
  )
}
