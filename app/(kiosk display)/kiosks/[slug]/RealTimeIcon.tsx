import styles from './RealTimeIcon.module.css';
import Image from 'next/image';

interface RealTimeIconProps {
	color: 'black' | 'white';
}

const ICON_SIZE = 30;

export default function RealTimeIcon({ color }: RealTimeIconProps) {
	if (color === 'black') {
		return <Image src="/realtime-icon-black.svg" alt="Real-time icon" width={ICON_SIZE} height={ICON_SIZE} />;
	} else if (color === 'white') {
		return <Image src="/realtime-icon-white.svg" alt="Real-time icon" width={ICON_SIZE} height={ICON_SIZE} />;
	}
}
