import { GetDailyTemperatureHistory, GetMinutelyTemperatureHistory } from '../../../../../helpers/httpMethods';
import InfoCard from '../InfoCard';
import DailyTemperatureGraph from './DailyTemperatureGraph';
import TemperatureGraphDataPicker from './TemperatureDataGraphPicker';
interface TemperatureGraphProps {
	kioskId: string;
}

export default async function TemperatureData({ kioskId }: TemperatureGraphProps) {
	const temperatureHistory = await GetMinutelyTemperatureHistory(kioskId);
	const dailyTemperatureHistory = await GetDailyTemperatureHistory(kioskId);

	// if (!temperatureHistory || temperatureHistory.length === 0) {
	// 	return <div style={{ height: '100%', margin: 'auto', opacity: '80%' }}>No data.</div>;
	// }

	return <TemperatureGraphDataPicker minuteData={temperatureHistory} dailyData={dailyTemperatureHistory} />;
	// return <DailyTemperatureGraph data={dailyTemperatureHistory} />;

	// return <MinutelyTemperatureGraph data={dailyTemperatureHistory} />;
}
