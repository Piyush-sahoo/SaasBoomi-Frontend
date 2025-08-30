"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { rtdb } from "@/lib/firebase"
import { get, ref } from "firebase/database"

export function Pricing() {
  const [tiers, setTiers] = useState<Array<{name:string; price:string; features:string[]; cta?:string; highlight?:boolean}>>([])
  useEffect(() => {
    async function run() {
      try {
        const snap = await get(ref(rtdb, "sites/default/pricing"))
        const val = snap.val() || []
        let items: any[] = []
        if (Array.isArray(val)) items = val.filter(Boolean)
        else items = Object.values(val)
        items.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
        setTiers(items)
      } catch {}
    }
    run()
  }, [])
  return (
    <section id="pricing" className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-3">
      {tiers.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35, delay: i * 0.05, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <Card className={t.highlight ? "border-2 border-primary" : "hover:border-primary/40 transition-colors"}>
            <CardHeader>
              <CardTitle className="flex items-baseline justify-between">
                <span>{t.name}</span>
                <span className="text-xl text-primary">{t.price}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
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
                <Button asChild className="w-full bg-primary text-primary-foreground hover:opacity-90">
                  <Link href="/dashboard">Start Free Trial</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </section>
  )
}
