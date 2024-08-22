import styles from './RealTimeIcon.module.css';
import Image from 'next/image';

const ICON_SIZE = 20;

export default function RealTimeIcon() {
	return <Image src="/realtime-icon-adaptive.svg" alt="Real-time icon" width={ICON_SIZE} height={ICON_SIZE} />;
}
