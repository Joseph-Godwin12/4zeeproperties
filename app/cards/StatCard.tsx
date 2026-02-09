import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendUp?: boolean;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, trendUp, className }) => {
  return (
    <div className={cn("rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6 hover:shadow-md transition-shadow", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="text-2xl font-bold tracking-tight">{value}</div>
        </div>
        <div className={cn("h-10 w-10 rounded-full flex items-center justify-center bg-primary/10 text-primary shadow-sm")}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {(trend !== undefined) && (
        <div className="mt-4 flex items-center text-xs font-medium">
          {trendUp === true ? (
            <span className="flex items-center text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md">
                <TrendingUp className="mr-1 h-3 w-3" />
                {trend}%
            </span>
          ) : trendUp === false ? (
             <span className="flex items-center text-red-600 bg-red-50 px-1.5 py-0.5 rounded-md">
                <TrendingDown className="mr-1 h-3 w-3" />
                {trend}%
             </span>
          ) : (
             <span className="flex items-center text-gray-600 bg-gray-50 px-1.5 py-0.5 rounded-md">
                <Minus className="mr-1 h-3 w-3" />
                0%
             </span>
          )}
          <span className="ml-2 text-muted-foreground">vs. last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
