'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { GoX } from 'react-icons/go';
import SubmitButton from '../../../../../components/submitButton';
import styles from './newIssueForm.module.css';
import { createNewIssueFormAction } from './newIssueFormServerActions';
import InfoCard from '../InfoCard';
import IssuesList from './issuesList';
import KioskTicket from '../../../../../types/kioskTicket';

interface NewIssueFormProps {
	kioskId: string;
	issues: KioskTicket[];
}

// TODO: Update other forms to work this way.
export default function NewIssueForm({ kioskId, issues }: NewIssueFormProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	const { data: session } = useSession({ required: true });
	const userName = useMemo(() => session?.user?.name || 'System', [session?.user?.name]);

	// will call createNewIssueFormAction when form is submitted
	// status will be 'success' if the form submission was successful
	// errorMessage will contain the error message if status is 'error'
	// { status: 'unset' } is the initial state, just like with useState
	const [{ status, errorMessage }, action] = useFormState(createNewIssueFormAction, { status: 'unset' });
	const { pending } = useFormStatus();

	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		// close dialog if status is 'success'
		if (status === 'success') {
			titleRef.current!.value = '';
			descriptionRef.current!.value = '';
			dialogRef.current?.close();
		}
	}, [status]);

	const newIssueButton = (
		<>
			<button className={styles.button} onClick={() => dialogRef.current?.showModal()}>
				New Issue
			</button>
		</>
	);

	return (
		<>
			<dialog className={styles.dialog} ref={dialogRef}>
				<div className={styles.dialogHeader}>
					<h2 className={styles.headerText}>Create new issue</h2>
					<button className={styles.closeButton} onClick={() => dialogRef.current?.close()} disabled={pending}>
						<GoX style={{ fontSize: '200%' }} />
					</button>
				</div>
				<form className={styles.newIssueForm} action={action}>
					<label className={styles.label}>
						Title
						<input autoComplete="off" ref={titleRef} className={styles.title} required name="title" type="text"></input>
					</label>

					<label className={styles.label}>
						Description
						<textarea ref={descriptionRef} className={styles.description} name="description" rows={4} cols={50}></textarea>
					</label>

					{errorMessage && <p className={styles.message}>{errorMessage}</p>}

					{/* some invisible form values */}
					<input type="hidden" name="kioskId" value={kioskId} />
					<input type="hidden" name="openedBy" value={userName} />

					<SubmitButton label="Create Issue" loading="Creating Issue..." />
				</form>
			</dialog>
			<InfoCard title="Issues" button={newIssueButton} tall>
				<IssuesList issues={issues} />
			</InfoCard>
		</>
	);
}
