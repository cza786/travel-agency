import { redirect } from "next/navigation";
import { getAdminSession } from "@/app/admin/actions/auth";
import { AdminDashboardShell } from "@/components/admin/AdminDashboardShell";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return <AdminDashboardShell>{children}</AdminDashboardShell>;
}
