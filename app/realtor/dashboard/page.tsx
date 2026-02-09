'use client';

import React from 'react';
import StatCard from '@/app/cards/StatCard';
import Table from '@/app/cards/Table';
import { EmptyState } from '@/components/ui/empty-state';
import { DollarSign, Home, Users } from 'lucide-react';
import { formatCurrency } from '@/app/utils/formercurrency';

const MOCK_STATS = [
  { title: "Total Sales", value: formatCurrency(150000000), icon: DollarSign, trend: 8, trendUp: true },
  { title: "Active Listings", value: "8", icon: Home, trend: 2, trendUp: false },
  { title: "Leads", value: "24", icon: Users, trend: 15, trendUp: true },
];

const RECENT_LEADS = [1, 2, 3, 4, 5];

export default function RealtorDashboard() {
  const leads = RECENT_LEADS;

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_STATS.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Recent Leads */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Recent Leads</h2>
        {leads.length > 0 ? (
          <Table headers={["Name", "Interest", "Contact", "Status", "Date"]}>
            {leads.map((i) => (
              <tr key={i} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 font-medium">Potential Client {i}</td>
                <td className="px-6 py-4">Luxury Apartment in Ikoyi</td>
                <td className="px-6 py-4">client{i}@example.com</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    New
                  </span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">Oct 2{i}, 2023</td>
              </tr>
            ))}
          </Table>
        ) : (
          <EmptyState
            title="No recent leads"
            description="You haven't received any new leads yet. Check back later."
          />
        )}
      </div>
    </div>
  );
}
