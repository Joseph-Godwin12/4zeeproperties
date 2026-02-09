import {
  LayoutDashboard,
  Home,
  Users,
  FileText,
  Settings,
  Briefcase,
  Building,
} from "lucide-react";

export const APP_NAME = "4Zee Properties";

export const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/client/dashboard",
    icon: LayoutDashboard,
    role: "CLIENT",
  },
  {
    title: "Properties",
    href: "/properties",
    icon: Home,
    role: "CLIENT",
  },
  {
    title: "My Applications",
    href: "/client/dashboard/applications",
    icon: FileText,
    role: "CLIENT",
  },
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    role: "ADMIN",
  },
  {
    title: "Properties",
    href: "/admin/properties",
    icon: Building,
    role: "ADMIN",
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
    role: "ADMIN",
  },
  {
    title: "Sales",
    href: "/admin/sales",
    icon: Briefcase,
    role: "ADMIN",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    role: "ALL",
  },
];

export const STATUS_COLORS: Record<string, string> = {
  AVAILABLE: "bg-green-100 text-green-700",
  SOLD: "bg-red-100 text-red-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  RENTED: "bg-blue-100 text-blue-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  PAID: "bg-purple-100 text-purple-700",
};
