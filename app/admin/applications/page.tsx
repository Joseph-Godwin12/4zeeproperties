'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Table from '@/app/cards/Table';
import { Button } from '@/components/ui/button';
import { MOCK_PROPERTIES, MOCK_USER } from '@/app/utils/mockData';
import { Application, ApplicationStatus } from '@/app/types/application';

// Create mock applications locally since they aren't in mockData.ts
const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'app-001',
    propertyId: 'prop-1',
    clientId: 'user-123',
    status: 'PENDING',
    appliedAt: '2023-10-15T09:30:00Z',
    property: MOCK_PROPERTIES[0],
    client: MOCK_USER,
  },
  {
    id: 'app-002',
    propertyId: 'prop-2',
    clientId: 'user-456',
    status: 'APPROVED',
    appliedAt: '2023-10-10T14:15:00Z',
    property: MOCK_PROPERTIES[1] || MOCK_PROPERTIES[0],
    client: { ...MOCK_USER, id: 'user-456', firstName: 'Bob', lastName: 'Williams', email: 'bob@example.com' },
  },
  {
    id: 'app-003',
    propertyId: 'prop-3',
    clientId: 'user-789',
    status: 'REJECTED',
    appliedAt: '2023-10-05T11:45:00Z',
    property: MOCK_PROPERTIES[2] || MOCK_PROPERTIES[0],
    client: { ...MOCK_USER, id: 'user-789', firstName: 'Charlie', lastName: 'Brown', email: 'charlie@example.com' },
  },
  {
    id: 'app-004',
    propertyId: 'prop-1',
    clientId: 'user-101',
    status: 'PENDING',
    appliedAt: '2023-10-20T16:20:00Z',
    property: MOCK_PROPERTIES[0],
    client: { ...MOCK_USER, id: 'user-101', firstName: 'Diana', lastName: 'Prince', email: 'diana@example.com' },
  },
];

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [filter, setFilter] = useState<ApplicationStatus | 'ALL'>('ALL');

  const handleApprove = (id: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: 'APPROVED' } : app
      )
    );
  };

  const handleReject = (id: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: 'REJECTED' } : app
      )
    );
  };

  const filteredApplications = applications.filter((app) => {
    if (filter === 'ALL') return true;
    return app.status === filter;
  });

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'PAID':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Applications Management" subtitle="Manage property applications">
        {/* Optional header actions */}
      </PageHeader>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-2">
        {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map((status) => (
          <Button
            key={status}
            variant={filter === status ? 'default' : 'outline'}
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {status.toLowerCase()}
          </Button>
        ))}
      </div>

      {/* Table Section */}
      <Table 
        headers={['ID', 'Property', 'Applicant', 'Status', 'Date', 'Actions']}
      >
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredApplications.map((app) => (
            <tr key={app.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {app.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {app.property?.title || 'Unknown Property'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {app.client ? `${app.client.firstName} ${app.client.lastName}` : 'Unknown Applicant'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(app.appliedAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                {app.status === 'PENDING' && (
                  <>
                    <Button 
                      size="sm" 
                      onClick={() => handleApprove(app.id)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleReject(app.id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {app.status !== 'PENDING' && (
                  <span className="text-gray-400 italic">No actions</span>
                )}
              </td>
            </tr>
          ))}
          {filteredApplications.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                No applications found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ApplicationsPage;
