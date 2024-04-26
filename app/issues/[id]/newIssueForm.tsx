'use client';
import { useRef } from 'react';
import styles from './newIssueForm.module.css';
import { GoX } from 'react-icons/go';
import { createKioskTicket } from '../../../helpers/httpMethods';
import { useSession } from 'next-auth/react';
import { revalidateTag } from 'next/cache';
import { useRouter } from 'next/navigation';
interface NewIssueFormProps {
	kioskId: string;
}

export default function NewIssueForm({ kioskId }: NewIssueFormProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const { data: session } = useSession({ required: true });
	const router = useRouter();

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
				{/* todo hardcoded */}
				<form
					className={styles.newIssueForm}
					// action={'https://localhost:7122/ticket'}
					// method="post"
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
					{/* todo user */}

					<label>
						{/* Create Issue and include form data */}
						<input type="submit" value="Create Issue" className={styles.button} />
					</label>
				</form>
			</dialog>
		</>
	);
}
