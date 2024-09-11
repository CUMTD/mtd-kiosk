import clsx from 'clsx';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import throwError from '../../../../helpers/throwError';
import { currentPageState, showPagerSelector, totalPagesSelector } from '../../../../state/kioskState';
import styles from './pageIndicator.module.css';

const DEPARTURES_PAGINATION_INTERVAL = parseInt(
	process.env.NEXT_PUBLIC_DEPARTURES_PAGINATION_INTERVAL ?? throwError('NEXT_PUBLIC_DEPARTURES_PAGINATION_INTERVAL is not defined')
);

export default function PageIndicator() {
	const showPager = useRecoilValue(showPagerSelector);
	const currentPage = useRecoilValue(currentPageState);
	const totalPages = useRecoilValue(totalPagesSelector);
	const setCurrentPage = useSetRecoilState(currentPageState);

	useEffect(() => {
		if (!showPager) {
			return () => {};
		}

		const interval = setInterval(() => {
			setCurrentPage((page) => (page + 1) % totalPages);
		}, DEPARTURES_PAGINATION_INTERVAL);

		return () => clearInterval(interval);
	}, [setCurrentPage, showPager, totalPages]);

	// visual page indicator like ios does
	const classes = clsx({
		[styles.pageIndicators]: true,
		[styles.hidden]: totalPages <= 1
	});

	if (!showPager) {
		return null;
	}

	return (
		<div className={classes}>
			{Array.from({ length: totalPages }).map((_, index) => (
				<div key={index} className={clsx(styles.pageIndicatorDot, { [styles.activePageIndicatorDot]: index == currentPage })}></div>
			))}
		</div>
	);
}
