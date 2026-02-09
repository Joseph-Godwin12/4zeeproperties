"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Building2, AlertCircle, Calendar } from "lucide-react";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientSignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    dob: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.register({
        email: form.email,
        password: form.password,
        role: "CLIENT",
        dob: form.dob || undefined,
      });

      if (res.success) {
        router.push("/auth/login?registered=true");
      } else {
        setError(res.error ?? "Registration failed. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <Card className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl border border-muted/60 z-10">
        <CardHeader className="text-center space-y-1">
            <div className="flex justify-center mb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                </div>
            </div>
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>
                Sign up to find your dream home and connect with agents.
            </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
                <p className="text-destructive text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Email Address */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                 <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  required
                  type="email"
                  value={form.email}
                  placeholder="name@example.com"
                  className="pl-10 bg-background/50"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            
            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                 <Input
                  id="password"
                  required
                  type="password"
                  placeholder="Min. 8 characters"
                  className="pl-10 bg-background/50"
                  minLength={8}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            {/* Date of Birth (optional) */}
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="dob"
                  type="date"
                  className="pl-10 bg-background/50"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                />
              </div>
            </div>

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
         <CardFooter className="flex justify-center border-t bg-muted/20 py-4">
             <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:underline font-medium">
                    Sign in
                </Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
