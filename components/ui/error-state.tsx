import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  message: string;
  retry?: () => void;
  className?: string;
  title?: string;
}

export function ErrorState({ message, retry, className, title = "Something went wrong" }: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-red-50/50 border-red-100", className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <AlertCircle className="h-6 w-6 text-red-600" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600 max-w-sm">{message}</p>
      {retry && (
        <div className="mt-6">
          <Button variant="outline" onClick={retry} className="border-red-200 hover:bg-red-50 hover:text-red-700 text-red-600">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
