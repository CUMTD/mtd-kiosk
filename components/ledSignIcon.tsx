import Image from 'next/image';

interface Props {
	alt?: string;
	title?: string;
}

export default function LedSignIcon({ alt = 'LED Sign', title = 'This kiosk has an LED sign.' }: Props) {
	return <Image src={'/LedSignIcon.svg'} alt={alt} title={title} width={20} height={20} />;
}
