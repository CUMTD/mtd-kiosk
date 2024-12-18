import clsx from 'clsx';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import throwError from '../../../../helpers/throwError';
import { currentPageState, showPagerSelector, totalPagesSelector } from '../../../../state/kioskState';
import styles from './pageIndicator.module.css';

const DEPARTURES_PAGINATION_INTERVAL = parseInt(
	process.env.NEXT_PUBLIC_DEPARTURES_PAGINATION_INTERVAL ?? throwError('NEXT_PUBLIC_DEPARTURES_PAGINATION_INTERVAL is not defined')
);

export default function PageIndicator() {
	const showPager = useRecoilValue(showPagerSelector);
	const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
	const totalPages = useRecoilValue(totalPagesSelector);

	useEffect(() => {
		// show pager will be true if block realtime is false
		// and totalPages is > 1
		if (!showPager) {
			// reset current page to 0 so we don't get stuck
			// on page index 1 with fewer than 2 pages of departures
			setCurrentPage(0);
			return () => {};
		}

		// only set the interval if we have multiple pages
		const interval = setInterval(() => {
			setCurrentPage((page) => (page + 1) % totalPages);
		}, DEPARTURES_PAGINATION_INTERVAL);

		return () => clearInterval(interval);
	}, [setCurrentPage, showPager, totalPages]);

	// visual page indicator like ios does
	const classes = clsx({
		pager: true,
		[styles.pageIndicators]: true,
		[styles.hidden]: totalPages <= 1
	});

	if (!showPager) {
		return null;
	}

	return (
		<div className={classes}>
			{Array.from({ length: totalPages }).map((_, index) => (
				<div
					style={{ animationDuration: `${DEPARTURES_PAGINATION_INTERVAL}ms` }}
					key={index}
					className={clsx(styles.pageIndicatorDot, { [styles.activePageIndicatorDot]: index == currentPage })}
				></div>
			))}
		</div>
	);
}
