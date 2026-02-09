"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, Mail, Building2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login({ email, password });

    if (!result.success) {
      setError(result.error ?? "Invalid email or password");
      setLoading(false);
      return;
    }

    // Redirect based on role returned from the API
    switch (result.role) {
      case "ADMIN":
        router.push("/admin/dashboard");
        break;
      case "REALTOR":
        router.push("/realtor/dashboard");
        break;
      case "CLIENT":
      default:
        router.push("/client/dashboard");
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 relative overflow-hidden px-4 py-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="z-10 w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 mb-4">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
                Enter your credentials to access your account
            </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-md border-muted/60 shadow-xl">
            <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
                    <p className="text-destructive text-sm font-medium">{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10 bg-background/50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                </div>
                <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                        href="/auth/forgot-password" 
                        className="text-xs text-primary hover:underline hover:text-primary/90"
                    >
                        Forgot password?
                    </Link>
                </div>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                    id="password"
                    type="password"
                    placeholder="Min. 8 characters"
                    className="pl-10 bg-background/50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    />
                </div>
                </div>
                <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
                </Button>
            </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t bg-muted/20 py-4">
                <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth" className="text-primary hover:underline font-medium">
                        Sign up
                    </Link>
                </p>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
