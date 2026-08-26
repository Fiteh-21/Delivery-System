import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type StatTrendVariant = 'success' | 'neutral' | 'warning'

export interface StatCardProps {
  icon: LucideIcon
  value: string
  label: string
  trend?: string
  trendVariant?: StatTrendVariant
}

const trendStyles: Record<StatTrendVariant, string> = {
  success: 'text-emerald-600',
  neutral: 'text-emerald-600',
  warning: 'text-amber-600',
}

export function StatCard({
  icon: Icon,
  value,
  label,
  trend,
  trendVariant = 'success',
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500">
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className={cn('text-xs font-medium', trendStyles[trendVariant])}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold tracking-tight text-gray-900">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{label}</p>
    </div>
  )
}
