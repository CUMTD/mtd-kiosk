import { useState } from 'react';
import OccupancyIndicator from './OccupancyIndicator';
import styles from './OccupancyLegend.module.css';
import { IoInformationCircleSharp } from 'react-icons/io5';
import { IoMdInformationCircle } from 'react-icons/io';

export default function OccupancyLegend() {
	const [demoOccupancyStatus, setDemoOccupancyStatus] = useState(0);

	// cycle between 0,1,3,4 every 4 seconds
	setTimeout(() => {
		var vals = [0, 1, 3, 4];
		var index = vals.indexOf(demoOccupancyStatus);
		index = (index + 1) % vals.length;
		setDemoOccupancyStatus(vals[index]);

		// console.log('demoOccupancyStatus', demoOccupancyStatus);
	}, 4000);

	var description = '';

	switch (demoOccupancyStatus) {
		case 0:
			description = 'Empty';
			break;
		case 1:
		case 2:
			description = 'Many seats available';
			break;
		case 3:
			description = 'Few seats available';
			break;
		case 4:
		case 5:
			description = 'Standing room only';
			break;
	}

	return (
		<div className={styles.container}>
			{/* <IoMdInformationCircle size={20} className={styles.infoIcon} /> */}
			<table className={styles.table}>
				{/* <thead>
					<tr className={styles.legendTitle}>
						<th colSpan={2}>Legend</th>
					</tr>
				</thead> */}
				<tbody>
					<tr>
						<td className={styles.occupancyIndicator}>
							<OccupancyIndicator occupancyStatus={demoOccupancyStatus} absolute={false} />
						</td>
						<td className={styles.description}>{description}</td>
					</tr>
					{/* <tr>
						<td className={styles.occupancyIndicator}>
							<OccupancyIndicator
								occupancyStatus={GtfsRealtimeBindings.transit_realtime.VehiclePosition.OccupancyStatus.MANY_SEATS_AVAILABLE}
								absolute={false}
							/>
						</td>
						<td>Many seats available</td>
					</tr>
					<tr>
						<td className={styles.occupancyIndicator}>
							<OccupancyIndicator occupancyStatus={GtfsRealtimeBindings.transit_realtime.VehiclePosition.OccupancyStatus.STANDING_ROOM_ONLY} absolute={false} />
						</td>
						<td>Some seats available</td>
					</tr>
					<tr>
						<td className={styles.occupancyIndicator}>
							<OccupancyIndicator occupancyStatus={GtfsRealtimeBindings.transit_realtime.VehiclePosition.OccupancyStatus.FULL} absolute={false} />
						</td>
						<td>Standing room only</td>
					</tr> */}
				</tbody>
			</table>
		</div>
	);
}
