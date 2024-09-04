import { useRecoilValue } from 'recoil';
import styles from './KioskDepartures.module.css';
import { connectionErrorState, departureState, generalMessageState } from '../../../../state/kioskState';
import DepartureItem from './DepartureItem';
import { RiWifiOffLine } from 'react-icons/ri';
import { useEffect, useRef, useState } from 'react';
import IconMessageCarousel from './IconMessageCarousel';
import clsx from 'clsx';
import throwError from '../../../../helpers/throwError';

const DEPARTURES_PAGINATION_INTERVAL = parseInt(process.env.NEXT_PUBLIC_DEPARTURES_PAGINATION_INTERVAL ?? '');

if (!DEPARTURES_PAGINATION_INTERVAL || isNaN(DEPARTURES_PAGINATION_INTERVAL)) {
	throwError('NEXT_PUBLIC_DEPARTURES_PAGINATION_INTERVAL is not defined');
}

export default function KioskDepartureItemList() {
	const scrollText = useRef<HTMLSpanElement>(null);
	const scrollContainer = useRef<HTMLDivElement>(null);

	const departures = useRecoilValue(departureState);
	const generalMessage = useRecoilValue(generalMessageState);
	const connectionError = useRecoilValue(connectionErrorState);

	useEffect(() => {
		if (generalMessage && generalMessage.text && scrollText.current && scrollContainer.current) {
			scrollText.current.style.animationDuration = scrollAnimationDuration(generalMessage.text);
		}
	}, [generalMessage]);

	// pagination logic
	const DEPARTURES_PER_PAGE = 7;
	const [page, setPage] = useState(0);
	var currentPageDepartures = departures.slice(page * DEPARTURES_PER_PAGE, (page + 1) * DEPARTURES_PER_PAGE);
	var totalPages = Math.ceil(departures.length / DEPARTURES_PER_PAGE);

	useEffect(() => {
		if (departures.length <= DEPARTURES_PER_PAGE) {
			return;
		}

		const interval = setInterval(() => {
			setPage((page) => (page + 1) % totalPages);
		}, DEPARTURES_PAGINATION_INTERVAL);

		return () => clearInterval(interval);
	}, [departures]);

	if (connectionError) {
		return (
			<div className={styles.connectionError}>
				<RiWifiOffLine /> Network error. Call 217-384-8188 for help.
			</div>
		);
	}

	const scrollAnimationDuration = (text: string, speed = 90) => {
		//amount of pixels per second * (width of message + container width)
		const messageWidth = text.length * 10;
		const containerWidth = scrollContainer.current?.offsetWidth || 0;
		const totalWidth = messageWidth + containerWidth;

		const duration = totalWidth / speed;
		return `${duration}s`;
	};

	return (
		<>
			<div className={styles.kioskDeparturesContainer}>
				{generalMessage && generalMessage.blocksRealtime ? (
					<div className={styles.realtimeBlockingGeneralMessage}>{generalMessage.text}</div>
				) : (
					<>
						{generalMessage && (
							<div ref={scrollContainer} className={styles.generalMessage}>
								<span ref={scrollText} style={{ animationDuration: scrollAnimationDuration(generalMessage.text) }}>
									{generalMessage.text}
								</span>
							</div>
						)}

						{!currentPageDepartures || (currentPageDepartures.length == 0 && <div className={styles.noDepartures}>No departures in the next hour.</div>)}

						<div className={styles.kioskDepartures}>
							{currentPageDepartures &&
								currentPageDepartures.length > 0 &&
								currentPageDepartures.map((departure, index) => <DepartureItem route={departure} key={index} />)}
						</div>
					</>
				)}

				{currentPageDepartures.length > 0 && <IconMessageCarousel />}
				{totalPages > 1 && <PageIndicator page={page} totalPages={totalPages} />}
			</div>
		</>
	);
}

interface PageIndicatorProps {
	page: number;
	totalPages: number;
}

// visual page indicator like ios does
function PageIndicator({ page, totalPages }: PageIndicatorProps) {
	const classes = clsx(styles.pageIndicators, { [styles.hidden]: totalPages <= 1 });

	return (
		<div className={classes}>
			{Array.from({ length: totalPages }).map((_, index) => (
				<div key={index} className={clsx(styles.pageIndicatorDot, { [styles.activePageIndicatorDot]: index == page })}></div>
			))}
		</div>
	);
}
