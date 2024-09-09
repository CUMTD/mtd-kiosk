'use client';

import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import styles from './submitButton.module.css';

interface Props {
	label: string;
	loading: ReactNode;
}

export default function SubmitButton({ label, loading }: Readonly<Props>) {
	// must be a child component of the form for this to work.
	const { pending } = useFormStatus();

	return (
		<button disabled={pending} type="submit" className={styles.button}>
			{pending ? loading : label}
		</button>
	);
}
