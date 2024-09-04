import clsx from 'clsx';
import { GoIssueDraft } from 'react-icons/go';
import styles from '../components/loadingAnimation.module.css';

interface LoadingAnimationProps {
	small?: boolean;
	white?: boolean;
}
export default function LoadingAnimation({ small = false, white = false }: LoadingAnimationProps) {
	const classes = clsx({
		[styles.loadingAnimation]: true,
		[styles.large]: !small,
		[styles.white]: white
	});
	return <GoIssueDraft className={classes} />;
}
