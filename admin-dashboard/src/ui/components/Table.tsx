import React from 'react'

export function Table({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  )
}

export function THead({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="text-left text-slate-500" {...props}>{children}</thead>
}

export function TBody({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className="divide-y divide-[rgb(var(--border))]" {...props}>{children}</tbody>
}

export function TR({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className="border-b border-[rgb(var(--border))] last:border-0" {...props}>{children}</tr>
}

export function TH({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className="px-3 py-2 font-medium" {...props}>{children}</th>
}

export function TD({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className="px-3 py-2" {...props}>{children}</td>
}
