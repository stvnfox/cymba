import { SidebarComponent } from "@/components/SidebarComponent"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex gap-4">
            <SidebarComponent />
            <section className="w-4/5">{children}</section>
        </main>
    )
}
