"use client"

import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { Phone } from "lucide-react"
import { rtdb } from "@/lib/firebase"
import { get, ref, set } from "firebase/database"

export default function AIConfigPage() {
  const [saving, setSaving] = useState(false)
  const [script, setScript] = useState("")
  const [preview, setPreview] = useState<Array<{ role: "assistant" | "user"; text: string }>>([])
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const s = await get(ref(rtdb, "sites/default/agent/script"))
        setScript(s.val() || "")
      } catch { setScript("") }
      try {
        const p = await get(ref(rtdb, "sites/default/agent/previewMessages"))
        const v = p.val() || []
        const arr = Array.isArray(v) ? v.filter(Boolean) : Object.values(v)
        setPreview(arr as any)
      } catch {}
    }
    load()
  }, [])

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
                className="bg-primary text-primary-foreground hover:opacity-90 h-10 px-6"
                disabled={saving}
                onClick={async () => {
                  setSaving(true)
                  setStatus(null)
                  try {
                    await set(ref(rtdb, "sites/default/agent/script"), script)
                    setStatus("Saved")
                  } catch (e: any) {
                    setStatus(e?.message || "Save failed")
                  } finally {
                    setSaving(false)
                  }
                }}
              >
                {saving ? "Saving..." : "Save Script"}
              </Button>
              <Button
                variant="outline"
                className="h-10 px-6"
                onClick={async () => {
                  setSaving(true)
                  setStatus(null)
                  // Try loading a default from RTDB; else clear
                  try {
                    const d = await get(ref(rtdb, "sites/default/agent/defaultScript"))
                    const next = d.val() || ""
                    setScript(next)
                    await set(ref(rtdb, "sites/default/agent/script"), next)
                    setStatus("Reset")
                  } catch (e: any) {
                    setScript("")
                    await set(ref(rtdb, "sites/default/agent/script"), "")
                    setStatus(e?.message || "Reset to empty")
                  } finally {
                    setSaving(false)
                  }
                }}
              >
                Reset
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
                {preview.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No preview messages</div>
                ) : (
                  preview.map((m, i) => (
                    <div
                      key={i}
                      className={`rounded-lg p-3 text-sm ${m.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground ml-8"}`}
                    >
                      {m.text}
                    </div>
                  ))
                )}
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
