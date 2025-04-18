import { awaitGetTemperatureHistory } from '../../../../../helpers/httpMethods';
import TemperatureGraph from './TemperatureGraph';
interface TemperatureGraphProps {
	kioskId: string;
}

export default async function TemperatureData({ kioskId }: TemperatureGraphProps) {
	const temperatureHistory = await awaitGetTemperatureHistory(kioskId);

	if (!temperatureHistory || temperatureHistory.length === 0) {
		return <div style={{ height: '100%', margin: 'auto', opacity: '80%' }}>No data.</div>;
	}

	return <TemperatureGraph data={temperatureHistory} />;
}
