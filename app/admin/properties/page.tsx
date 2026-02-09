"use client";

import React from "react";
import Image from "next/image";
import { Edit, Trash2, Plus } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Table from "@/app/cards/Table";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { MOCK_PROPERTIES } from "@/app/utils/mockData";
import { formatCurrency } from "@/app/utils/formercurrency";
import { PropertyStatus } from "@/app/types/property";

export default function PropertiesPage() {
  const getStatusColor = (status: PropertyStatus) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "SOLD":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "RENTED":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="p-6">
      <PageHeader title="Properties Management" subtitle="Manage your property listings">
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Property
        </Button>
      </PageHeader>
{MOCK_PROPERTIES.length === 0 ? (
        <EmptyState
          title="No properties found"
          description="It looks like you haven't added any properties yet. Add your first property to get started."
          className="mt-6"
          action={
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Property
            </Button>
          }
        />
      ) : (
        <Table
          headers={["Property", "Type", "Price", "Status", "Actions"]}
          className="mt-6"
        >
          {MOCK_PROPERTIES.map((property) => (
            <tr key={property.id} className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-16 overflow-hidden rounded-md">
                    <Image
                      src={property.images.find((img) => img.isMain)?.url || property.images[0].url}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{property.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {property.address.city}, {property.address.state}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm capitalize">{property.type.toLowerCase()}</td>
              <td className="px-6 py-4 text-sm font-medium">
                {formatCurrency(property.price)}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                    property.status
                  )}`}
                >
                  {property.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}
      </Table>
    </div>
  );
}
