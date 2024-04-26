import { GoIssueDraft } from 'react-icons/go';
import styles from '../components/loadingAnimation.module.css';
import clsx from 'clsx';

interface LoadingAnimationProps {
	normal?: boolean;
	white?: boolean;
}
export default function LoadingAnimation({ normal, white }: LoadingAnimationProps) {
	const classes = clsx({
		[styles.loadingAnimation]: true,
		[styles.large]: !normal,
		[styles.white]: white
	});
	return <GoIssueDraft className={classes} />;
}
