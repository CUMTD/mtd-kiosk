'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { GoX } from 'react-icons/go';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createKioskTicket } from '../../../../helpers/httpMethods';
import { newIssueTicketState, newIssueTicketValidSelector } from '../../../../state/newIssueState';
import styles from './newIssueForm.module.css';

export default function NewIssueForm() {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const router = useRouter();
	const [newIssue, setNewIssue] = useRecoilState(newIssueTicketState);
	const valid = useRecoilValue(newIssueTicketValidSelector);
	const { data: session } = useSession({ required: true });

	useEffect(() => {
		setNewIssue({
			...newIssue,
			openedBy: session?.user?.name || 'System'
		});
	}, [session?.user?.name]);

	async function submitForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		console.log('newIssue', newIssue);

		if (!valid) {
			alert('Please fill out all fields.');
		}

		let result = false;
		try {
			result = await createKioskTicket(newIssue);
		} catch (error) {
			console.error('Error creating ticket...', error);
		}

		if (result) {
			router.refresh();
			dialogRef.current?.close();
		} else {
			alert('Failed to create ticket.');
		}
	}

	return (
		<>
			<button className={styles.button} onClick={() => dialogRef.current?.showModal()} aria-controls="new-issue-dialog">
				New Issue
			</button>
			<dialog className={styles.dialog} ref={dialogRef} id="new-issue-dialog">
				<div className={styles.dialogHeader}>
					<h2 className={styles.headerText}>Create new issue</h2>
					<button className={styles.closeButton} onClick={() => dialogRef.current?.close()}>
						<GoX style={{ fontSize: '200%' }} />
					</button>
				</div>
				<form className={styles.newIssueForm} onSubmit={submitForm}>
					<label className={styles.label}>
						Title
						<input
							autoComplete="off"
							className={styles.title}
							required
							name="title"
							type="text"
							value={newIssue.title}
							onChange={(title) => setNewIssue({ ...newIssue, title: title.target.value })}
						/>
					</label>

					<label className={styles.label}>
						Description
						<textarea
							className={styles.description}
							name="description"
							rows={4}
							cols={50}
							value={newIssue.description}
							onChange={(description) => setNewIssue({ ...newIssue, description: description.target.value })}
						></textarea>
					</label>

					<label>
						{/* Create Issue and include form data */}
						<input type="submit" value="Create Issue" className={styles.button} />
					</label>
				</form>
			</dialog>
		</>
	);
}
