import Image from 'next/image';

export default function AnnunciatorIcon() {
	return <Image src={'/annunciator.png'} alt={'Annunciator button'} title={'This kiosk has an annunciator.'} width={20} height={20} />;
}
