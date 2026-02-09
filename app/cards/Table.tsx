import React from 'react';
import { cn } from '@/lib/utils';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
  className?: string;
}

const Table: React.FC<TableProps> = ({ headers, children, className }) => {
  return (
    <div className={cn("w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm", className)}>
      <div className="w-full overflow-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/40 text-muted-foreground border-b border-border">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-6 py-4 font-medium whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
