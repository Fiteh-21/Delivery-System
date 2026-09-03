export interface RevenueDataPoint {
  month: string
  value: number
}

const DEFAULT_DATA: RevenueDataPoint[] = [
  { month: 'Feb', value: 120_000 },
  { month: 'Mar', value: 135_000 },
  { month: 'Apr', value: 145_000 },
  { month: 'May', value: 195_000 },
  { month: 'Jun', value: 255_000 },
  { month: 'Jul', value: 310_000 },
  { month: 'Aug', value: 345_000 },
]

const Y_TICKS = [0, 90_000, 180_000, 270_000, 360_000]
const CHART_HEIGHT = 220
const CHART_WIDTH = 560
const PADDING = { top: 12, right: 12, bottom: 32, left: 52 }

function formatYAxis(value: number): string {
  if (value === 0) return '0'
  return value.toLocaleString()
}

export interface RevenueLineChartProps {
  data?: RevenueDataPoint[]
}

export function RevenueLineChart({ data = DEFAULT_DATA }: RevenueLineChartProps) {
  const maxValue = Y_TICKS[Y_TICKS.length - 1]
  const plotWidth = CHART_WIDTH - PADDING.left - PADDING.right
  const plotHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom

  const points = data.map((point, index) => {
    const x = PADDING.left + (index / (data.length - 1)) * plotWidth
    const y = PADDING.top + plotHeight - (point.value / maxValue) * plotHeight
    return { ...point, x, y }
  })

  const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${PADDING.top + plotHeight} L ${points[0].x} ${PADDING.top + plotHeight} Z`

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="h-[220px] w-full min-w-[320px]"
        role="img"
        aria-label="Revenue over time line chart"
      >
        {Y_TICKS.map((tick) => {
          const y = PADDING.top + plotHeight - (tick / maxValue) * plotHeight
          return (
            <g key={tick}>
              <line
                x1={PADDING.left}
                y1={y}
                x2={CHART_WIDTH - PADDING.right}
                y2={y}
                stroke="#f3f4f6"
                strokeWidth={1}
              />
              <text
                x={PADDING.left - 8}
                y={y + 4}
                textAnchor="end"
                className="fill-gray-400 text-[10px]"
              >
                {formatYAxis(tick)}
              </text>
            </g>
          )
        })}

        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F97316" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#F97316" stopOpacity={0.02} />
          </linearGradient>
        </defs>

        <path d={areaPath} fill="url(#revenueGradient)" />
        <path
          d={linePath}
          fill="none"
          stroke="#F97316"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((point) => (
          <g key={point.month}>
            <text
              x={point.x}
              y={CHART_HEIGHT - 8}
              textAnchor="middle"
              className="fill-gray-500 text-[11px]"
            >
              {point.month}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
