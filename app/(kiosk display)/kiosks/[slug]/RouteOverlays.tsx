'use client';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { useMap } from '@vis.gl/react-google-maps';
import { useEffect, useMemo } from 'react';
import { PathLayer, ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import { useRecoilValue } from 'recoil';
import { routePolylinesState } from '../../../../state/realtimeBusPositionState';
import DeckGL from '@deck.gl/react';
import { kioskState } from '../../../../state/kioskState';
import { DeckProps } from '@deck.gl/core';

export default function RouteOverlays() {
	// const map = useMap();
	const kiosk = useRecoilValue(kioskState);
	const tripIdsToPolylines = useRecoilValue(routePolylinesState) || {};

	// decode the polylines into an array
	const decodedPolylines: number[][][] = [];
	Object.keys(tripIdsToPolylines).forEach((trip, idx) => {
		const decodedPolyLine = decodePolyline(tripIdsToPolylines[trip]);
		decodedPolylines.push(decodedPolyLine);
	});

	// console.log('decodedPolylines', decodedPolylines);

	// console.log('geoJsonLines', geoJsonLines);

	const textLayer = new TextLayer({
		id: 'text-layer',
		getText: () => 'HELLO WORLD',
		getPosition: () => [-88.22722998456203, 40.10725889692191],
		getColor: [0, 255, 0],
		getSize: 600,
		getAlignmentBaseline: 'center',
		getTextAnchor: 'middle',
		pickable: true
	});

	// const pathLayer = new PathLayer<number[][]>({
	// 	// id: 'PathLayer',

	// 	data: [
	// 		{position : [-88.22724515742706, 40.10723568729594]}
	// 	]
	// 	colorFormat: 'RGB',
	// 	getColor: [0, 255, 0], // Ensure full opacity in RGBA
	// 	widthMinPixels: 10, // Helps prevent rendering issues
	// 	// billboard: true,

	// 	getPath: (d: number[][]) => {
	// 		// console.log('d', d);
	// 		return [d[0][1], d[0][0]];
	// 	},
	// 	positionFormat: 'XY'

	// 	// getWidth: 20
	// 	// pickable: true
	// });

	const scatterPlotLayer = new ScatterplotLayer({
		id: 'deckgl-circle',
		data: [{ position: [-88.22734378104983, 40.107137046297225] }],
		getPosition: (d) => d.position,
		getFillColor: [255, 0, 0, 100],
		getRadius: 1000
	});

	return <DeckGLOverlay layers={[scatterPlotLayer, textLayer]} />;

	// useEffect(() => {
	// 	if (!map) return;

	// 	const overlay = new GoogleMapsOverlay({ layers: [pathLayer, textLayer] });

	// 	overlay.setMap(map);

	// 	// return () => overlay.setMap(null); // Cleanup on unmount
	// }, [map, pathLayer]); // Runs only when map or pathLayer changes

	// // const overlay = new GoogleMapsOverlay({
	// // 	layers: [pathLayer]
	// // });

	// // if (map) overlay.setMap(map);

	// return null;
}

function DeckGLOverlay(props: DeckProps) {
	const map = useMap();
	const overlay = useMemo(() => new GoogleMapsOverlay(props));

	useEffect(() => {
		overlay.setMap(map);
		return () => overlay.setMap(null);
	}, [map]);

	overlay.setProps(props);
	return null;
}

// return tuple
function decodePolyline(encoded: string): number[][] {
	const points: number[][] = [];
	let index = 0;
	const len = encoded.length;
	let lat = 0;
	let lng = 0;

	while (index < len) {
		let b: number,
			shift = 0,
			result = 0;
		do {
			b = encoded.charCodeAt(index++) - 63;
			result |= (b & 0x1f) << shift;
			shift += 5;
		} while (b >= 0x20);
		const dlat = result & 1 ? ~(result >> 1) : result >> 1;
		lat += dlat;

		shift = 0;
		result = 0;
		do {
			b = encoded.charCodeAt(index++) - 63;
			result |= (b & 0x1f) << shift;
			shift += 5;
		} while (b >= 0x20);
		const dlng = result & 1 ? ~(result >> 1) : result >> 1;
		lng += dlng;

		points.push([lat / 1e6, lng / 1e6]);
	}

	return points;
}
