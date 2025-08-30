import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CustomerIntelligencePage() {
  return (
    <AppShell
      title="Customer Intelligence"
    >
      {/* Summary KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-[#616161]">New Insights This Week</div>
            <div className="text-2xl font-semibold text-[#005BFF]">23</div>
            <div className="text-xs text-[#10b981]">↑ 15% vs last week</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-[#616161]">Trending Topics</div>
            <div className="text-2xl font-semibold text-[#005BFF]">8</div>
            <div className="text-xs text-[#10b981]">+3 new topics</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-[#616161]">Customer Sentiment</div>
            <div className="text-2xl font-semibold text-[#10b981]">92%</div>
            <div className="text-xs text-[#10b981]">↑ 2% improvement</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-[#616161]">Action Items Generated</div>
            <div className="text-2xl font-semibold text-[#005BFF]">12</div>
            <div className="text-xs text-[#10b981]">+4 new items</div>
          </CardContent>
        </Card>
      </div>

      {/* Voice Insights + Objections */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Customer Voice Insights - What They're Really Thinking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                title: "Trending Now",
                quote: "I wish I knew how long the battery actually lasts in real use",
                color: "bg-[#FFF7D6] border-[#FDE68A]",
              },
              {
                title: "Price Sensitivity",
                quote: "This seems expensive, but I don't know what makes it worth it",
                color: "bg-[#E6F6FF] border-[#BAE6FD]",
              },
              {
                title: "Beginner Concerns",
                quote: "I'm worried about breaking this if I'm a beginner",
                color: "bg-[#FFECEF] border-[#FECDD3]",
              },
            ].map((i) => (
              <div key={i.title} className={`rounded-md border p-3 ${i.color}`}>
                <div className="text-sm font-medium">{i.title}</div>
                <blockquote className="mt-1 text-sm text-[#616161]">"{i.quote}"</blockquote>
                <ul className="mt-2 list-disc pl-5 text-xs text-[#616161]">
                  <li>Insight: Add real-world usage details to product pages.</li>
                  <li>Action: Update descriptions and comparison charts.</li>
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Objection Patterns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-md border border-[#E5E7EB] p-2">Price Objections — 34%</div>
            <div className="rounded-md border border-[#E5E7EB] p-2">Timing Objections — 28%</div>
            <div className="rounded-md border border-[#E5E7EB] p-2">Technical Doubts — 23%</div>
            <div className="rounded-md border border-[#E5E7EB] p-2">Shipping Concerns — 15%</div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full bg-transparent">
              Analyze Patterns
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Product Map + Journey */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Product Interest Map</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              { label: "Drones & Accessories", value: 158, color: "bg-[#1D4ED8]" },
              { label: "Camera Equipment", value: 124, color: "bg-[#059669]" },
              { label: "Audio Systems", value: 89, color: "bg-[#7C3AED]" },
              { label: "Smart Home", value: 67, color: "bg-[#F59E0B]" },
              { label: "Other", value: 23, color: "bg-[#EF4444]" },
            ].map((row) => (
              <div key={row.label}>
                <div className="mb-1 flex items-center justify-between">
                  <span>{row.label}</span>
                  <span className="text-[#616161]">{row.value}</span>
                </div>
                <div className="h-2 w-full rounded bg-[#E5E7EB]">
                  <div className={`h-2 rounded ${row.color}`} style={{ width: `${Math.min(100, row.value)}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Customer Journey Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="rounded border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-2 text-sm">Discovery Phase</div>
            <div className="rounded border border-[#E9D5FF] bg-[#F5F3FF] px-3 py-2 text-sm">Evaluation Phase</div>
            <div className="rounded border border-[#BBF7D0] bg-[#ECFDF5] px-3 py-2 text-sm">Decision Phase</div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-[#005BFF] hover:bg-[#004AD8]">
              <Link href="/analytics">View Journey Details</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-md border border-[#E5E7EB] px-3 py-2 text-xs text-[#616161]">
        <span>Insights updated: Real-time</span>
        <span>Sentiment accuracy: 94%</span>
        <span>Action items: 12 pending</span>
      </div>
    </AppShell>
  )
}
