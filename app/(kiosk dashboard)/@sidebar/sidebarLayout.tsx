import { ReactNode } from 'react';
import KioskCards from '../../../components/kioskCards';
import { fetchKioskList, getHealthStatuses } from '../../../helpers/httpMethods';
import styles from './sidebarLayout.module.css';
import SidebarRoot from './sidebarRoot';

interface Props {
	children?: ReactNode;
}

export default async function SidebarLayout({ children }: Readonly<Props>) {
	const kiosks = await fetchKioskList();
	const healthStatuses = await getHealthStatuses();

	return (
		<SidebarRoot kiosks={kiosks} healthStatuses={healthStatuses}>
			<KioskCards />
			{children && <div className={styles.hasChildren}>{children}</div>}
		</SidebarRoot>
	);
}
