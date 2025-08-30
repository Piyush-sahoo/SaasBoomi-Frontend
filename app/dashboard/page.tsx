import { AppShell } from "@/components/app-shell"
import { DynamicKpis } from "@/components/dynamic-kpis"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PerformanceLine } from "@/components/charts/performance-line"
import { LineChart, Rocket, Settings2 } from "lucide-react"

export default function DashboardPage() {
  return (
    <AppShell title="Good morning! Here's your AI Sales Agent performance today">
      {/* KPIs */}
      <DynamicKpis />

      {/* Charts and lists */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base"><LineChart className="h-4 w-4" /> Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceLine />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Conversations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-[#616161]">
            <div className="flex items-center justify-between">
              <span>Customer asked about drone specs</span>
              <span className="text-[#10b981]">+$450</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Upsold camera accessories</span>
              <span className="text-[#10b981]">+$280</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Resolved shipping question</span>
              <span className="text-[#10b981]">Info</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="link" asChild className="p-0">
              <Link href="/analytics">View all conversations →</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Actions & insights */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base"><Rocket className="h-4 w-4" /> AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-sm">
              "Your customers are asking about warranty 23% more this week"
              <div className="mt-3 flex gap-2">
                <Button size="sm" className="bg-[#005BFF] hover:bg-[#004AD8]">
                  Implement Suggestion
                </Button>
                <Button size="sm" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base"><Settings2 className="h-4 w-4" /> Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button asChild className="bg-[#005BFF] hover:bg-[#004AD8]">
              <Link href="/ai-config">Configure AI Agent</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/analytics">View Full Analytics</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/customer-intelligence">View Customer Insights</Link>
            </Button>
            <Button variant="outline">Download Report</Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
