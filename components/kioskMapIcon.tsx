import clsx from 'clsx';
import { useRecoilValue } from 'recoil';
import { showProblemsOnlyState } from '../state/kioskState';
import { focusedKioskIdState } from '../state/mapState';
import { HealthStatus } from '../types/HealthStatus';
import styles from './kioskMapIcon.module.css';

interface KioskMapIconProps {
	id: string;
	health: HealthStatus;
	openIssuesCount: number;
}

export default function KioskMapIcon({ id, health, openIssuesCount }: KioskMapIconProps) {
	// const [healthStatus, setHealthStatus] = useState<ServerHealthStatuses>();
	const showProblemsOnly = useRecoilValue(showProblemsOnlyState);

	// useEffect(() => {
	// 	async function fetchHealthStatus() {
	// 		const healthStatuses = await getHealthStatuses(id);
	// 		if (healthStatuses) setHealthStatus(healthStatuses);
	// 	}
	// 	fetchHealthStatus();
	// 	setTimeout(() => fetchHealthStatus(), 10000);
	// }, [id]);

	const focusedKiosk = useRecoilValue(focusedKioskIdState);

	const classes = clsx(styles.icon, {
		[styles.healthy]: health === HealthStatus.HEALTHY,
		[styles.warning]: health === HealthStatus.WARNING,
		[styles.critical]: health === HealthStatus.CRITICAL,
		[styles.focused]: focusedKiosk === id
	});

	if (showProblemsOnly && health === HealthStatus.HEALTHY) return null;

	return <div className={classes}>{openIssuesCount > 0 ? openIssuesCount : ''}</div>;
}
