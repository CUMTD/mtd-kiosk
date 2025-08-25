/* eslint-disable @next/next/no-img-element */

export default function SanityStudioIcon() {
	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
			<img
				src="/mtd.svg"
				alt=""
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'contain',
					maxWidth: '100px',
					maxHeight: '50px'
				}}
			/>
		</div>
	);
}
