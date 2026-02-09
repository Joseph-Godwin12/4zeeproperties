'use client';

import React, { useState } from 'react';
import { Users, UserCheck, DollarSign, Plus, MoreHorizontal } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import StatCard from '@/app/cards/StatCard';
import Table from '@/app/cards/Table';
import { Button } from '@/components/ui/button';

// --- Types ---
type RecruitStatus = 'Active' | 'Inactive' | 'Pending';

interface Recruit {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  activeListings: number;
  status: RecruitStatus;
  totalSales: string;
}

// --- Mock Data ---
const MOCK_RECRUITS: Recruit[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    joinedDate: '2023-10-15',
    activeListings: 5,
    status: 'Active',
    totalSales: '$450,000',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    joinedDate: '2023-11-02',
    activeListings: 2,
    status: 'Active',
    totalSales: '$125,000',
  },
  {
    id: '3',
    name: 'Jessica Williams',
    email: 'jess.williams@example.com',
    joinedDate: '2024-01-10',
    activeListings: 0,
    status: 'Pending',
    totalSales: '$0',
  },
  {
    id: '4',
    name: 'David Miller',
    email: 'd.miller@example.com',
    joinedDate: '2023-09-20',
    activeListings: 8,
    status: 'Inactive',
    totalSales: '$890,000',
  },
  {
    id: '5',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    joinedDate: '2024-01-25',
    activeListings: 1,
    status: 'Active',
    totalSales: '$0',
  },
];

const RecruitsPage = () => {
  // Stat calculations based on mock data
  const totalRecruits = MOCK_RECRUITS.length;
  const activeRecruits = MOCK_RECRUITS.filter(r => r.status === 'Active').length;
  // Simplified calculation for demo purposes (assuming parsed values or static total)
  const totalTeamSales = "$1,465,000"; 

  const getStatusColor = (status: RecruitStatus) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Inactive':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader 
        title="My Team / Recruits" 
        subtitle="Manage your recruited agents and track team performance."
      >
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Invite Recruit
        </Button>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Recruits"
          value={totalRecruits}
          icon={Users}
          trend={12}
          trendUp={true}
        />
        <StatCard
          title="Active Agents"
          value={activeRecruits}
          icon={UserCheck}
          trend={5}
          trendUp={true}
        />
        <StatCard
          title="Team Sales Volume"
          value={totalTeamSales}
          icon={DollarSign}
          trend={8}
          trendUp={true}
        />
      </div>

      {/* Recruits Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Recruits List</h2>
        <Table 
          headers={['Name', 'Email', 'Joined Date', 'Active Listings', 'Status', 'Total Sales', 'Actions']}
        >
          {MOCK_RECRUITS.map((recruit) => (
            <tr key={recruit.id} className="group hover:bg-muted/30 transition-colors">
              <td className="px-6 py-4 font-medium text-foreground">
                {recruit.name}
              </td>
              <td className="px-6 py-4 text-muted-foreground">
                {recruit.email}
              </td>
              <td className="px-6 py-4 text-muted-foreground">
                {recruit.joinedDate}
              </td>
              <td className="px-6 py-4 text-muted-foreground">
                {recruit.activeListings}
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(recruit.status)}`}>
                  {recruit.status}
                </span>
              </td>
              <td className="px-6 py-4 text-muted-foreground">
                {recruit.totalSales}
              </td>
              <td className="px-6 py-4 text-right">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default RecruitsPage;
