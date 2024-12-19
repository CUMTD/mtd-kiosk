import SidebarLayout from '../../sidebarLayout';

interface Props {
	params: { id: string };
}

export default function Page({ params: { id } }: Readonly<Props>) {
	return <SidebarLayout defaultFocusedKioskId={id} />;
}
