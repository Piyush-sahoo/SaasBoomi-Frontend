"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCartPerformanceMetrics, getRecentConversations } from "@/lib/voice-commerce-analytics"
import { Package, MessageSquare, TrendingUp, AlertCircle } from "lucide-react"

export function VoiceCommerceInsights() {
  const [cartMetrics, setCartMetrics] = useState<any>(null)
  const [conversations, setConversations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Hardcoded customer intelligence data
    const hardcodedCartMetrics = {
      totalCartValue: 487250,
      cartAdditions: 29, // qualified users
      checkoutClicks: 12, // converted users
      cartToCheckoutRate: (12/29) * 100, // 41.37% (reverse of abandonment)
      topProducts: [
        { product: "iPhone 15 Pro", count: 8 },
        { product: "Samsung Galaxy S24", count: 6 },
        { product: "Google Pixel 8", count: 4 },
        { product: "OnePlus 12", count: 3 },
        { product: "Xiaomi 14", count: 2 }
      ]
    }

    const hardcodedConversations = [
      {
        type: 'user_voice',
        content: 'Looking for a phone with good camera quality under 80000',
        timestamp: Date.now() - 300000, // 5 mins ago
        tools_used: ['searchProducts']
      },
      {
        type: 'assistant', 
        content: 'I found 3 excellent camera phones: iPhone 15 Pro, Samsung Galaxy S24, and Google Pixel 8',
        timestamp: Date.now() - 280000
      },
      {
        type: 'user_text',
        content: 'Compare iPhone 15 Pro and Samsung Galaxy S24',
        timestamp: Date.now() - 240000,
        tools_used: ['searchProducts', 'compareProducts']
      },
      {
        type: 'user_voice',
        content: 'Add iPhone 15 Pro to cart',
        timestamp: Date.now() - 180000,
        tools_used: ['addToCart']
      },
      {
        type: 'assistant',
        content: 'Added iPhone 15 Pro to your cart! Total: ₹134,900',
        timestamp: Date.now() - 160000
      }
    ]

    setCartMetrics(hardcodedCartMetrics)
    setConversations(hardcodedConversations)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <div className="animate-pulse text-muted-foreground">Loading insights...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Cart Performance */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Package className="h-4 w-4" />
            Voice Commerce Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Cart Value</span>
            <span className="font-bold text-lg">
              ₹{(cartMetrics?.totalCartValue || 0).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Cart Additions</span>
            <Badge variant="secondary">{cartMetrics?.cartAdditions || 0}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Checkout Clicks</span>
            <Badge variant="default">{cartMetrics?.checkoutClicks || 0}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Cart → Checkout Rate</span>
            <span className="font-medium text-green-600">
              {(cartMetrics?.cartToCheckoutRate || 0).toFixed(1)}%
            </span>
          </div>

          {cartMetrics?.topProducts?.length > 0 && (
            <div className="mt-4 pt-3 border-t">
              <p className="text-xs font-medium text-muted-foreground mb-2">Top Products Added</p>
              <div className="space-y-1">
                {cartMetrics.topProducts.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="truncate max-w-[150px]">{item.product}</span>
                    <Badge variant="outline" className="text-xs">{item.count}x</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent AI Conversations */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Recent AI Conversations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {conversations.length === 0 ? (
            <div className="text-sm text-muted-foreground py-4 text-center">
              No recent conversations
            </div>
          ) : (
            conversations.map((conv, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
                <div className="flex items-start justify-between mb-1">
                  <Badge variant={
                    conv.type === 'user_voice' || conv.messageType === 'user_voice' ? 'default' : 
                    conv.type === 'assistant' || conv.messageType === 'assistant' ? 'secondary' : 
                    'outline'
                  } className="text-xs">
                    {conv.type || conv.messageType || 'system'}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(conv.timestamp || conv.responseTime || 0).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-xs line-clamp-2 text-gray-700 dark:text-gray-300">
                  {conv.content}
                </p>
                {conv.tools_used?.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {conv.tools_used.map((tool: string, toolIdx: number) => (
                      <Badge key={toolIdx} variant="outline" className="text-xs px-1 py-0">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* AI Impact Summary */}
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Voice AI Impact Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {conversations.filter(c => c.type === 'user_voice' || c.messageType === 'user_voice').length}
              </div>
              <p className="text-xs text-muted-foreground">Voice Commands</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {cartMetrics?.cartAdditions || 0}
              </div>
              <p className="text-xs text-muted-foreground">AI-Assisted Adds</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {cartMetrics?.checkoutClicks || 0}
              </div>
              <p className="text-xs text-muted-foreground">Checkout Intents</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                ₹{Math.round((cartMetrics?.totalCartValue || 0) * 0.25).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Est. Revenue Impact</p>
            </div>
          </div>

          {/* Insights */}
          <div className="mt-4 pt-3 border-t">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-medium">Key Insights:</p>
                <ul className="space-y-0.5 text-muted-foreground">
                  <li>• Voice interactions are driving {((cartMetrics?.cartAdditions || 0) / Math.max(conversations.length, 1) * 100).toFixed(0)}% cart addition rate</li>
                  <li>• Average session includes {Math.round(conversations.length / Math.max(cartMetrics?.cartAdditions || 1, 1))} AI interactions before purchase</li>
                  <li>• {cartMetrics?.topProducts?.[0]?.product || 'Products'} showing highest voice-driven interest</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}