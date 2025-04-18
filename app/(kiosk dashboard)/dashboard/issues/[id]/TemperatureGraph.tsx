'use client';
import { Temperature } from '../../../../../types/Temperature';
import { LineChart, Line, YAxis, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import styles from './TemperatureData.module.css';
import { Inter } from 'next/font/google';

interface TemperatureGraphProps {
	data: Temperature[];
}

const inter = Inter({ subsets: ['latin'] });

export default function TemperatureGraph({ data }: TemperatureGraphProps) {
	const renderDateTick = (date: number) => {
		return new Date(date).toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' });
	};

	return (
		<div suppressHydrationWarning className={`${inter.className} ${styles.graph}`}>
			<ResponsiveContainer width={'100%'} height={325}>
				<LineChart data={data} style={{ fontFamily: inter.style.fontFamily }}>
					<Line
						isAnimationActive={false}
						type="monotone"
						dataKey="tempFahrenheit"
						name="Temperature"
						stroke="rgb(var(--foreground-rgb))"
						dot={false}
						activeDot
						strokeWidth={3}
						unit={'°F'}
						connectNulls={false}
					/>
					<Line
						isAnimationActive={false}
						type="monotone"
						dataKey="relHumidity"
						name="Relative Humidity"
						stroke="lightblue"
						dot={false}
						activeDot
						strokeWidth={3}
						unit={'%'}
						connectNulls={false}
					/>

					{/* <CartesianGrid stroke="#ccc" strokeDasharray="3 3" /> */}
					<XAxis
						// includeHidden
						dataKey="timestamp"
						type="number"
						interval={'preserveStartEnd'}
						tickFormatter={renderDateTick}
						scale={'time'}
						domain={['dataMin', 'dataMax']}
						minTickGap={60}
					/>
					<YAxis />
					<Tooltip content={<CustomTooltip />} />
					<Legend verticalAlign="top" />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

function CustomTooltip({ active, payload, label }: any) {
	var date = new Date(label);
	if (active && payload && payload.length) {
		return (
			<div>
				<p>
					{date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
				</p>
				<p>{`Temperature: ${payload[0].value}°F`}</p>
				<p>{`Relative Humidity: ${payload[1].value}%`}</p>
			</div>
		);
	}

	return null;
}
