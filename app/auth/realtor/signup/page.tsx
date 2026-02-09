"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Briefcase, Ticket, AlertCircle, Calendar } from "lucide-react";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function RealtorSignup() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    referralCode: "",
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
        role: "REALTOR",
        referralCode: form.referralCode || undefined,
        dob: form.dob || undefined,
      });

      if (res.success) {
        router.push("/auth/login?registered=true");
      } else {
        setError(res.error ?? "Registration failed. Try again.");
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
                    <Briefcase className="w-6 h-6 text-primary" />
                </div>
            </div>
            <CardTitle className="text-2xl font-bold">Partner With Us</CardTitle>
            <CardDescription>
                Create your professional realtor profile and grow your business.
            </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-destructive text-sm text-center font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  required
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  className="pl-10 bg-background/50"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  required
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 bg-background/50"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  required
                  type="password"
                  className="pl-10 bg-background/50"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="referral">Referral Code (Optional)</Label>
                <div className="relative">
                    <Ticket className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="referral"
                        type="text"
                        placeholder="REF-12345"
                        className="pl-10 bg-background/50"
                        value={form.referral}
                        onChange={(e) => setForm({ ...form, referral: e.target.value })}
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
