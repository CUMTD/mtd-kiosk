'use client';
import styles from './newIssueForm.module.css';
import { GoX } from 'react-icons/go';
import { useSession } from 'next-auth/react';
import { createTicketComment } from '../../../helpers/httpMethods';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoadingAnimation from '../../../components/loadingAnimation';

interface NewCommentFormProps {
	issueId: string;
	dialogRef: React.RefObject<HTMLDialogElement>;
}

export function NewCommentForm({ issueId, dialogRef }: NewCommentFormProps) {
	const router = useRouter();
	// const dialogRef = useRef<HTMLDialogElement>(null);
	const { data: session } = useSession({ required: true });

	const [isLoading, setIsLoading] = useState(false);

	return (
		<>
			<dialog className={styles.dialog} ref={dialogRef}>
				<div className={styles.dialogHeader}>
					<h2 className={styles.headerText}>Add comment</h2>
					<button className={styles.closeButton} onClick={() => dialogRef.current?.close()}>
						<GoX style={{ fontSize: '200%' }} />
					</button>
				</div>
				<form
					className={styles.newIssueForm}
					onSubmit={async (e) => {
						e.preventDefault();
						setIsLoading(true);

						// @ts-expect-error
						var result = await createTicketComment(issueId, e.target.comment.value || '', session?.user?.name || 'System');
						if (result) {
							router.refresh();
							//clear the form
							// @ts-expect-error
							e.target.comment.value = '';

							dialogRef.current?.close();
							setIsLoading(false);
						} else {
							alert('Failed to add comment.');
							setIsLoading(false);
						}
					}}
				>
					<textarea className={styles.description} minLength={5} name="comment" rows={10} cols={80}></textarea>

					{/* some invisible form values */}
					<input type="hidden" name="user" value={session?.user?.email || 'System'} />
					{/* todo user */}

					<div className={styles.addButtonContainer}>
						<span style={{ flex: 1 }} />
						{isLoading && <LoadingAnimation />}
						<label>
							{/* disable buton on click */}
							<input type="submit" value="Add" className={styles.button} disabled={isLoading} />
						</label>
					</div>
				</form>
			</dialog>
		</>
	);
}
