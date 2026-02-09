"use client";

import React from "react";
import { Download } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Table from "@/app/cards/Table";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/app/utils/formercurrency";
import { formatDate, getInitials } from "@/app/utils/helpers";

const MOCK_SALES = [
  {
    id: "sale-1",
    property: "Modern Luxury Villa",
    agent: "Sarah Smith",
    amount: 1250000,
    date: "2024-02-15",
    status: "COMPLETED",
  },
  {
    id: "sale-2",
    property: "Downtown Penthouse",
    agent: "Mike Johnson",
    amount: 850000,
    date: "2024-02-10",
    status: "PENDING",
  },
  {
    id: "sale-3",
    property: "Seaside Cottage",
    agent: "Sarah Smith",
    amount: 450000,
    date: "2024-02-05",
    status: "COMPLETED",
  },
  {
    id: "sale-4",
    property: "Urban Loft",
    agent: "David Chen",
    amount: 620000,
    date: "2024-01-28",
    status: "CANCELLED",
  },
  {
    id: "sale-5",
    property: "Mountain Retreat",
    agent: "Lisa Wong",
    amount: 950000,
    date: "2024-01-20",
    status: "COMPLETED",
  },
];

export default function AdminSalesPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "CANCELLED":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="p-6">
      <PageHeader title="Sales Overview" subtitle="Track property sales and performance">
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </PageHeader>

      <Table
        headers={["Property", "Agent", "Amount", "Date", "Status"]}
        className="mt-6"
      >
        {MOCK_SALES.map((sale) => (
          <tr key={sale.id} className="hover:bg-muted/50 transition-colors">
            <td className="px-6 py-4 font-medium">{sale.property}</td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {getInitials(sale.agent)}
                </div>
                <span className="text-sm">{sale.agent}</span>
              </div>
            </td>
            <td className="px-6 py-4 text-sm font-medium">
              {formatCurrency(sale.amount)}
            </td>
            <td className="px-6 py-4 text-sm text-muted-foreground">
              {formatDate(sale.date)}
            </td>
            <td className="px-6 py-4">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                  sale.status
                )}`}
              >
                {sale.status}
              </span>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
