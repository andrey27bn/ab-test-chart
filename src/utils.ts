import type { RawData, ChartDataPoint, PeriodMode } from './types'
import { startOfWeek, format, parseISO } from 'date-fns'

export const COLORS = {
	'0': '#2E3A59', // Original (Dark Blue)
	'10001': '#3366FF', // Variation A (Blue)
	'10002': '#00D68F', // Variation B (Green)
	'10003': '#FF3D71', // Variation C (Red)
}

// Функция расчета CR
const calculateRate = (conversions: number, visits: number): number => {
	if (!visits || visits === 0) return 0
	return parseFloat(((conversions / visits) * 100).toFixed(2))
}

export const processData = (
	rawData: RawData,
	mode: PeriodMode
): ChartDataPoint[] => {
	if (mode === 'day') {
		return rawData.data.map(day => {
			const point: ChartDataPoint = { date: day.date }

			// Проходим по всем вариациям (включая Original с ключом "0")
			Object.keys(day.visits).forEach(id => {
				const visits = day.visits[id]
				const conversions = day.conversions[id] || 0
				point[`rate_${id}`] = calculateRate(conversions, visits)
			})

			return point
		})
	} else {
		// Агрегация по неделям
		const weeklyMap = new Map<
			string,
			{ visits: Record<string, number>; conversions: Record<string, number> }
		>()

		rawData.data.forEach(day => {
			// Определяем начало недели для даты
			const weekStart = format(
				startOfWeek(parseISO(day.date), { weekStartsOn: 1 }),
				'yyyy-MM-dd'
			)

			if (!weeklyMap.has(weekStart)) {
				weeklyMap.set(weekStart, { visits: {}, conversions: {} })
			}

			const currentWeek = weeklyMap.get(weekStart)!

			// Суммируем visits и conversions
			Object.keys(day.visits).forEach(id => {
				currentWeek.visits[id] = (currentWeek.visits[id] || 0) + day.visits[id]
				currentWeek.conversions[id] =
					(currentWeek.conversions[id] || 0) + (day.conversions[id] || 0)
			})
		})

		// Преобразуем карту обратно в массив и считаем CR от сумм
		return Array.from(weeklyMap.entries()).map(([date, stats]) => {
			const point: ChartDataPoint = { date }
			Object.keys(stats.visits).forEach(id => {
				point[`rate_${id}`] = calculateRate(
					stats.conversions[id],
					stats.visits[id]
				)
			})
			return point
		})
	}
}
