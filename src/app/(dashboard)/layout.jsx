import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Your Meeting Buddy",
  description: "Your Meeting Buddy",
};

export default function Layout({ children }) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <div className="p-6 flex-1">{children}</div>
      </SidebarProvider>
    </SessionProvider>
  );
}
