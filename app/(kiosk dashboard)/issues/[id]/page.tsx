import { getToken } from 'next-auth/jwt';
import { Issue } from './Issue';
import NewIssueForm from './newIssueForm';
import styles from './page.module.css';
import { fetchKiosk, fetchKioskTickets } from '../../../../helpers/httpMethods';
import KioskTicket, { TicketStatusType } from '../../../../types/kioskTicket';

// get [id] from the URL
export default async function IssuePage({ params }: { params: { id: string } }) {
	const kiosk = await fetchKiosk(params.id);
	const issues = await fetchKioskTickets(params.id);

	// console.log(kioskData);
	return (
		<div>
			{/* <NewIssueForm kioskId={kiosk._id} /> */}
			<div className={styles.issuesHeader}>
				<h2>{issues.length == 0 ? 'No' : ''} Issues</h2>
				{/* display count open and count closed */}

				<NewIssueForm kioskId={kiosk._id} />
				<span style={{ flex: 1 }}></span>
				{issues.length > 0 && (
					<span className={styles.issueCount}>
						{issues.filter((issue) => issue.status == TicketStatusType.OPEN).length} Open,{' '}
						{issues.filter((issue) => issue.status == TicketStatusType.RESOLVED).length} Closed
					</span>
				)}
			</div>

			{issues && <IssuesList issues={issues} />}
		</div>
	);
}

interface IssuesListProps {
	issues: KioskTicket[];
}

function IssuesList({ issues }: IssuesListProps) {
	if (issues.length === 0) {
		return null;
	}
	// console.log(issues);

	return (
		<>
			<div className={styles.issueList}>{issues && issues.map((issue) => <Issue key={issue.id} issue={issue} />)}</div>
		</>
	);
}
