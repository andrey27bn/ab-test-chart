import React, { useState, useMemo } from 'react'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'
// import type { TooltipProps } from 'recharts'

import { processData, COLORS } from './utils'
import { ChartControls } from './components/ChartControls'
import rawDataFile from './data/data.json'
import type { RawData, PeriodMode } from './types'
import './App.css'

const rawData = rawDataFile as RawData

interface CustomTooltipProps {
    active?: boolean
    payload?: Array<{
        name: string
        value: number | string
        color: string
    }>
    label?: string | number
}


// Компонент Тултипа (теперь использует CustomTooltipProps)
const CustomTooltip = ({
    active,
    payload, 
    label,
}: CustomTooltipProps) => { 
    if (active && payload && payload.length) {
        return (
            <div className='custom-tooltip'>
                <p className='tooltip-date'>{label}</p>
                {payload.map((entry: any) => ( 
                    <div key={entry.name} style={{ color: entry.color }}>
                        {entry.name}: <strong>{entry.value}%</strong>
                    </div>
                ))}
            </div>
        )
    }
    return null
}

const App: React.FC = () => {
	const [period, setPeriod] = useState<PeriodMode>('day')
	const [selectedIds, setSelectedIds] = useState<string[]>(
		rawData.variations.map(v => (v.id ? v.id.toString() : '0'))
	)

	const chartData = useMemo(() => processData(rawData, period), [period])

	const handleToggleVariation = (id: string) => {
		setSelectedIds(prev => {
			if (prev.includes(id)) {
				if (prev.length === 1) return prev
				return prev.filter(item => item !== id)
			} else {
				return [...prev, id]
			}
		})
	}

	return (
		<div className='app-container'>
			<header>
				<h1>A/B Test Conversion Rate</h1>
			</header>

			<main className='chart-wrapper'>
				<ChartControls
					variations={rawData.variations}
					selectedIds={selectedIds}
					onToggleVariation={handleToggleVariation}
					period={period}
					setPeriod={setPeriod}
				/>

				<div style={{ width: '100%', minWidth: 0 }}>
					<ResponsiveContainer width='100%' aspect={3}>
						<LineChart
							data={chartData}
							margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
						>
							<CartesianGrid
								strokeDasharray='3 3'
								vertical={false}
								stroke='#eee'
							/>

							<XAxis dataKey='date' tick={{ fontSize: 12 }} tickMargin={10} />

							<YAxis
								tickFormatter={value => `${value}%`}
								domain={['auto', 'auto']}
								tick={{ fontSize: 12 }}
							/>

							<Tooltip content={<CustomTooltip />} />

							{rawData.variations.map(variation => {
								const id = variation.id ? variation.id.toString() : '0'
								if (!selectedIds.includes(id)) return null

								return (
									<Line
										key={id}
										type='monotone'
										dataKey={`rate_${id}`}
										name={variation.name}
										stroke={COLORS[id as keyof typeof COLORS] || '#000'}
										strokeWidth={2}
										dot={{ r: 3 }}
										activeDot={{ r: 6 }}
										connectNulls
									/>
								)
							})}
						</LineChart>
					</ResponsiveContainer>
				</div>
			</main>
		</div>
	)
}

export default App
