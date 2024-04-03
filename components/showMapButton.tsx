import { useRecoilState } from 'recoil';
import { showMapState } from '../state/mapState';

export default function ShowMapButton() {
	const [showMap, setShowMap] = useRecoilState(showMapState);
	return (
		<button style={{ padding: '1em' }} onClick={() => setShowMap(!showMap)}>
			{showMap ? 'Hide Map' : 'Show Map'}
		</button>
	);
}
