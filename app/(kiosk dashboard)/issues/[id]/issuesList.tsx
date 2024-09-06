import { fetchKioskTickets } from '../../../../helpers/httpMethods';
import { Issue } from './Issue';
import styles from './issuesList.module.css';

interface Props {
	kioskId: string;
}

export default async function IssuesList({ kioskId }: Readonly<Props>) {
	const issues = await fetchKioskTickets(kioskId);

	return (
		<>
			<div className={styles.issueList}>{issues && issues.map((issue) => <Issue key={issue.id} issue={issue} />)}</div>
		</>
	);
}
