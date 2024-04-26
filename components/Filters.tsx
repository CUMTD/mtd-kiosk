import styles from './toolbar.module.css';
import { useRecoilState } from 'recoil';
import { showProblemsOnlyState } from '../state/kioskState';
import { showMapState } from '../state/mapState';

export function Filters() {
	const [showProblemsOnly, setShowProblemsOnly] = useRecoilState(showProblemsOnlyState);
	const [showMap, setShowMap] = useRecoilState(showMapState);

	return (
		<div className={styles.checkboxes}>
			<label>
				<input type="checkbox" checked={showProblemsOnly} onChange={() => setShowProblemsOnly(!showProblemsOnly)} className={styles.checkbox} />
				Show Problems Only
			</label>
			<label>
				<input type="checkbox" checked={showMap} onChange={() => setShowMap(!showMap)} className={styles.checkbox} />
				Show Map
			</label>
		</div>
	);
}
