import { withAuth } from 'next-auth/middleware';
import type { NextRequest } from 'next/server';

function middleware(_req: NextRequest) {}

export default withAuth(middleware, {
	pages: {
		signIn: '/api/auth/signin'
	},
	callbacks: {
		authorized: ({
			req: {
				nextUrl: { pathname }
			},
			token
		}) => {
			// Allow access to public pages without authentication
			if (
				pathname.startsWith('/api/auth/') ||
				pathname.startsWith('/kiosks/') ||
				pathname === '/studio' ||
				pathname.startsWith('/studio/') ||
				pathname.match(/\.(svg|png|jpg|jpeg|webp)$/)
			) {
				// true === authorized
				return true;
			}

			// For all other paths, require the user to be authenticated
			const isAuthorized = !!token;
			if (!isAuthorized) {
				console.log('Access denied. Redirecting to sign-in page for path: ', pathname);
			}

			return isAuthorized;
		}
	}
});

export const config = {
	matcher: '/dashboard/:path*' // just dashboard for auth
};
