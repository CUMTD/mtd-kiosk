'use client';
import { GoCheck, GoChevronRight, GoIssueClosed, GoIssueOpened, GoIssueReopened, GoPencil, GoPlus, GoTrash, GoX } from 'react-icons/go';
import KioskTicket, { TicketNote, TicketStatusType } from '../../../types/kioskTicket';
import styles from './Issue.module.css';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { deleteTicketComment, updateTicket, updateTicketComment } from '../../../helpers/httpMethods';
import { NewCommentForm } from './NewCommentForm';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import 'canvas-confetti';
import confetti from 'canvas-confetti';
import LoadingAnimation from '../../../components/loadingAnimation';
import React from 'react';
import { useRouter } from 'next/navigation';
import { set } from 'sanity';
import UserIcon from '../../../components/userIcon';
require('crypto');

export interface IssueProps {
	issue: KioskTicket;
}

export function Issue({ issue }: IssueProps) {
	var openDate = new Date(issue.openDate);
	// closeDate can be null if the issue is still open

	var closeDate: Date | null = new Date(issue.closeDate || Date.now());

	const currentDate = new Date();
	const [issueOpen, setIssueOpen] = useState(issue.status === TicketStatusType.OPEN);

	const issueClasses = clsx({
		[styles.issueContainer]: true,
		[styles.closedIssue]: !issueOpen
	});

	const handleIssueClose = async () => {
		let result = await updateTicket(issue.id, TicketStatusType.RESOLVED);
		if (!result) {
			console.error('Failed to close issue');
			return;
		}
		var defaults = {
			scalar: 2,
			spread: 160,
			particleCount: 50,
			origin: { y: -0.1 },
			startVelocity: -35
		};
		setIssueOpen(false);
		confetti({ ...defaults });
		// call the close issue function
		console.log('Issue closed');
	};

	const handleIssueReopen = async () => {
		let result = await updateTicket(issue.id, TicketStatusType.OPEN);

		if (!result) {
			console.error('Failed to reopen issue');
			return;
		}
		setIssueOpen(true);
		// call the reopen issue function
		console.log('Issue reopened');
	};

	var dialogRef = useRef<HTMLDialogElement>(null);

	return (
		<>
			<NewCommentForm issueId={issue.id} dialogRef={dialogRef} />

			<div className={issueClasses}>
				<div className={styles.issueHeader}>
					<div className={styles.icon}>
						{!issueOpen ? (
							<GoIssueClosed title="Closed" style={{ color: 'purple', fontSize: '200%' }} />
						) : (
							<GoIssueOpened title="Open" style={{ color: 'green', fontSize: '200%' }} />
						)}
					</div>
					<div className={styles.issueInfo}>
						<div>
							<h3 className={styles.title}>
								{issue.title} {issueOpen && currentDate.getTime() - openDate.getTime() < 3 * 24 * 60 * 60 * 1000 && <sup className={styles.newBadge}>New</sup>}
							</h3>
							{/* add a new badge if its less than 3 days old */}

							<p className={styles.openedBy}>
								<b>{issue.openedBy}</b> opened on {openDate.toLocaleDateString()}
								{!issueOpen && ` and closed on ${closeDate.toLocaleDateString()}`}
							</p>
						</div>
						<div className={styles.issueActions}>
							{issueOpen ? (
								<IssueActionButton
									text="Mark as Closed"
									onClick={handleIssueClose}
									className={styles.issueActionButton}
									reactIcon={<GoCheck fontSize={'150%'} />}
								/>
							) : (
								<IssueActionButton
									text="Reopen Issue"
									onClick={handleIssueReopen}
									className={styles.issueActionButton}
									reactIcon={<GoIssueReopened fontSize={'150%'} />}
								/>
							)}

							<IssueActionButton
								text="Add Comment"
								onClick={() => dialogRef.current?.showModal()}
								className={styles.issueActionButton}
								reactIcon={<GoPlus fontSize={'150%'} />}
								disabled={!issueOpen}
							/>
						</div>
					</div>
				</div>

				{/* <h3 className={styles.issueComments}>Description</h3> */}
				<div className={styles.issueBody}>
					<p className={styles.issueDescription}>{issue.description ? issue.description : <i>No description provided.</i>}</p>
				</div>
				{issue.ticketNotes && issue.ticketNotes.length > 0 && (
					<div>
						{issue.ticketNotes && issue.ticketNotes.length > 0 && <IssueCommentList comments={issue.ticketNotes} ticketStatus={issue.status} />}
						{/* {issue.ticketNotes.length} {issue.ticketNotes.length == 1 ? 'Comment' : 'Comments'} <GoChevronRight /> */}
					</div>
				)}
			</div>
		</>
	);
}

