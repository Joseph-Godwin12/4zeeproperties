'use client';

import React from 'react';
import StatCard from '@/app/cards/StatCard';
import Table from '@/app/cards/Table';
import { BarChart3, Users, Building } from 'lucide-react';
import { formatCurrency } from '@/app/utils/formercurrency';

const MOCK_STATS = [
  { title: "Total Revenue", value: formatCurrency(500000000), icon: BarChart3, trend: 20, trendUp: true },
  { title: "Total Users", value: "1,234", icon: Users, trend: 12, trendUp: true },
  { title: "Total Properties", value: "345", icon: Building, trend: 5, trendUp: true },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_STATS.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* System Activity */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">System Activity</h2>
        <Table headers={["User", "Action", "Details", "Date"]}>
          {[1, 2, 3, 4, 5].map((i) => (
             <tr key={i} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 font-medium">User {i}</td>
                <td className="px-6 py-4">Logged In</td>
                <td className="px-6 py-4 text-muted-foreground">Successful login via email</td>
                <td className="px-6 py-4 text-muted-foreground">Just now</td>
             </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}
