'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { GoX } from 'react-icons/go';
import { createKioskTicket } from '../../../../helpers/httpMethods';
import styles from './newIssueForm.module.css';
interface NewIssueFormProps {
	kioskId: string;
}

export default function NewIssueForm({ kioskId }: NewIssueFormProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const { data: session } = useSession({ required: true });

	const router = useRouter();

	useEffect(() => {
		// console.log(session?.user?.token);
		// const token = await getToken({ req })
	}, [session]);

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
				<form
					className={styles.newIssueForm}
					onSubmit={async (e) => {
						e.preventDefault();
						var result = await createKioskTicket({
							kioskId: kioskId,
							openedBy: session?.user?.name || 'System',
							// @ts-expect-error TODO: fix this
							description: e.target.description.value,
							// @ts-expect-error
							title: e.target.title.value
						});
						if (result) {
							// @ts-expect-error
							e.target.reset();

							router.refresh();
							dialogRef.current?.close();
						} else {
							alert('Failed to create ticket.');
						}
					}}
				>
					<label className={styles.label}>
						Title
						<input autoComplete="off" className={styles.title} required name="title" type="text"></input>
					</label>

					<label className={styles.label}>
						Description
						<textarea className={styles.description} name="description" rows={4} cols={50}></textarea>
					</label>

					{/* some invisible form values */}
					<input type="hidden" name="kioskId" value={kioskId} />

					<label>
						{/* Create Issue and include form data */}
						<input type="submit" value="Create Issue" className={styles.button} />
					</label>
				</form>
			</dialog>
		</>
	);
}
