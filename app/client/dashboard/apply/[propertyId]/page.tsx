'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_PROPERTIES } from '@/app/utils/mockData';
import PropertyCard from '@/app/cards/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea'; // Assuming simple textarea for now if not in UI

// Simple Textarea component if not exists, or I will use standard html textarea
// But looking at workspace info, I assume standard shadcn components pattern but Textarea wasn't explicitly listed.
// I'll stick to standard html textarea styled with tailwind or just Input for text if appropriate, but Message usually implies textarea.
// I'll use a standard HTML textarea with styling for now to avoid import errors if Textarea component is missing.

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const { propertyId } = params;
  
  const property = MOCK_PROPERTIES.find(p => p.id === propertyId);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    employmentInfo: '',
    income: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (!property) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Property not found</h2>
        <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        <Card className="w-full text-center py-12">
          <CardContent className="flex flex-col items-center gap-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <h2 className="text-2xl font-bold">Application Submitted!</h2>
            <p className="text-muted-foreground text-center max-w-md">
              Your application for {property.title} has been successfully submitted. 
              Reviewing typically takes 2-3 business days.
            </p>
            <div className="flex gap-4 mt-4">
               <Link href="/client/dashboard">
                <Button>Return to Dashboard</Button>
              </Link>
              <Link href="/client/dashboard/documents">
                <Button variant="outline">Upload Documents</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Apply for {property.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Col: Form */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
              <CardDescription>
                Please provide your employment and income information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="employment">Employment Information</Label>
                  <Input 
                    id="employment" 
                    placeholder="Current Employer, Job Title" 
                    value={formData.employmentInfo}
                    onChange={(e) => setFormData({...formData, employmentInfo: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="income">Annual Income</Label>
                  <Input 
                    id="income" 
                    type="number"
                    placeholder="e.g. 50000" 
                    value={formData.income}
                    onChange={(e) => setFormData({...formData, income: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message to Agent (Optional)</Label>
                  <textarea 
                    id="message" 
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us why you are interested in this property..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <Button type="submit" className="w-full">Submit Application</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Property Summary */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Property Summary</h3>
          <PropertyCard property={property} className="shadow-sm" />
        </div>
      </div>
    </div>
  );
}
