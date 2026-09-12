import {
  BarChart3,
  ChefHat,
  FolderOpen,
  Images,
  MessageSquare,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: BarChart3,
  },
  {
    name: "Foods",
    path: "/admin/foods",
    icon: ChefHat,
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: FolderOpen,
  },
  {
    name: "Reviews",
    path: "/admin/reviews",
    icon: MessageSquare,
  },
  {
    name: "Gallery",
    path: "/admin/gallery",
    icon: Images,
  },
  {
    name: "Restaurant Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/admin/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-[#0d0d0d] transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <NavLink
            to="/admin"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6ad60]/50 bg-[#d6ad60]/10">
              <span className="font-serif text-xl text-[#e8c982]">
                L
              </span>
            </div>

            <div>
              <h1 className="font-serif text-lg tracking-[0.2em] text-[#f5dfaa]">
                LUMIÈRE
              </h1>

              <p className="text-[8px] uppercase tracking-[0.3em] text-white/35">
                Admin Panel
              </p>
            </div>
          </NavLink>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/50 transition hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-4 px-3 text-[10px] font-medium uppercase tracking-[0.25em] text-[#e8c982]/70">
            Management
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                      isActive
                        ? "bg-[#d6ad60]/10 text-[#e8c982]"
                        : "text-white/55 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={18}
                        strokeWidth={1.5}
                        className={
                          isActive
                            ? "text-[#e8c982]"
                            : "text-white/40 group-hover:text-white/70"
                        }
                      />

                      <span>{item.name}</span>

                      {isActive && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#d6ad60]" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/50 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={18} strokeWidth={1.5} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;