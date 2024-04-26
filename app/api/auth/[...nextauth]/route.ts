import type { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import throwError from '../../../../helpers/throwError';

const authOptions: AuthOptions = {
	// Configure one or more authentication providers
	providers: [
		AzureADProvider({
			clientId: process.env.AZURE_AD_CLIENT_ID ?? throwError('missing env var AZURE_AD_CLIENT_ID'),
			clientSecret: process.env.AZURE_AD_CLIENT_SECRET ?? throwError('missing env var AZURE_AD_CLIENT_SECRET'),
			tenantId: process.env.AZURE_AD_TENANT_ID ?? throwError('missing env var AZURE_AD_TENANT_ID'),
			authorization: { params: { scope: 'openid profile email offline_access User.Read' } }
		})
	],
	secret: process.env.NEXTAUTH_SECRET ?? throwError('missing env var NEXTAUTH_SECRET')
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
