import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ApprovalListItemProps {
  name: string
  owner: string
  category: string
  avatarInitial: string
  onApprove?: () => void
  onReject?: () => void
  className?: string
}

export function ApprovalListItem({
  name,
  owner,
  category,
  avatarInitial,
  onApprove,
  onReject,
  className,
}: ApprovalListItemProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 border-t border-gray-100 py-4 first:border-t-0 first:pt-0 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
          {avatarInitial}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">
            {owner} • {category}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onReject}
          className="rounded-lg px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={onApprove}
          className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600"
        >
          <Check className="h-4 w-4" />
          Approve
        </button>
      </div>
    </div>
  )
}
