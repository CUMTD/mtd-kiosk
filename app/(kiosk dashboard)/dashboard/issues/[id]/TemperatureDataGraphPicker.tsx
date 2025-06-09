'use client';

import { useState } from 'react';
import DailyTemperatureGraph from './DailyTemperatureGraph';
import { TemperatureMinutely } from '../../../../../types/TemperatureMinutely';
import { TemperatureDaily } from '../../../../../types/TemperatureDaily';
import MinutelyTemperatureGraph from './MinutelyTemperatureGraph';
import InfoCard from '../InfoCard';
import styles from './TemperatureDataGraphPicker.module.css';
import clsx from 'clsx';

interface TemperatureGraphDataPickerProps {
	minuteData?: TemperatureMinutely[];
	dailyData?: TemperatureDaily[];
}

export default function TemperatureGraphDataPicker({ minuteData, dailyData }: TemperatureGraphDataPickerProps) {
	const [dateTypeState, setDataTypeState] = useState<'minute' | 'daily'>('minute');

	if (!minuteData && !dailyData) {
		return <InfoCard title="Conditions">No data.</InfoCard>;
	}

	const handleRadioChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value as 'minute' | 'daily';
		setDataTypeState(value);
	};

	const minuteLabelStyles = clsx({
		[styles.label]: true,
		[styles.activeLabel]: dateTypeState === 'minute',
		[styles.inactiveLabel]: dateTypeState === 'daily'
	});

	const dailyLabelStyles = clsx({
		[styles.label]: true,
		[styles.activeLabel]: dateTypeState === 'daily',
		[styles.inactiveLabel]: dateTypeState === 'minute'
	});

	const control = (
		<div className={styles.controls}>
			<input type="radio" name="dataType" id="minute" value="minute" checked={dateTypeState === 'minute'} onChange={handleRadioChange()} />
			<label className={minuteLabelStyles} htmlFor="minute">
				By Minute
			</label>
			<input type="radio" name="dataType" id="daily" value="daily" checked={dateTypeState === 'daily'} onChange={handleRadioChange()} />
			<label className={dailyLabelStyles} htmlFor="daily">
				By Day
			</label>
		</div>
	);

	return (
		<InfoCard title="Conditions" button={control}>
			<div className={styles.graphBox}>
				{minuteData && (
					<div style={{ opacity: dateTypeState == 'minute' ? '1' : '0', zIndex: dateTypeState == 'minute' ? '1' : '0' }} className={styles.graph}>
						<MinutelyTemperatureGraph data={minuteData} />
					</div>
				)}
				{dailyData && (
					<div style={{ opacity: dateTypeState == 'daily' ? '1' : '0', zIndex: dateTypeState == 'daily' ? '1' : '0' }} className={styles.graph}>
						<DailyTemperatureGraph data={dailyData} />
					</div>
				)}
			</div>
		</InfoCard>
	);
}
