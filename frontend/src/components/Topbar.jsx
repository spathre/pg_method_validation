import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default function Topbar() {
  return (
    <header className="h-14 border-b bg-white px-4 flex items-center justify-between">
      <div className="font-semibold text-slate-800">PG Method Validation</div>
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 border rounded-lg">
          <FiSearch className="text-slate-500" />
          <input
            placeholder="Search (soon)"
            className="outline-none text-sm placeholder:text-slate-400"
          />
        </div>
        <div className="w-8 h-8 rounded-full bg-amber-500/90 text-white grid place-items-center font-semibold">
          S
        </div>
      </div>
    </header>
  );
}
