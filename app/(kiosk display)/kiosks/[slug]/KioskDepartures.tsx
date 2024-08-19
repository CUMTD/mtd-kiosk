import Departure from '../../../../types/kioskDisplayTypes/Departure';
import DepartureItem from './DepartureItem';
import styles from './KioskDepartures.module.css';

interface KioskDeparturesProps {
	departures: Departure[];
}

export default function KioskDepartures({ departures }: KioskDeparturesProps) {
	return (
		<div className={styles.kioskDeparturesContainer}>
			<div className={styles.kioskDepartures}>
				{departures.map((departure, index) => (
					<DepartureItem departure={departure} key={index} />
				))}
			</div>
		</div>
	);
}
