import {
  LayoutDashboard,
  ShieldCheck,
  Building2,
  Pill,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  {
    title: "الرئيسية",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "المشرفون",
    icon: ShieldCheck,
    path: "/admins",
  },
  {
    title: "الصيدليات",
    icon: Building2,
    path: "/pharmacies",
  },
  {
    title: "الأدوية",
    icon: Pill,
    path: "/medicines",
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <h1 className="sidebar__logo">Medona</h1>
        <p className="sidebar__subtitle">لوحة التحكم</p>
      </div>

      <nav className="sidebar__nav">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "sidebar__link sidebar__link--active"
                  : "sidebar__link"
              }
            >
              <Icon size={22} strokeWidth={2} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
