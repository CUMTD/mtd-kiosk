'use client';
import KioskTicket from '../../../../../types/kioskTicket';
import { Issue } from './Issue';
import styles from './issuesList.module.css';

interface Props {
	issues: KioskTicket[];
}

export default function IssuesList({ issues }: Readonly<Props>) {
	if (issues.length == 0) {
		return <p>No issues.</p>;
	}
	return (
		<>
			<div className={styles.issueList}>{issues && issues.map((issue) => <Issue key={issue.id} issue={issue} />)}</div>
		</>
	);
}
