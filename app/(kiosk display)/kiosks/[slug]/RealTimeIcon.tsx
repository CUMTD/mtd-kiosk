import Image from 'next/image';

const ICON_SIZE = 20;

interface RealTimeIconProps {
	color: 'black' | 'white';
}

export default function RealTimeIcon({ color }: RealTimeIconProps) {
	return <Image src={color == 'white' ? '/realtime-icon-white.svg' : '/realtime-icon-black.svg'} alt="Real-time icon" width={ICON_SIZE} height={ICON_SIZE} />;
}
