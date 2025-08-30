import { AppShell } from "@/components/app-shell"
import { KpiCard } from "@/components/kpi-card"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RevenueAttribution } from "@/components/charts/revenue-attribution"
import { PerformanceLine } from "@/components/charts/performance-line"
import Link from "next/link"

export default function AnalyticsPage() {
  return (
    <AppShell
      title="Analytics & Performance"
    >
      {/* Filters */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm">
          Last 7 days
        </Button>
        <Button variant="outline" size="sm">
          All Categories
        </Button>
        <Button variant="outline" size="sm">
          All Sources
        </Button>
        <Button variant="ghost" size="sm">
          Reset Filters
        </Button>
        <div className="ml-auto flex gap-2">
          <Button variant="outline">Export</Button>
          <Button asChild className="bg-[#005BFF] hover:bg-[#004AD8]">
            <Link href="/customer-intelligence">Share</Link>
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard title="Conversion Rate" value="12.5%" trend="↑ 2.1% vs last week" />
        <KpiCard title="Avg Order Value" value="$156" trend="↑ $12 vs last week" accent="green" />
        <KpiCard title="Total Conversations" value="1,247" />
        <KpiCard title="Revenue Generated" value="$23,450" accent="amber" />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Conversion Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceLine />
          </CardContent>
          <CardFooter>
            <Button variant="link" className="p-0">
              View Details
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Conversation Flow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-md bg-[#E5F0FF] px-3 py-2">Visitors — 5,234</div>
            <div className="rounded-md bg-[#DCEAFE] px-3 py-2">Engaged — 3,768 (72%)</div>
            <div className="rounded-md bg-[#C7DBFF] px-3 py-2">Qualified — 1,890 (50%)</div>
            <div className="rounded-md bg-[#B5CEFF] px-3 py-2">Converted — 472 (25%)</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Revenue Attribution</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueAttribution />
          </CardContent>
          <CardFooter className="text-sm text-[#616161]">Total AI-Attributed: $23,450</CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Top Performing Conversations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-[#616161]">
            <div className="flex items-center justify-between">
              <span>Drone comparison query</span>
              <span className="text-[#10b981]">+$450</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Camera accessory help</span>
              <span className="text-[#10b981]">+$280</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Warranty explanation</span>
              <span className="text-[#10b981]">+$320</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="p-0">
              View all performance data →
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-md border border-[#E5E7EB] px-3 py-2 text-xs text-[#616161]">
        <span>Data updated: 2 minutes ago</span>
        <span>Conversion rate goal: 15%</span>
      </div>
    </AppShell>
  )
}
