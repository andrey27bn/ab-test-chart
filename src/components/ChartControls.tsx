import React from 'react'
import type { Variation, PeriodMode } from '../types'
import styles from './ChartControls.module.css'

interface Props {
	variations: Variation[]
	selectedIds: string[]
	onToggleVariation: (id: string) => void
	period: PeriodMode
	setPeriod: (mode: PeriodMode) => void
}

export const ChartControls: React.FC<Props> = ({
	variations,
	selectedIds,
	onToggleVariation,
	period,
	setPeriod,
}) => {
	return (
		<div className={styles.controlsContainer}>
			<div className={styles.group}>
				<span className={styles.label}>Period:</span>
				<div className={styles.toggleGroup}>
					<button
						className={`${styles.btn} ${period === 'day' ? styles.active : ''}`}
						onClick={() => setPeriod('day')}
					>
						Day
					</button>
					<button
						className={`${styles.btn} ${
							period === 'week' ? styles.active : ''
						}`}
						onClick={() => setPeriod('week')}
					>
						Week
					</button>
				</div>
			</div>

			<div className={styles.group}>
				<span className={styles.label}>Variations:</span>
				<div className={styles.checkboxGroup}>
					{variations.map(v => {
						const id = v.id ? v.id.toString() : '0'
						return (
							<label key={id} className={styles.checkboxLabel}>
								<input
									type='checkbox'
									checked={selectedIds.includes(id)}
									onChange={() => onToggleVariation(id)}
								/>
								{v.name}
							</label>
						)
					})}
				</div>
			</div>
		</div>
	)
}
