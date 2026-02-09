'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload, FileCheck, AlertCircle } from 'lucide-react';

type DocType = 'id' | 'payslip' | 'bankStatement';

interface DocumentStatus {
  file: File | null;
  uploaded: boolean;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Record<DocType, DocumentStatus>>({
    id: { file: null, uploaded: false },
    payslip: { file: null, uploaded: false },
    bankStatement: { file: null, uploaded: false }
  });

  const handleFileChange = (type: DocType, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments(prev => ({
        ...prev,
        [type]: { file: e.target.files![0], uploaded: false }
      }));
    }
  };

  const handleUpload = (type: DocType) => {
    // Mock upload delay
    setTimeout(() => {
      setDocuments(prev => ({
        ...prev,
        [type]: { ...prev[type], uploaded: true }
      }));
    }, 1000);
  };

  const docConfig = [
    {
      type: 'id' as DocType,
      label: 'Identity Document',
      description: 'Government issued ID (Passport, Driver\'s License)'
    },
    {
      type: 'payslip' as DocType,
      label: 'Recent Payslip',
      description: 'Most recent pay slip or proof of income'
    },
    {
      type: 'bankStatement' as DocType,
      label: 'Bank Statement',
      description: 'Last 3 months of bank statements'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Documents</h1>
        <p className="text-muted-foreground mt-2">
          Please upload the required documents to process your applications.
        </p>
      </div>

      <div className="grid gap-6">
        {docConfig.map((doc) => {
          const status = documents[doc.type];
          return (
            <Card key={doc.type}>
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    {doc.label}
                    {status.uploaded && <FileCheck className="h-5 w-5 text-green-500" />}
                  </h3>
                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                </div>

                <div className="flex items-center gap-4 flex-1 md:justify-end">
                  {status.uploaded ? (
                    <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-md">
                      <span className="text-sm font-medium">Uploaded successfully</span>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                        <Input 
                            type="file" 
                            className="max-w-[300px]"
                            onChange={(e) => handleFileChange(doc.type, e)}
                        />
                        <Button 
                            onClick={() => handleUpload(doc.type)}
                            disabled={!status.file}
                            variant="default"
                        >
                            <Upload className="mr-2 h-4 w-4" /> Upload
                        </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
        <div>
            <h4 className="font-medium text-blue-900">Secure Document Handling</h4>
            <p className="text-sm text-blue-700">All uploaded documents are encrypted and stored securely. Only authorized agents can view your information.</p>
        </div>
      </div>
    </div>
  );
}
