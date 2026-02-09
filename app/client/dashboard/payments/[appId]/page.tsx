'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CheckCircle2, CreditCard, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/app/utils/formercurrency';
import Link from 'next/link';

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const { appId } = params;
  
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success'>('pending');

  // Mock Invoice Data
  const invoice = {
    id: `INV-${appId?.slice(0, 6).toUpperCase()}`,
    rent: 12000,
    deposit: 24000,
    fees: 1500,
    total: 37500,
  };

  const handlePayNow = () => {
    setPaymentStatus('processing');
    // Mock Paystack call
    setTimeout(() => {
      setPaymentStatus('success');
    }, 2000);
  };

  if (paymentStatus === 'success') {
    return (
      <div className="max-w-xl mx-auto p-6 mt-10">
        <Card className="text-center py-10">
            <CardContent className="space-y-4 flex flex-col items-center">
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Payment Successful!</h2>
                <p className="text-muted-foreground">
                    Thank you! Your payment for Application #{appId} has been confirmed.
                </p>
                <div className="pt-4">
                    <Link href="/client/dashboard">
                        <Button>Return to Dashboard</Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Complete Payment</h1>
        <p className="text-muted-foreground mt-2">
            Securely pay your rent and deposit to finalize your lease.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
            <CardHeader className="bg-slate-50 border-b">
                <div className="flex justify-between items-center">
                    <CardTitle>Invoice Summary</CardTitle>
                    <span className="text-sm text-muted-foreground font-mono">{invoice.id}</span>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">First Month Rent</span>
                        <span className="font-medium">{formatCurrency(invoice.rent)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Security Deposit</span>
                        <span className="font-medium">{formatCurrency(invoice.deposit)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Administrative Fees</span>
                        <span className="font-medium">{formatCurrency(invoice.fees)}</span>
                    </div>
                    <div className="border-t pt-3 mt-3 flex justify-between items-center">
                        <span className="text-lg font-bold">Total Due</span>
                        <span className="text-2xl font-bold text-primary">{formatCurrency(invoice.total)}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t p-6 flex flex-col gap-4">
                <Button 
                    size="lg" 
                    className="w-full text-lg h-12" 
                    onClick={handlePayNow}
                    disabled={paymentStatus === 'processing'}
                >
                    {paymentStatus === 'processing' ? (
                        <span className="flex items-center gap-2">Processing...</span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5" /> Pay Now with Paystack
                        </span>
                    )}
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3 w-3" />
                    Payments are secure and encrypted
                </div>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
