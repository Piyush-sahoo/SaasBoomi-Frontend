import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Pricing() {
  const tiers = [
    {
      name: "Growth",
      price: "$99/mo",
      features: ["Core analytics", "Basic insights", "Email support"],
      cta: "Start Free Trial",
    },
    {
      name: "Pro",
      price: "$299/mo",
      features: ["Advanced analytics", "Customer intelligence", "Priority support"],
      cta: "Start Free Trial",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["SLA & SSO", "Custom reports", "Dedicated success"],
      cta: "Contact Sales",
    },
  ]
  return (
    <section id="pricing" className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-3">
      {tiers.map((t) => (
        <Card key={t.name} className={t.highlight ? "border-2 border-[#005BFF]" : ""}>
          <CardHeader>
            <CardTitle className="flex items-baseline justify-between">
              <span>{t.name}</span>
              <span className="text-xl text-[#005BFF]">{t.price}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-[#616161]">
              {t.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            {t.name === "Enterprise" ? (
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="#contact">Contact Sales</Link>
              </Button>
            ) : (
              <Button asChild className="w-full bg-[#005BFF] hover:bg-[#004AD8]">
                <Link href="/dashboard">Start Free Trial</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </section>
  )
}
