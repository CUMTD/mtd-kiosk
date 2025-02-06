import { BsPerson, BsPersonFill } from 'react-icons/bs';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
import styles from './OccupancyIndicator.module.css';
import clsx from 'clsx';

interface OccupancyIndicatorProps {
	occupancyStatus: number;
	backgroundHexColor?: string;
	absolute: boolean;
}

// 0 = EMPTY
// 1 = MANY_SEATS_AVAILABLE
// 2 = FEW_SEATS_AVAILABLE
// 3 = STANDING_ROOM_ONLY
// 4 = CRUSHED_STANDING_ROOM_ONLY
// 5 = FULL
// 6 = NOT_ACCEPTING_PASSENGERS
// 7 = NO_DATA_AVAILABLE
// 8 = NOT_BOARDABLE

export default function OccupancyIndicator({ occupancyStatus, backgroundHexColor, absolute }: OccupancyIndicatorProps) {
	const classes = clsx(styles.occupancyIndicator, {
		[styles.absolute]: absolute
	});

	if (occupancyStatus === GtfsRealtimeBindings.transit_realtime.VehiclePosition.OccupancyStatus.NO_DATA_AVAILABLE) {
		return null;
	}

	return (
		<div className={classes} style={{ borderColor: backgroundHexColor }}>
			{occupancyStatus > 0 ? <BsPersonFill /> : <BsPerson />}
			{occupancyStatus > 2 ? <BsPersonFill /> : <BsPerson />}
			{occupancyStatus > 3 ? <BsPersonFill /> : <BsPerson />}
		</div>
	);
}
