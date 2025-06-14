'use server';

import { revalidatePath } from 'next/cache';
import { createKioskTicket } from '../../../../../helpers/httpMethods';
import { form } from 'sanity/structure';

type CreateNewIssueFormState = {
	status: 'unset' | 'error' | 'success';
	errorMessage?: string;
};

export async function createNewIssueFormAction(_formState: CreateNewIssueFormState, formData: FormData): Promise<CreateNewIssueFormState> {
	const ticket = {
		kioskId: formData.get('kioskId') as string,
		openedBy: formData.get('openedBy') as string,
		description: formData.get('description') as string,
		title: formData.get('title') as string
	};

	try {
		await createKioskTicket(ticket);
	} catch (error) {
		console.error('Failed to create ticket', error);
		return {
			status: 'error',
			errorMessage: 'Failed to create ticket'
		};
	}

        // revalidate the /dashboard/issues/{kioskId} page for the kiosk
        revalidatePath(`/dashboard/issues/${ticket.kioskId}`);

	return {
		status: 'success'
	};
}
