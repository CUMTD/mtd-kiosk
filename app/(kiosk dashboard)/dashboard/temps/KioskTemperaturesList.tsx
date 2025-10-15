'use client';

import { fetchKioskList, GetAllDailyTemperatureHistory } from '../../../../helpers/httpMethods';
import { AllTemperatureDaily } from '../../../../types/TemperatureDaily';
import { Kiosk } from '../../../../sanity.types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './KioskTemperaturesList.module.css';
import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function KioskTemperaturesList() {
	const [kiosksTemps, setKiosksTemps] = useState<AllTemperatureDaily[][]>([]);
	const [kiosks, setKiosks] = useState<Kiosk[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		const fetchData = async () => {
			try {
				setLoading(true);
				const [temperatureData, kioskData] = await Promise.all([GetAllDailyTemperatureHistory(), fetchKioskList()]);
				setKiosksTemps(temperatureData);
				setKiosks(kioskData);
			} catch (err) {
				setError('Failed to load temperature data');
				console.error('Error fetching temperature data:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (!isMounted || loading) {
		return (
			<div className={styles.temperaturesList}>
				<div className={styles.loading}>
					<p>Loading temperature data...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className={styles.temperaturesList}>
				<div className={styles.error}>
					<p>Error: {error}</p>
				</div>
			</div>
		);
	}
	// Create a map of kiosk IDs to kiosk details for easy lookup, filtering out development kiosks
	const kioskMap = new Map<string, Kiosk>();
	kiosks
		.filter((kiosk) => !kiosk.displayName?.includes('development'))
		.forEach((kiosk) => {
			kioskMap.set(kiosk._id, kiosk);
		});

	// Format temperature data for charts
	const formatTemperatureData = (temperatures: AllTemperatureDaily[]) => {
		return temperatures
			.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
			.map((temp) => ({
				...temp,
				date: new Date(temp.date).getTime(),
				minTempFahrenheit: Math.round(temp.minTempFahrenheit),
				maxTempFahrenheit: Math.round(temp.maxTempFahrenheit),
				avgTempFahrenheit: Math.round(temp.avgTempFahrenheit),
				minRelHumidity: Math.round(temp.minRelHumidity),
				maxRelHumidity: Math.round(temp.maxRelHumidity),
				avgRelHumidity: Math.round(temp.avgRelHumidity)
			}));
	};

	const renderDateTick = (date: number) => {
		return new Date(date).toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' });
	};

	// Custom tooltip component
	const CustomTooltip = ({ active, payload, label }: any) => {
		const date = new Date(label);
		if (active && payload && payload.length) {
			const isTemperatureChart = payload.some((entry: any) => entry.dataKey.includes('Temp'));
			
			if (isTemperatureChart && payload.length >= 3) {
				return (
					<div className={styles.tooltip}>
						<h4>{date.toLocaleDateString()}</h4>
						<p style={{ color: 'orange' }}>{`Max: ${payload[0].value}°F`}</p>
						<p>{`Avg: ${payload[1].value}°F`}</p>
						<p style={{ color: 'lightblue' }}>{`Min: ${payload[2].value}°F`}</p>
					</div>
				);
			} else if (!isTemperatureChart && payload.length >= 3) {
				// Humidity chart
				return (
					<div className={styles.tooltip}>
						<h4>{date.toLocaleDateString()}</h4>
						<p style={{ color: '#6699CC' }}>{`Max: ${payload[0].value}%`}</p>
						<p>{`Avg: ${payload[1].value}%`}</p>
						<p style={{ color: 'lightblue' }}>{`Min: ${payload[2].value}%`}</p>
					</div>
				);
			}
		}
		return null;
	};

	return (
		<div className={styles.temperaturesList}>
			{kiosksTemps
				.filter((kioskTemperatures) => {
					if (kioskTemperatures.length === 0) return false;
					const kioskId = kioskTemperatures[0]?.kioskId;
					return kioskId && kioskMap.has(kioskId); // Only include kiosks that passed the development filter
				})
				.map((kioskTemperatures, index) => {

				const kioskId = kioskTemperatures[0]?.kioskId;
				const kiosk = kioskId ? kioskMap.get(kioskId) : null;
				const chartData = formatTemperatureData(kioskTemperatures);

				return (
					<div key={kioskId || index} className={styles.kioskTemperatureCard}>
						<div className={styles.cardHeader}>
							<div className={styles.kioskInfo}>
								<Link href={`/dashboard/issues/${kioskId}`} className={styles.kioskNameLink}>
									<h2 className={styles.kioskName}>{kiosk?.displayName || `Kiosk ${kioskId || 'Unknown'}`}</h2>
								</Link>
							</div>
						</div>

						<div className={styles.chartsContainer}>
							{/* Temperature Chart */}
							<div className={styles.chartSection}>
								<h3 className={styles.chartTitle}>Temperature (°F)</h3>
								<div className={`${inter.className} ${styles.graph}`}>
									<ResponsiveContainer width={'100%'} height={200}>
										<LineChart data={chartData} style={{ fontFamily: inter.style.fontFamily }}>
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
											<XAxis
												dataKey="date"
												tickFormatter={renderDateTick}
												tick={{ fontSize: 12 }}
												style={{ fontFamily: inter.style.fontFamily }}
											/>
											<YAxis tick={{ fontSize: 12 }} />
											<Tooltip content={<CustomTooltip />} />
										</LineChart>
									</ResponsiveContainer>
								</div>
							</div>

							{/* Humidity Chart */}
							<div className={styles.chartSection}>
								<h3 className={styles.chartTitle}>Humidity (%)</h3>
								<div className={`${inter.className} ${styles.graph}`}>
									<ResponsiveContainer width={'100%'} height={200}>
										<LineChart data={chartData} style={{ fontFamily: inter.style.fontFamily }}>
											<Line
												isAnimationActive={false}
												type="monotone"
												dataKey="maxRelHumidity"
												name="Max. Humidity"
												stroke="#6699CC"
												dot={false}
												activeDot
												strokeWidth={2}
												unit={'%'}
											/>
											<Line
												isAnimationActive={false}
												type="monotone"
												dataKey="avgRelHumidity"
												name="Avg. Humidity"
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
												name="Min. Humidity"
												stroke="lightblue"
												dot={false}
												activeDot
												strokeWidth={2}
												unit={'%'}
											/>
											<XAxis
												dataKey="date"
												tickFormatter={renderDateTick}
												tick={{ fontSize: 12 }}
												style={{ fontFamily: inter.style.fontFamily }}
											/>
											<YAxis tick={{ fontSize: 12 }} />
											<Tooltip content={<CustomTooltip />} />
										</LineChart>
									</ResponsiveContainer>
								</div>
							</div>
						</div>

						{chartData.length === 0 && (
							<div className={styles.noData}>
								<p>No temperature data available for this kiosk.</p>
							</div>
						)}
					</div>
				);
			})}

			{kiosksTemps.length === 0 && (
				<div className={styles.noData}>
					<p>No temperature data available.</p>
				</div>
			)}
		</div>
	);
}
