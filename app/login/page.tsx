"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { auth, googleProvider } from "@/lib/firebase"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSignIn = async () => {
    setLoading(true)
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
      router.push("/dashboard")
    } catch (e: any) {
      setError(e?.message || "Failed to sign in")
    } finally {
      setLoading(false)
    }
  }

  const onGoogle = async () => {
    setLoading(true)
    setError(null)
    try {
      await signInWithPopup(auth, googleProvider)
      router.push("/dashboard")
    } catch (e: any) {
      setError(e?.message || "Google sign-in failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button disabled={loading} onClick={onSignIn} className="w-full bg-primary text-primary-foreground hover:opacity-90">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <div className="relative my-2 text-center text-xs text-muted-foreground">
            <span className="bg-card px-2">or</span>
          </div>
          <Button variant="outline" disabled={loading} onClick={onGoogle} className="w-full">
            Continue with Google
          </Button>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          <span>Don&apos;t have an account? </span>
          <Link href="/signup" className="ml-1 text-primary">
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}
