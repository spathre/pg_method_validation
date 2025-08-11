import React from 'react';

export default function Card({ title, children, footer }) {
  return (
    <div className="bg-white border rounded-xl shadow-sm">
      {title && (
        <div className="px-4 py-3 border-b font-medium text-slate-800">
          {title}
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer && <div className="px-4 py-3 border-t bg-slate-50">{footer}</div>}
    </div>
  );
}
