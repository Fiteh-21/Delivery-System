import {
  ClipboardList,
  BarChart3,
  Car,
  Users,
  Store,
} from 'lucide-react'
import {
  StatCard,
  DashboardChartCard,
  RevenueLineChart,
  OrdersDonutChart,
  PendingApprovalsCard,
  type PendingApproval,
} from '@/components/admin-dashboard'

const PENDING_APPROVALS: PendingApproval[] = [
  {
    id: '1',
    name: 'Sushi Tokyo',
    owner: 'Kenji Tanaka',
    category: 'Sushi',
    avatarInitial: 'S',
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard
          icon={ClipboardList}
          value="12,847"
          label="Total Orders"
          trend="+8%"
          trendVariant="success"
        />
        <StatCard
          icon={BarChart3}
          value="ETB 2.8M"
          label="Total Revenue"
          trend="+15%"
          trendVariant="success"
        />
        <StatCard
          icon={Car}
          value="34"
          label="Active Drivers"
          trend="online now"
          trendVariant="neutral"
        />
        <StatCard
          icon={Users}
          value="4,210"
          label="Customers"
          trend="+120 this week"
          trendVariant="success"
        />
        <StatCard
          icon={Store}
          value="67"
          label="Restaurants"
          trend="4 pending"
          trendVariant="warning"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <DashboardChartCard title="Revenue Over Time" className="lg:col-span-2">
          <RevenueLineChart />
        </DashboardChartCard>

        <DashboardChartCard title="Orders by Status">
          <OrdersDonutChart />
        </DashboardChartCard>
      </div>

      <PendingApprovalsCard items={PENDING_APPROVALS} />
    </div>
  )
}