interface IssueActionButtonProps {
	text: string;
	className?: string;
	onClick(): void;
	reactIcon: React.JSX.Element;
	disabled?: boolean;
}
function IssueActionButton({ text, className, onClick, reactIcon, disabled }: IssueActionButtonProps) {
	const [isLoading, setIsLoading] = useState(false);

	const setLoadingOnClick = async () => {
		setIsLoading(true);
		await onClick();
		setIsLoading(false);
	};
	return (
		<button className={clsx(styles.issueActionButton, className)} onClick={setLoadingOnClick} disabled={disabled || isLoading}>
			{isLoading && <LoadingAnimation />} {!isLoading && reactIcon} {text}
		</button>
	);
}

interface IssueCommentListProps {
	comments: TicketNote[];
	ticketStatus: TicketStatusType;
}

function IssueCommentList({ comments, ticketStatus }: IssueCommentListProps) {
	return (
		<div className={styles.issueCommentsContainer}>
			{/* <h3 className={styles.issueComments}>Comments</h3> */}

			<div className={styles.commentContainer}>
				{comments.map((comment) => (
					<IssueComment key={comment.id} comment={comment} ticketStatus={ticketStatus} />
				))}
			</div>
		</div>
	);
}

interface IssueCommentProps {
	comment: TicketNote;
	ticketStatus: TicketStatusType;
}
function IssueComment({ comment, ticketStatus }: IssueCommentProps) {
	const router = useRouter();
	const { data: session } = useSession({ required: true });
	const [isEditing, setIsEditing] = useState(false);
	const [editedComment, setEditedComment] = useState(comment.markdownBody);

	const [confirmDelete, setConfirmDelete] = useState(false);
	const [pendingDelete, setPendingDelete] = useState(false);

	const [pendingSave, setPendingSave] = useState(false);

	const handleCommentDelete = async () => {
		if (!confirmDelete) {
			setConfirmDelete(true);
			return;
		}
		setPendingDelete(true);
		let result = await deleteTicketComment(comment.id);
		if (!result) {
			window.alert('Failed to delete comment');
			setPendingDelete(false);
			return;
		}
		// setPendingDelete(false);
		router.refresh();
	};

	const handleCommentSave = async () => {
		setPendingSave(true);
		let result = await updateTicketComment(comment.id, editedComment);
		if (!result) {
			setPendingSave(false);
			window.alert('Failed to update comment');

			return;
		}
		setEditedComment(editedComment);
		setPendingSave(false);
		setIsEditing(false);
		router.refresh();
	};

	const handleCommentDiscard = () => {
		setIsEditing(false);
		setEditedComment(comment.markdownBody);
	};

	const isModifiableByCurrentUser = session?.user?.name === comment.createdBy;

	const deleteButtonClasses = clsx({
		[styles.commentModifyButton]: true,
		[styles.commentDeleteConfirm]: confirmDelete
	});

	return (
		<div key={comment.id} className={styles.comment}>
			<UserIcon />
			<div style={{ width: '100%' }}>
				<p>
					<b>{comment.createdBy}</b>{' '}
					<span className={styles.commentDate}>
						on {new Date(comment.createdDate).toLocaleDateString()} at{' '}
						{new Date(comment.createdDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}:
					</span>
				</p>
				<p className={styles.commentBody}>
					{!isEditing && comment.markdownBody}
					{/* calculate rows and cols needed */}
					{isEditing && (
						<textarea
							className={styles.textarea}
							value={editedComment}
							onChange={(e) => setEditedComment(e.target.value)}
							rows={editedComment.split('\n').length + 2}
						/>
					)}
					{isModifiableByCurrentUser && !isEditing && (
						<span className={styles.commentModifyButtons}>
							<button className={styles.commentModifyButton} onClick={() => setIsEditing(!isEditing)} disabled={ticketStatus !== TicketStatusType.OPEN}>
								<GoPencil />
							</button>
							<button
								className={deleteButtonClasses}
								onClick={handleCommentDelete}
								onBlur={() => setConfirmDelete(false)}
								disabled={ticketStatus !== TicketStatusType.OPEN}
							>
								{!confirmDelete ? (
									<GoTrash />
								) : (
									<>
										{pendingDelete ? <LoadingAnimation normal white /> : <GoTrash color="white" />}
										<span className={styles.confirmDeleteText}>Confirm</span>
									</>
								)}
							</button>
						</span>
					)}
					{isEditing && (
						<div className={styles.saveDiscardContainer}>
							<button className={styles.commentDiscardButton} onClick={handleCommentDiscard}>
								Discard
							</button>{' '}
							<button className={styles.commentSaveButton} onClick={handleCommentSave}>
								Save
							</button>
							{pendingSave && <LoadingAnimation normal />}
							<span style={{ flex: 1 }} />
						</div>
					)}
				</p>
			</div>
		</div>
	);
}
