"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Pricing } from "@/components/pricing"
import { Card, CardContent } from "@/components/ui/card"
import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import { rtdb } from "@/lib/firebase"
import { get, ref } from "firebase/database"

export default function LandingPage() {
  const prefersReduced = useReducedMotion()
  const fadeUp = {
    initial: { opacity: 0, y: prefersReduced ? 0 : 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] } },
  }
  const stagger = {
    animate: { transition: { staggerChildren: 0.06 } },
  }
  const [hero, setHero] = useState<{ title: string; subtitle: string } | null>(null)
  const [features, setFeatures] = useState<Array<{ title: string; body: string; order?: number }>>([])

  useEffect(() => {
    async function run() {
      try {
        const heroSnap = await get(ref(rtdb, "sites/default/home"))
        const heroVal = heroSnap.val()
        if (heroVal) setHero(heroVal)
      } catch {}
      try {
        const featSnap = await get(ref(rtdb, "sites/default/features"))
        const val = featSnap.val() || []
        let items: any[] = []
        if (Array.isArray(val)) items = val.filter(Boolean)
        else items = Object.values(val)
        items.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
        setFeatures(items)
      } catch {}
    }
    run()
  }, [])
  return (
    <main>
      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-4 pb-12 pt-10">
        {/* Subtle background accent */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-120px] h-[340px] w-[640px] -translate-x-1/2 rounded-full bg-[oklch(0.97_0.03_250)] blur-3xl dark:bg-[oklch(0.23_0.03_250)]" />
        </div>
        <header className="mb-8 flex items-center justify-between">
          <nav className="flex items-center gap-6">
            <Link href="/" className="font-semibold tracking-tight">
              <span className="rounded-md bg-muted px-2 py-1 text-xs">ALPHA</span> <span className="ml-2">AI Sales Agent</span>
            </Link>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/dashboard">Login</Link>
            </Button>
            <Button asChild className="bg-primary text-primary-foreground hover:opacity-90">
              <Link href="/dashboard">Start Free Trial</Link>
            </Button>
          </div>
        </header>

        <motion.div variants={stagger} initial="initial" animate="animate" className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.h1 variants={fadeUp} className="text-pretty text-4xl font-semibold leading-tight tracking-tight">
              {hero?.title || ""}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-3 text-muted-foreground">
              {hero?.subtitle || ""}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild className="bg-primary text-primary-foreground hover:opacity-90">
                <Link href="/dashboard">Start Free Trial</Link>
              </Button>
              <Button variant="outline">Watch Demo</Button>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
              <span>• PCI compliant</span>
              <span>• Shopify native</span>
              <span>• 2‑minute setup</span>
            </motion.div>
          </div>
          <motion.div variants={fadeUp}>
            <Card className="border-muted">
              <CardContent className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                AI Agent Demo Placeholder
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-balance text-2xl font-semibold tracking-tight">Triple Your Sales Impact</h2>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
            className="mt-6 grid gap-4 md:grid-cols-3"
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUp}>
                <Card className="transition-colors hover:border-primary/40">
                  <CardContent className="p-5">
                    <h3 className="mb-1 text-lg font-medium tracking-tight">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.body}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <Pricing />

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-8 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} AI Sales Agent</span>
          <div className="flex items-center gap-4">
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="#pricing" className="hover:text-foreground">
              Pricing
            </a>
            <a href="#contact" className="hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
