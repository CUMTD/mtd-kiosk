import Image from 'next/image';
import styles from './VeoRideMapCompassRose.module.css';

interface CompassRoseProps {
	heading: number | undefined;
}

export default function CompassRose({ heading }: CompassRoseProps) {
	return (
		heading !== undefined && (
			<Image src={'/rose.svg'} width={50} height={50} alt="" style={{ transform: `rotate(${-heading}deg)` }} className={styles.compassRose} />
		)
	);
}
