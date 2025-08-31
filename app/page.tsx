"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Pricing } from "@/components/pricing"
import { Card, CardContent } from "@/components/ui/card"
import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import { rtdb } from "@/lib/firebase"
import { get, ref, type Database } from "firebase/database"
import {
  Mic,
  Target,
  Lightbulb,
  Zap,
  ShoppingBag,
  Store,
  Package,
  Settings,
  Play,
  User,
  Bot
} from "lucide-react"

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
        const heroSnap = await get(ref(rtdb as unknown as Database, "sites/default/home"))
        const heroVal = heroSnap.val()
        if (heroVal) setHero(heroVal)
      } catch {}
      try {
        const featSnap = await get(ref(rtdb as unknown as Database, "sites/default/features"))
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
    <main className="hero-gradient min-h-screen">
      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-10">
        {/* Enhanced gradient background with floating elements */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-120px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-gray-200/30 via-gray-300/20 to-gray-400/15 blur-3xl animate-float" />
          <div className="absolute right-0 top-[200px] h-[300px] w-[400px] rounded-full bg-gradient-to-l from-gray-300/15 to-transparent blur-2xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute left-0 bottom-[100px] h-[200px] w-[300px] rounded-full bg-gradient-to-r from-gray-400/10 to-transparent blur-xl animate-float" style={{ animationDelay: '4s' }} />
        </div>
        
        <header className="mb-12 flex items-center justify-between glass-morphism rounded-2xl px-6 py-4">
          <nav className="flex items-center gap-6">
            <Link href="/" className="font-semibold tracking-tight">
              <span className="rounded-md bg-gradient-button px-3 py-1 text-xs text-white font-medium">BETA</span>
              <span className="ml-2 text-gradient text-xl font-bold">Voice Cart</span>
            </Link>
            <a href="#features" className="text-sm text-muted-foreground hover:text-gray-700 transition-colors">
              Features
            </a>
            <a href="#integrations" className="text-sm text-muted-foreground hover:text-gray-700 transition-colors">
              Integrations
            </a>
            <a href="#demo" className="text-sm text-muted-foreground hover:text-gray-700 transition-colors">
              Demo
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hover:bg-gray-50">
              <Link href="/dashboard">Login</Link>
            </Button>
            <Button asChild className="btn-gradient hover-scale">
              <Link href="/dashboard">Start Free Trial</Link>
            </Button>
          </div>
        </header>

        <motion.div variants={stagger} initial="initial" animate="animate" className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200/50">
                <span className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></span>
                Now Available for Shopify • WooCommerce, BigCommerce & Odoo Coming Soon
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-pretty text-6xl font-bold leading-tight tracking-tight mb-6">
              <span className="text-gray-900">Transform Shopping with</span>
              <br />
              <span className="text-gradient">Voice Cart AI</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
              Deploy intelligent voice agents that guide customers through your store, answer questions instantly, and boost conversions by up to 40%.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-10">
              <Button asChild className="btn-gradient hover-scale text-lg px-8 py-4">
                <Link href="/dashboard">Get Started Free</Link>
              </Button>
              <Button variant="outline" className="btn-outline-dark text-lg px-8 py-4">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </motion.div>
            
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-gradient mb-1">40%</div>
                <div className="text-sm text-gray-600">Conversion Increase</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient mb-1">2min</div>
                <div className="text-sm text-gray-600">Setup Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient mb-1">24/7</div>
                <div className="text-sm text-gray-600">AI Assistant</div>
              </div>
            </motion.div>
          </div>
          
          <motion.div variants={fadeUp} className="relative">
            <Card className="card-professional hover-lift animate-pulse-glow overflow-hidden">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-dark-card rounded-full mx-auto mb-4 flex items-center justify-center shadow-professional">
                    <Mic className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Try Voice Shopping</h3>
                  <p className="text-gray-600">Experience AI-powered voice commerce</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/30">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-sm text-gray-700">"I'm looking for wireless headphones under $200"</div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/30">
                    <div className="w-8 h-8 bg-gradient-dark-card rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-sm text-gray-700">"I found 3 perfect matches! The Sony WH-CH720N offers great noise cancellation for $149..."</div>
                  </div>
                  
                  <div className="text-center pt-4">
                    <Button className="btn-professional w-full">
                      <Target className="w-4 h-4 mr-2" />
                      Start Voice Demo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gradient-to-b from-transparent to-gray-50/50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-balance text-5xl font-bold tracking-tight mb-6">
              <span className="text-gradient">Why Choose Voice Cart?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI voice agents don't just answer questions—they actively guide customers to purchase decisions, increasing your conversion rates and average order value.
            </p>
          </div>
          
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
            className="grid gap-8 md:grid-cols-3 mb-20"
          >
            <motion.div variants={fadeUp}>
              <Card className="card-professional hover-lift h-full group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-professional">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold tracking-tight text-gray-800">Instant Product Discovery</h3>
                  <p className="text-gray-600 leading-relaxed">Voice-powered search helps customers find exactly what they need in seconds, not minutes. No more endless scrolling.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="card-professional hover-lift h-full group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-professional">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold tracking-tight text-gray-800">Smart Recommendations</h3>
                  <p className="text-gray-600 leading-relaxed">AI analyzes customer preferences and suggests complementary products, boosting your average order value by 25%.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="card-professional hover-lift h-full group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-professional">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold tracking-tight text-gray-800">Lightning Fast Setup</h3>
                  <p className="text-gray-600 leading-relaxed">One-click installation on Shopify, WooCommerce, or BigCommerce. Your AI assistant is live in under 2 minutes.</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="py-20 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold tracking-tight mb-6">
              <span className="text-gradient">Seamless Integrations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Works perfectly with your existing e-commerce stack. No complex setup, no technical headaches.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
            <Card className="card-professional hover-lift group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-professional">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Shopify</h3>
                <p className="text-gray-600 mb-4 text-sm">Native app with full product catalog sync and cart integration.</p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-700 font-medium">
                  <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                  Available Now
                </div>
              </CardContent>
            </Card>

            <Card className="card-professional hover-lift group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-professional">
                  <Store className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">WooCommerce</h3>
                <p className="text-gray-600 mb-4 text-sm">WordPress plugin with complete WooCommerce store integration.</p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 font-medium">
                  <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                  Coming Soon
                </div>
              </CardContent>
            </Card>

            <Card className="card-professional hover-lift group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-professional">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">BigCommerce</h3>
                <p className="text-gray-600 mb-4 text-sm">Enterprise-grade integration with advanced analytics and reporting.</p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 font-medium">
                  <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                  Coming Soon
                </div>
              </CardContent>
            </Card>

            <Card className="card-professional hover-lift group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-professional">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Odoo</h3>
                <p className="text-gray-600 mb-4 text-sm">Complete ERP integration with e-commerce and inventory management.</p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 font-medium">
                  <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                  Coming Soon
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button asChild className="btn-professional hover-scale text-lg px-8 py-4">
              <Link href="/dashboard">Start Your Free Trial</Link>
            </Button>
            <p className="text-sm text-gray-500 mt-4">No credit card required • 14-day free trial</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200/30 bg-gradient-to-r from-gray-50/30 to-gray-100/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-12 text-sm text-gray-600">
          <div>
            <div className="text-gradient text-xl font-bold mb-2">Voice Cart</div>
            <span className="font-medium">© {new Date().getFullYear()} All rights reserved</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#features" className="hover:text-gray-700 transition-colors">
              Features
            </a>
            <a href="#integrations" className="hover:text-gray-700 transition-colors">
              Integrations
            </a>
            <a href="#demo" className="hover:text-gray-700 transition-colors">
              Demo
            </a>
            <a href="/dashboard" className="hover:text-gray-700 transition-colors">
              Login
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
