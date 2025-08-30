"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Bell, CircleUserRound, ChevronRight, Search, X } from "lucide-react"
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
  { label: "Dashboard", href: "/dashboard", icon: "🏠" },
  { label: "Analytics", href: "/analytics", icon: "📈" },
  { label: "Intelligence", href: "/customer-intelligence", icon: "🧠" },
  { label: "Agent Config", href: "/ai-config", icon: "⚙️" },
]

export function AppShell({ title, children, breadcrumb }: AppShellProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-white text-[#1F1F1F]">
      {/* Fixed Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 z-40 hidden h-full w-60 border-r border-[#E5E7EB] bg-[#F5F5F5] md:block">
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="border-b border-[#E5E7EB] p-4">
            <Link href="/" className="font-semibold text-[#1F1F1F]">
              AI Sales Agent
            </Link>
          </div>
          
          {/* Sidebar Navigation */}
          <nav className="flex-1 p-3">
            <div className="flex flex-col gap-1">
              {navItems.map((n) => {
                const active = pathname === n.href
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                      active ? "bg-[#E9E9E9] text-[#1F1F1F]" : "text-[#616161] hover:bg-[#E0E0E0]",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <span aria-hidden="true">{n.icon}</span>
                    {n.label}
                  </Link>
                )
              })}
              <div className="mt-3 border-t border-[#E0E0E0] pt-3">
                <Link href="/" className="text-sm text-[#616161] hover:text-black">
                  Logout
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
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile Sidebar */}
          <aside className="fixed left-0 top-0 h-full w-60 border-r border-[#E5E7EB] bg-[#F5F5F5]">
            <div className="flex h-full flex-col">
              {/* Mobile Sidebar Header */}
              <div className="flex items-center justify-between border-b border-[#E5E7EB] p-4">
                <Link href="/" className="font-semibold text-[#1F1F1F]">
                  AI Sales Agent
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Mobile Sidebar Navigation */}
              <nav className="flex-1 p-3">
                <div className="flex flex-col gap-1">
                  {navItems.map((n) => {
                    const active = pathname === n.href
                    return (
                      <Link
                        key={n.href}
                        href={n.href}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                          active ? "bg-[#E9E9E9] text-[#1F1F1F]" : "text-[#616161] hover:bg-[#E0E0E0]",
                        )}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span aria-hidden="true">{n.icon}</span>
                        {n.label}
                      </Link>
                    )
                  })}
                  <div className="mt-3 border-t border-[#E0E0E0] pt-3">
                    <Link href="/" className="text-sm text-[#616161] hover:text-black">
                      Logout
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
        <header className="sticky top-0 z-30 border-b border-[#E5E7EB] bg-white">
          <div className="flex items-center gap-3 px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            {/* Mobile Logo */}
            <Link href="/" className="font-semibold md:hidden">
              AI Sales Agent
            </Link>
            
            {/* Search Bar */}
            <div className="relative ml-2 hidden flex-1 items-center md:flex">
              <Search className="pointer-events-none absolute left-3 h-4 w-4 text-[#8E8E8E]" />
              <Input className="pl-9" placeholder="Search conversations, customers..." aria-label="Global search" />
            </div>
            
            {/* Header Actions */}
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Account">
                <CircleUserRound className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 py-6">
          {breadcrumb && breadcrumb.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-3 text-sm text-[#8E8E8E]">
              <ol className="flex items-center gap-1">
                {breadcrumb.map((b, i) => {
                  const last = i === breadcrumb.length - 1
                  return (
                    <li key={i} className="flex items-center gap-1">
                      {b.href ? (
                        <Link href={b.href} className="hover:text-black">
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
          {title && <h1 className="mb-4 text-2xl font-semibold tracking-tight text-[#1F1F1F]">{title}</h1>}
          {children}
        </main>
      </div>
    </div>
  )
}
