import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';

const LinkItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-slate-100
       ${isActive ? 'bg-slate-100 text-slate-900 font-medium' : 'text-slate-600'}`
    }
  >
    <Icon className="text-slate-500" />
    {label}
  </NavLink>
);

export default function Sidebar() {
  return (
    <aside className="w-60 h-full border-r bg-white p-3">
      <div className="px-2 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wide">
        Methods
      </div>
      <div className="flex flex-col gap-1">
        <LinkItem to="/linearity" icon={FiTrendingUp} label="Linearity" />
        <LinkItem to="/accuracy" icon={FiCheckCircle} label="Accuracy" />
      </div>

      <div className="px-2 py-1 mt-6 text-xs font-semibold text-slate-400 uppercase tracking-wide">
        More
      </div>
      <div className="flex flex-col gap-1">
        <LinkItem to="/" icon={FiHome} label="Dashboard (soon)" />
      </div>
    </aside>
  );
}
