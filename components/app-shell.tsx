"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Bell, CircleUserRound, ChevronRight, Search, X, Home, BarChart3, Brain, Settings, LogOut } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type AppShellProps = {
  title?: string
  children: React.ReactNode
  breadcrumb?: { label: string; href?: string }[]
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Intelligence", href: "/customer-intelligence", icon: Brain },
  { label: "Agent Config", href: "/ai-config", icon: Settings },
]

export function AppShell({ title, children, breadcrumb }: AppShellProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-gradient-primary text-foreground">
      {/* Fixed Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 z-40 hidden h-full w-60 border-r border-gray-200/30 bg-gradient-card backdrop-blur-md md:block">
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="border-b border-gray-200/30 p-4 bg-gradient-to-r from-gray-50/50 to-gray-100/30">
            <Link href="/" className="font-bold tracking-tight text-gradient text-lg">
              Voice Cart
            </Link>
          </div>
          
          {/* Sidebar Navigation */}
          <nav className="flex-1 p-3">
            <div className="flex flex-col gap-1">
              {navItems.map((n) => {
                const active = pathname === n.href
                const Icon = n.icon
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200",
                      active
                        ? "btn-professional text-white shadow-professional before:absolute before:left-0 before:top-2 before:h-8 before:w-1 before:rounded-full before:bg-white"
                        : "text-gray-600 hover:bg-gray-50/50 hover:text-gray-700 hover-lift",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    {n.label}
                  </Link>
                )
              })}
              <div className="mt-6 border-t border-gray-200/30 pt-4">
                <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Logout
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile Sidebar */}
          <aside className="fixed left-0 top-0 h-full w-60 border-r border-gray-200/30 bg-gradient-card backdrop-blur-md">
            <div className="flex h-full flex-col">
              {/* Mobile Sidebar Header */}
              <div className="flex items-center justify-between border-b border-gray-200/30 p-4 bg-gradient-to-r from-gray-50/50 to-gray-100/30">
                <Link href="/" className="font-bold text-gradient">
                  Voice Cart
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation"
                  className="hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Mobile Sidebar Navigation */}
              <nav className="flex-1 p-3">
                <div className="flex flex-col gap-1">
                  {navItems.map((n) => {
                    const active = pathname === n.href
                    const Icon = n.icon
                    return (
                      <Link
                        key={n.href}
                        href={n.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200",
                          active ? "btn-professional text-white" : "text-gray-600 hover:bg-gray-50/50 hover:text-gray-700",
                        )}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                        {n.label}
                      </Link>
                    )
                  })}
                  <div className="mt-6 border-t border-gray-200/30 pt-4">
                    <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-2">
                      <LogOut className="w-4 h-4" /> Logout
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="md:ml-60">
        {/* Top Header */}
        <header className="sticky top-0 z-30 border-b border-gray-200/30 bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-3 px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            {/* Mobile Logo */}
            <Link href="/" className="font-bold text-gradient md:hidden">
              Voice Cart
            </Link>
            
            {/* Search Bar */}
            <div className="relative ml-2 hidden flex-1 items-center md:flex">
              <Search className="pointer-events-none absolute left-3 h-4 w-4 text-gray-400" />
              <Input
                className="pl-9 border-gray-200/50 focus:border-gray-400 focus:ring-gray-200 bg-white/50"
                placeholder="Search conversations, customers..."
                aria-label="Global search"
              />
            </div>
            
            {/* Header Actions */}
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Notifications" className="hover:bg-gray-100 relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-dark-card rounded-full"></div>
              </Button>
              <Button variant="ghost" size="icon" aria-label="Account" className="hover:bg-gray-100">
                <CircleUserRound className="h-6 w-6 text-gray-600" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 py-6 bg-gradient-to-br from-gray-50/30 to-gray-100/10 min-h-screen">
          {breadcrumb && breadcrumb.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-3 text-sm text-gray-600">
              <ol className="flex items-center gap-1">
                {breadcrumb.map((b, i) => {
                  const last = i === breadcrumb.length - 1
                  return (
                    <li key={i} className="flex items-center gap-1">
                      {b.href ? (
                        <Link href={b.href} className="hover:text-gray-700 transition-colors">
                          {b.label}
                        </Link>
                      ) : (
                        <span aria-current={last ? "page" : undefined}>{b.label}</span>
                      )}
                      {!last && <ChevronRight className="h-4 w-4" />}
                    </li>
                  )
                })}
              </ol>
            </nav>
          )}
          {title && <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-800">{title}</h1>}
          {children}
        </main>
      </div>
    </div>
  )
}
