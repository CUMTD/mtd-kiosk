import * as React from 'react';
import Map, { Marker, MapRef } from 'react-map-gl/mapbox';

import 'mapbox-gl/dist/mapbox-gl.css';
import throwError from '../../../../helpers/throwError';
import { useRecoilValue } from 'recoil';
import { darkModeState, gbfsBikeStatus, kioskState } from '../../../../state/kioskState';
import FreeBikeStatus, { Bike } from '../../../../types/gbfsTypes/FreeBikeStatus';
import GbfsUpdater from './VeoRideGBFSUpdater';
import styles from './VeoRideMap.module.css';
import clsx from 'clsx';
import { FaBicycle } from 'react-icons/fa6';
import CompassRose from './VeoRideMapCompassRose';

export default function VeoRideMap() {
	const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? throwError('NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is not defined');
	const kiosk = useRecoilValue(kioskState);
	const freeBikes = useRecoilValue(gbfsBikeStatus);
	const mapRef = React.useRef<MapRef | null>(null);
	const darkMode = useRecoilValue(darkModeState);

	return (
		<div className={styles.veoContainer}>
			{/* <div className={styles.banner}>Map</div> */}
			<GbfsUpdater />
			{kiosk.location && (
				<Map
					ref={mapRef}
					mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
					initialViewState={{
						longitude: kiosk.location?.lng,
						latitude: kiosk.location?.lat,
						zoom: 17
					}}
					bearing={0}
					reuseMaps={true}
					interactive={false}
					style={{ gridArea: 'veo-map', position: 'relative', width: '100%', height: '100%' }}
					mapStyle={darkMode ? 'mapbox://styles/matthewnovelli/cmh58jq4r00pz01s5awphd2ig' : 'mapbox://styles/mapbox/streets-v12'}
				>
					{/* <div className={styles.callout}>
						<b style={{ fontSize: '90%', letterSpacing: '1px', backgroundColor: 'maroon', padding: '3px 5px', borderRadius: '5px' }}>NEW!</b> Nearby mobility
						alternatives and points of interest
					</div> */}
					<CompassRose heading={mapRef.current?.getBearing()} />
					{freeBikes && kiosk.location?.lng && kiosk.location?.lat && mapRef.current && <VeoBikes freeBikeStatus={freeBikes} mapRef={mapRef.current} />}
					{kiosk.location?.lng && kiosk.location?.lat && (
						<Marker latitude={kiosk.location?.lat} longitude={kiosk.location?.lng} scale={2} style={{ zIndex: 200 }} color="red" />
					)}
					<IconLegend />
				</Map>
			)}
		</div>
	);
}

interface VeoBikesProps {
	freeBikeStatus: FreeBikeStatus;
	mapRef: MapRef;
}

function VeoBikes({ freeBikeStatus, mapRef }: VeoBikesProps) {
	// filter bikes to those within current map bounds; if bounds not available, render none
	const bounds = mapRef.getBounds();
	if (!bounds) return null;
	const visibleBikes = freeBikeStatus.data.bikes.filter((bike) => !bike.is_reserved && !bike.is_disabled && bounds.contains([bike.lon, bike.lat]));

	return (
		<>
			{visibleBikes.map((bike) => (
				<VeoBikeMarker bike={bike} key={bike.bike_id} />
			))}
		</>
	);
}

interface VeoBikeMarkerProps {
	bike: Bike;
}
function VeoBikeMarker({ bike }: VeoBikeMarkerProps) {
	const markerClasses = clsx({ [styles.marker]: true, [styles.ebike]: bike.vehicle_type_id });

	// need to pull in a separate gbfs subfeed if we want this
	const bikeType = bike.vehicle_type_id;

	return (
		<Marker key={bike.bike_id} longitude={bike.lon} latitude={bike.lat} anchor="center" className={markerClasses}>
			{/* {bike. <BsLightningChargeFill size={'1em'} /> */}
			<FaBicycle size={'2em'} />
		</Marker>
	);
}

function IconLegend() {
	return (
		<div className={styles.legend}>
			<table>
				<tbody>
					<tr>
						<td>
							<div className={styles.sampleMarker}>
								<FaBicycle size={'2em'} />
							</div>
						</td>
						<td>Requires payment through &quot;Veo&quot; app</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
