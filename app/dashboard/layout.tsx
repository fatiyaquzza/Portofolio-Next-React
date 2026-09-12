import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedDashboard from "@/app/components/protectedDashboard";

export const metadata: Metadata = { title: "Admin Dashboard", robots: { index: false, follow: false } };

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedDashboard>{children}</ProtectedDashboard>
    </AuthProvider>
  );
}
