import { DocumentActionComponent, DocumentActionProps, useDocumentOperation } from 'sanity';
import { Advertisement } from '../../sanity.types';
import { calculateAdStatus } from '../../app/api/cron/route';

export function createImprovedAction(originalPublishAction: DocumentActionComponent) {
	console.log('building custom action');
	const BetterAction = (props: DocumentActionProps) => {
		const originalResult = originalPublishAction(props);
		const { patch } = useDocumentOperation(props.id, props.type);

		return {
			...originalResult,
			onHandle: () => {
				console.log('Running custom action');
				// Add our custom to update status if the document is an advertisement
				if (props.type == 'advertisement') {
					const currentStatus = props.published?.status;
					var newStatus = calculateAdStatus(props.draft as Advertisement);

					if (currentStatus !== newStatus) {
						console.log(`Updating status from ${currentStatus} to ${newStatus}`);
						patch.execute([{ set: { status: newStatus } }]);
					}
				}

				// then delegate to original handler
				if (originalResult?.onHandle) {
					originalResult.onHandle();
				}
			}
		};
	};

	return BetterAction;
}

export function ManuallyUpdateAdStatusAction(props: DocumentActionProps) {
	const { patch, publish } = useDocumentOperation(props.id, props.type);

	return {
		disabled: props.type !== 'advertisement',
		label: 'Refresh Status',
		onHandle: async () => {
			if (props.type == 'advertisement') {
				const currentStatus = props.published?.status;
				var newStatus = calculateAdStatus(props.draft as Advertisement);

				if (currentStatus !== newStatus) {
					console.log(`Updating status from ${currentStatus} to ${newStatus}`);
					patch.execute([{ set: { status: newStatus } }]);
					publish.execute();
				}
			}
			console.log('completed ad status refresh');
			props.onComplete();
		}
	};
}
