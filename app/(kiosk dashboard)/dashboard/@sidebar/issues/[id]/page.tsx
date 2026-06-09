import { use } from 'react';
import SidebarLayout from '../../sidebarLayout';

interface Props {
	params: Promise<{ id: string }>;
}

export default function Page({ params }: Readonly<Props>) {
	const { id } = use(params);
	return <SidebarLayout defaultFocusedKioskId={id} />;
}
