import { fetchAllTickets } from '../../../../helpers/httpMethods';
import styles from './page.module.css';
import IssueTable from './IssueTable';
import { client } from '../../../../sanity/lib/client';
import { Kiosk } from '../../../../sanity.types';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'All Issues'
};

export default async function AllIssues() {
	var allIssues = await fetchAllTickets();
	const allKiosks = (await client.fetch(`*[_type == "kiosk"] {_id, displayName}`)) as Pick<Kiosk, '_id' | 'displayName'>[];

	// create a dict that maps id to displayname
	const kioskIdToDisplayName = allKiosks.reduce(
		(acc, kiosk) => {
			acc[kiosk._id] = kiosk.displayName || 'Unknown Kiosk';
			return acc;
		},
		{} as Record<string, string>
	);

	if (allIssues === null) {
		return <p>Could not load issues.</p>;
	}

	// allIssues = allIssues.sort((a, b) => {
	// 	// Sort by open date, most recent first
	// 	return new Date(b.openDate).getTime() - new Date(a.openDate).getTime();
	// });

	return (
		<main className={styles.page}>
			<div className={styles.issueList}>
				<IssueTable kioskNames={kioskIdToDisplayName} issues={allIssues} />
			</div>
		</main>
	);
}
