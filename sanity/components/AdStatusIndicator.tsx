import { useMemo } from 'react';
import { NumberInputProps } from 'sanity';

export default function AdStatusIndicator(props: NumberInputProps) {
	const status = props.value;
	const statusText = useMemo(() => {
		switch (status) {
			case 0:
				return 'Live';
			case 1:
				return 'Upcoming';
			case 2:
				return 'Expired';
			default:
				return 'Unknown';
		}
	}, [status]);

	const statusColor = useMemo(() => {
		switch (status) {
			case 0:
				return 'green';
			case 1:
				return 'yellow';
			case 2:
				return 'maroon';
			default:
				return 'black';
		}
	}, [status]);

	return (
		<div style={{ width: '100%', backgroundColor: statusColor, padding: '.7em', fontWeight: 'bold', borderRadius: '3px' }}>
			<span style={{ color: statusColor === 'yellow' ? 'black' : 'white' }}>{statusText}</span>
		</div>
	);
}
