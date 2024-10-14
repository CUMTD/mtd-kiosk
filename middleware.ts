import { withAuth } from 'next-auth/middleware';
import type { NextRequest } from 'next/server';

export default withAuth(
	function middleware(_req: NextRequest) {
		// custom middleware logic
	},
	{
		pages: {
			signIn: '/api/auth/signin'
		}
	}
);

export const config = {
	matcher: ['/((?!api/auth/).*)' /* Match all request paths except for: /api/auth/* */]
};
