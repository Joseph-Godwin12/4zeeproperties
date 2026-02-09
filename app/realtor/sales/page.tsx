"use client";

import React from "react";
import { Download, TrendingUp } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Table from "@/app/cards/Table";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/app/utils/formercurrency";
import { formatDate } from "@/app/utils/helpers";

const MOCK_MY_SALES = [
  {
    id: "sale-1",
    property: "Modern Luxury Villa",
    amount: 1250000,
    commission: 37500,
    date: "2024-02-15",
    status: "COMPLETED",
  },
  {
    id: "sale-3",
    property: "Seaside Cottage",
    amount: 450000,
    commission: 13500,
    date: "2024-02-05",
    status: "COMPLETED",
  },
  {
    id: "sale-5",
    property: "Mountain Retreat",
    amount: 950000,
    commission: 28500,
    date: "2024-01-20",
    status: "PENDING",
  },
];

export default function RealtorSalesPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="p-6">
      <PageHeader title="My Sales" subtitle="Track your sales and commissions">
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </PageHeader>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Sales</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">{formatCurrency(2650000)}</div>
          <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Commission</h3>
            <span className="text-xs font-bold text-green-600">3.0%</span>
          </div>
          <div className="text-2xl font-bold">{formatCurrency(79500)}</div>
          <p className="text-xs text-muted-foreground mt-1">+15% from last month</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Properties Sold</h3>
            <span className="text-xs text-muted-foreground">YTD</span>
          </div>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground mt-1">2 Pending</p>
        </div>
      </div>

      <Table
        headers={["Property", "Sale Amount", "Commission", "Date", "Status"]}
        className="mt-6"
      >
        {MOCK_MY_SALES.map((sale) => (
          <tr key={sale.id} className="hover:bg-muted/50 transition-colors">
            <td className="px-6 py-4 font-medium">{sale.property}</td>
            <td className="px-6 py-4 text-sm font-medium">
              {formatCurrency(sale.amount)}
            </td>
            <td className="px-6 py-4 text-sm font-medium text-green-600 dark:text-green-400">
              {formatCurrency(sale.commission)}
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
