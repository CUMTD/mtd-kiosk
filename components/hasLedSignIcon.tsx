import Image from 'next/image';

export default function HasLedSignIcon() {
	return <Image src={'/LEDsignicon.jpg'} alt="Has LED Sign" width={20} height={20} title="This kiosk has an LED sign." />;
}
