"use client"

import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Phone } from "lucide-react"

export default function AIConfigPage() {
  const [saving, setSaving] = useState(false)
  const [script, setScript] = useState(`You are TechGuide Pro, a helpful AI sales assistant for ElectroWorld. Your role is to:

1. Greet customers warmly and ask how you can help them find the perfect tech solution
2. Listen to their needs and ask clarifying questions about their requirements
3. Recommend products that best match their needs and budget
4. Provide detailed product information and specifications when asked
5. Handle objections professionally and offer alternatives
6. Guide customers through the purchase process
7. Offer relevant accessories and extended warranties when appropriate

Always be friendly, knowledgeable, and customer-focused. If you don't know something, be honest and offer to find the information for them.`)

  return (
    <AppShell
      title="AI Agent Configuration"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Script Editor */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">AI Agent Script</CardTitle>
              <p className="text-sm text-[#616161]">Define how your AI agent should behave and respond to customers</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="script" className="text-sm font-medium">
                  Agent Instructions & Behavior
                </Label>
                <Textarea
                  id="script"
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  placeholder="Enter your AI agent script and instructions here..."
                  className="mt-2 min-h-[400px] resize-none"
                />
                <p className="text-xs text-[#616161] mt-2">
                  This script defines your AI agent's personality, behavior, and response patterns.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex gap-3 pt-6">
              <Button
                className="bg-[#005BFF] hover:bg-[#004AD8] h-10 px-6"
                disabled={saving}
                onClick={async () => {
                  setSaving(true)
                  await new Promise((r) => setTimeout(r, 800))
                  setSaving(false)
                  alert("Script saved successfully!")
                }}
              >
                {saving ? "Saving..." : "Save Script"}
              </Button>
              <Button variant="outline" className="h-10 px-6">
                Reset to Default
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Chat Preview */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <Card className="border border-[#E5E7EB]">
            <CardHeader className="pb-3 border-b border-[#E5E7EB]">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-[#1F1F1F]">Chat Preview</CardTitle>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="space-y-2">
                <div className="rounded-lg bg-[#F8F9FA] p-3 text-sm">
                  Hi! I'm TechGuide Pro from ElectroWorld. How can I help you find the perfect tech solution today?
                </div>
                
                <div className="rounded-lg bg-[#005BFF] p-3 text-sm text-white ml-8">
                  Looking for a drone for photography
                </div>
                
                <div className="rounded-lg bg-[#F8F9FA] p-3 text-sm">
                  Excellent choice! Photography drones are fantastic. What's your experience level?
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-3 border-t border-[#E5E7EB]">
              <div className="w-full flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-1 h-9 px-3 rounded-md border border-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#005BFF] focus:border-transparent"
                />
                <Button size="sm" className="bg-[#005BFF] hover:bg-[#004AD8] h-9 px-4">
                  Send
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
