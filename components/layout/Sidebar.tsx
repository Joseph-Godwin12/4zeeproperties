import Link from "next/link";

type Role = "admin" | "realtor" | "client";

export default function Sidebar({ role }: { role: Role }) {
  const links =
    role === "admin"
      ? [{ name: "Dashboard", href: "/admin/dashboard" }]
      : role === "realtor"
      ? [{ name: "Dashboard", href: "/realtor/dashboard" }]
      : [{ name: "Dashboard", href: "/client/dashboard" }];

  return (
    <aside className="w-64 bg-gray-100 p-4">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="block py-2">
          {link.name}
        </Link>
      ))}
    </aside>
  );
}
