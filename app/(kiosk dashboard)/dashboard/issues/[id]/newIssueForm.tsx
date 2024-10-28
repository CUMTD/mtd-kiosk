'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useRef } from 'react';
import { useFormState } from 'react-dom';
import { GoX } from 'react-icons/go';
import SubmitButton from '../../../../../components/submitButton';
import styles from './newIssueForm.module.css';
import { createNewIssueFormAction } from './newIssueFormServerActions';

interface NewIssueFormProps {
	kioskId: string;
}

// TODO: Update other forms to work this way.
export default function NewIssueForm({ kioskId }: NewIssueFormProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	const { data: session } = useSession({ required: true });
	const userName = useMemo(() => session?.user?.name || 'System', [session?.user?.name]);

	// will call createNewIssueFormAction when form is submitted
	// status will be 'success' if the form submission was successful
	// errorMessage will contain the error message if status is 'error'
	// { status: 'unset' } is the initial state, just like with useState
	const [{ status, errorMessage }, action] = useFormState(createNewIssueFormAction, { status: 'unset' });

	useEffect(() => {
		// close dialog if status is 'success'
		if (status === 'success') {
			dialogRef.current?.close();
		}
	}, [status]);

	return (
		<>
			<button className={styles.button} onClick={() => dialogRef.current?.showModal()}>
				New Issue
			</button>
			<dialog className={styles.dialog} ref={dialogRef}>
				<div className={styles.dialogHeader}>
					<h2 className={styles.headerText}>Create new issue</h2>
					<button className={styles.closeButton} onClick={() => dialogRef.current?.close()}>
						<GoX style={{ fontSize: '200%' }} />
					</button>
				</div>
				<form className={styles.newIssueForm} action={action}>
					<label className={styles.label}>
						Title
						<input autoComplete="off" className={styles.title} required name="title" type="text"></input>
					</label>

					<label className={styles.label}>
						Description
						<textarea className={styles.description} name="description" rows={4} cols={50}></textarea>
					</label>

					{errorMessage && <p className={styles.message}>{errorMessage}</p>}

					{/* some invisible form values */}
					<input type="hidden" name="kioskId" value={kioskId} />
					<input type="hidden" name="openedBy" value={userName} />

					<SubmitButton label="Create Issue" loading="Creating Issue..." />
				</form>
			</dialog>
		</>
	);
}
