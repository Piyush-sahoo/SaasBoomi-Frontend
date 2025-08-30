import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-white px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button className="w-full bg-[#005BFF] hover:bg-[#004AD8]" asChild>
            <Link href="/dashboard">Sign In</Link>
          </Button>
        </CardContent>
        <CardFooter className="text-sm text-[#616161]">
          <span>Don&apos;t have an account? </span>
          <Link href="/signup" className="ml-1 text-[#005BFF]">
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}
