export interface Variation {
	id?: number
	name: string
}

export interface DailyStats {
	date: string
	visits: Record<string, number>
	conversions: Record<string, number>
}

export interface RawData {
	variations: Variation[]
	data: DailyStats[]
}

export interface ChartDataPoint {
	date: string
	[key: string]: number | string
}

export type PeriodMode = 'day' | 'week'
