import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Pricing } from "@/components/pricing"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-10">
        <header className="mb-8 flex items-center justify-between">
          <nav className="flex items-center gap-6">
            <Link href="/" className="font-semibold">
              AI Sales Agent
            </Link>
            <a href="#features" className="text-sm text-[#616161] hover:text-black">
              Features
            </a>
            <a href="#pricing" className="text-sm text-[#616161] hover:text-black">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/dashboard">Login</Link>
            </Button>
            <Button asChild className="bg-[#005BFF] hover:bg-[#004AD8]">
              <Link href="/dashboard">Start Free Trial</Link>
            </Button>
          </div>
        </header>

        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-pretty text-4xl font-semibold leading-tight text-[#1F1F1F]">
              Transform Browsers Into Buyers with AI
            </h1>
            <p className="mt-3 text-[#616161]">
              Increase conversion rates by 15%+ and capture unheard customer insights across your store.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild className="bg-[#005BFF] hover:bg-[#004AD8]">
                <Link href="/dashboard">Start Free Trial</Link>
              </Button>
              <Button variant="outline">Watch Demo</Button>
            </div>
          </div>
          <Card>
            <CardContent className="flex h-64 items-center justify-center text-sm text-[#8E8E8E]">
              AI Agent Demo Placeholder
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-[#F9FAFB]">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-balance text-2xl font-semibold">Triple Your Sales Impact</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Instant ROI",
                body: "AI-guided conversations lift conversions with personalized recommendations.",
              },
              {
                title: "Customer Intelligence",
                body: "Discover themes, objections, and top requests to guide roadmap.",
              },
              { title: "24/7 Sales Expert", body: "Always-on agent with accurate answers and escalation paths." },
            ].map((f) => (
              <Card key={f.title}>
                <CardContent className="p-5">
                  <h3 className="mb-1 text-lg font-medium">{f.title}</h3>
                  <p className="text-sm text-[#616161]">{f.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <Pricing />

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-8 text-sm text-[#616161]">
          <span>© {new Date().getFullYear()} AI Sales Agent</span>
          <div className="flex items-center gap-4">
            <a href="#features" className="hover:text-black">
              Features
            </a>
            <a href="#pricing" className="hover:text-black">
              Pricing
            </a>
            <a href="#contact" className="hover:text-black">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
