'use client';
import { GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import KioskTicket, { TicketStatusType } from '../../../../../types/kioskTicket';
import styles from './IssueTable.module.css';
import { FaComment } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { IssueSecondarySortTypes, IssueSortTypes } from '../../../../../types/issueListTypes/issueSortTypes';

import { useRouter } from 'next/navigation';
import AttributeBadge from '../../../../../components/attributeBadge';

interface IssueTableProps {
	issues: KioskTicket[];
	kioskNames: Record<string, string>;
}

export default function IssueTable({ issues, kioskNames }: IssueTableProps) {
	const [currentSort, setCurrentSort] = useState<IssueSortTypes>(IssueSortTypes.STATUS);
	const [currentSecondarySort, setCurrentSecondarySort] = useState<IssueSecondarySortTypes>(IssueSecondarySortTypes.DESCENDING);
	const [issuesList, setIssues] = useState<KioskTicket[]>(issues.sort((a, b) => a.status - b.status));

	useEffect(() => {
		let sortedList = [...issues];
		if (currentSort === IssueSortTypes.STATUS) {
			sortedList.sort((a, b) => a.status - b.status);
		}
		if (currentSort === IssueSortTypes.TECHNICIAN) {
			sortedList.sort((a, b) => a.openedBy.localeCompare(b.openedBy));
		}
		if (currentSort === IssueSortTypes.RECENTLY_OPENED) {
			sortedList.sort((a, b) => -a.openDate.localeCompare(b.openDate));
		}
		if (currentSort === IssueSortTypes.RECENTLY_CLOSED) {
			sortedList.sort((a, b) => b.openDate.localeCompare(a.closeDate ?? '---'));
		}
		if (currentSort === IssueSortTypes.KIOSK) {
			sortedList.sort((a, b) => kioskNames[a.kioskId].localeCompare(kioskNames[b.kioskId]));
		}

		setIssues(sortedList);
	}, [issues, currentSort, currentSecondarySort]);

	const sortTypes = Object.values(IssueSortTypes).filter((t) => typeof t === 'string');

	return (
		<>
			<div className={styles.header}>
				<div className={styles.ticketCounts}>
					<h1>All Issues</h1>

					<AttributeBadge icon={<span className={styles.openIssueCount}>{issues.filter((t) => t.status == TicketStatusType.OPEN).length}</span>} text="Open" />
					<AttributeBadge
						icon={<span className={styles.closedIssueCount}>{issues.filter((t) => t.status == TicketStatusType.RESOLVED).length}</span>}
						text="Closed"
					/>
				</div>

				<div className={styles.sortContainer}>
					Sort by
					<select className={styles.sortDropdown} value={currentSort} onChange={(e) => setCurrentSort(parseInt(e.target.value) as unknown as IssueSortTypes)}>
						{sortTypes.map((t, idx) => {
							return (
								<option value={idx} key={idx} className={styles.sortOption}>
									{prettyPrintEnum(t)}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<table className={styles.issueTable}>
				<thead className={styles.thead}>
					<tr className={styles.issueRow}>
						<th>Status</th>
						<th>Kiosk</th>
						<th>Issue</th>
						<th>Technician</th>
						<th>Opened</th>
						<th>Closed</th>
						<th></th>
					</tr>
				</thead>
				<tbody className={styles.tbody}>
					{issuesList.map((issue) => {
						return <IssueRow key={issue.id} issue={issue} displayName={kioskNames[issue.kioskId]} />;
					})}
				</tbody>
			</table>
		</>
	);
}

interface IssueRowProps {
	issue: KioskTicket;
	displayName: string;
}
export function IssueRow({ issue, displayName }: IssueRowProps) {
	const router = useRouter();
	return (
		<tr className={styles.issueRow} onClick={() => router.push(`/dashboard/issues/${issue.kioskId}#${issue.id}`)}>
			{/* <Link href={`/dashboard/issues/${issue.kioskId}#${issue.id}`}> */}
			<td className={styles.td}>{IssueStatusIcon(issue.status)}</td>
			<td className={styles.td}>{displayName}</td>

			<td className={`${styles.td} ${styles.titleAndDesc}`}>
				{issue.title} <span className={styles.issueDescription}>{issue.description}</span>
			</td>
			<td className={styles.td}>{issue.openedBy}</td>
			<td className={styles.td}>{new Date(issue.openDate).toLocaleDateString()}</td>
			<td className={styles.td}>{issue.closeDate ? new Date(issue.closeDate).toLocaleDateString() : ''} </td>
			<td className={`${styles.td} ${styles.commentCount}`}>
				{issue.notes.length} <FaComment />
			</td>

			{/* <td>{issue.description}</td> */}
			{/* </Link> */}
		</tr>
	);
}

function IssueStatusIcon(status: TicketStatusType) {
	switch (status) {
		case TicketStatusType.OPEN:
			return (
				<div className={styles.issueStatus} style={{ backgroundColor: 'green' }}>
					{/* <span > */}
					{/* {' '} */}
					<GoIssueOpened title="Open" style={{ color: 'white', fontSize: '100%' }} />
					Open
					{/* </span> */}
				</div>
			);
		case TicketStatusType.RESOLVED:
			return (
				<div className={styles.issueStatus} style={{ backgroundColor: 'purple' }}>
					{/* <span > */}
					{/* {' '} */}
					<GoIssueClosed title="Closed" style={{ color: 'white', fontSize: '100%' }} />
					Closed
					{/* </span> */}
				</div>
			);
	}
}

function prettyPrintEnum(value: string) {
	return value.replace('_', ' ').toLowerCase();
}
