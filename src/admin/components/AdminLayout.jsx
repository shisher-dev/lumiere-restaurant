import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminData = JSON.parse(
    localStorage.getItem("adminData") || "{}"
  );

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Area */}
      <div className="lg:pl-72">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#0d0d0d]/90 px-5 backdrop-blur-xl lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg border border-white/10 p-2 text-white/70 transition hover:border-[#d6ad60]/40 hover:text-[#e8c982]"
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>

          <div className="text-center">
            <h1 className="font-serif text-lg tracking-[0.2em] text-[#f5dfaa]">
              LUMIÈRE
            </h1>

            <p className="text-[8px] uppercase tracking-[0.3em] text-white/35">
              Admin Panel
            </p>
          </div>

          <div className="w-10" />
        </header>

        {/* Desktop Header */}
        <header className="hidden h-20 items-center justify-between border-b border-white/10 px-8 lg:flex">
          <div>
            <p className="text-xs text-white/35">
              Welcome back,
            </p>

            <h2 className="mt-1 text-sm font-medium text-white">
              {adminData?.name || "Administrator"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10">
              <span className="font-serif text-sm text-[#e8c982]">
                {adminData?.name?.charAt(0)?.toUpperCase() || "A"}
              </span>
            </div>

            <div>
              <p className="text-xs font-medium text-white">
                {adminData?.name || "Administrator"}
              </p>

              <p className="text-[10px] text-white/35">
                Administrator
              </p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-5rem)] p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;