import { permanentRedirect } from 'next/navigation';

export default function UmbracoRedirect() {
	return permanentRedirect('/studio');
}
