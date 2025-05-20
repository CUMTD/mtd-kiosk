'use client';
import { LineChart, Line, YAxis, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import styles from './TemperatureData.module.css';
import { Inter } from 'next/font/google';
import { TemperatureDaily } from '../../../../../types/TemperatureDaily';

interface TemperatureGraphProps {
	data: TemperatureDaily[];
}

const inter = Inter({ subsets: ['latin'] });

export default function DailyTemperatureGraph({ data }: TemperatureGraphProps) {
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
						dataKey="maxTempFahrenheit"
						name="Max. Temp."
						stroke="orange"
						dot={false}
						activeDot
						strokeWidth={2}
						unit={'°F'}
					/>
					<Line
						isAnimationActive={false}
						type="monotone"
						dataKey="avgTempFahrenheit"
						name="Avg. Temp."
						stroke="rgb(var(--foreground-rgb))"
						dot={false}
						activeDot
						strokeWidth={1}
						unit={'°F'}
						strokeDasharray={'5 5'}
					/>
					<Line
						isAnimationActive={false}
						type="monotone"
						dataKey="minTempFahrenheit"
						name="Min. Temp."
						stroke="lightblue"
						dot={false}
						activeDot
						strokeWidth={2}
						unit={'°F'}
					/>

					{/* <Line
						isAnimationActive={false}
						type="monotone"
						dataKey="maxRelHumidity"
						name="Max Rel. Humidity"
						stroke="green"
						dot={false}
						activeDot
						strokeWidth={2}
						unit={'%'}
					/>
					<Line
						isAnimationActive={false}
						type="monotone"
						dataKey="avgRelHumidity"
						name="Avg. Rel. Humidity"
						stroke="rgb(var(--foreground-rgb))"
						dot={false}
						activeDot
						strokeWidth={1}
						unit={'%'}
						strokeDasharray={'5 5'}
					/>
					<Line
						isAnimationActive={false}
						type="monotone"
						dataKey="minRelHumidity"
						name="Min. Rel. Humidity"
						stroke="green"
						dot={false}
						activeDot
						strokeWidth={2}
						unit={'%'}
					/> */}

					{/* <CartesianGrid stroke="#ccc" strokeDasharray="3 3" /> */}
					<XAxis
						includeHidden
						dataKey="date"
						type="number"
						interval={'preserveStartEnd'}
						tickFormatter={renderDateTick}
						scale={'time'}
						domain={['dataMin', 'dataMax']}
						minTickGap={60}
					/>
					<YAxis />
					<Tooltip content={<CustomTooltip />} />
					<Legend verticalAlign="bottom" />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

function CustomTooltip({ active, payload, label }: any) {
	var date = new Date(label);
	if (active && payload && payload.length >= 3) {
		return (
			<div className={styles.tooltip}>
				<h4>{date.toLocaleDateString()}</h4>
				<p style={{ color: 'orange' }}>{`Max: ${payload[0].value}°F`}</p>
				<p>{`Avg: ${payload[1].value}°F`}</p>
				<p style={{ color: 'lightblue' }}>{`Min: ${payload[2].value}°F`}</p>

				{/* <p>{`Relative Humidity: ${payload[1].value}%`}</p> */}
			</div>
		);
	}

	return null;
}
