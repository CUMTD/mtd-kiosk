/** @type {import('next').NextConfig} */
const nextConfig = {
	// allow sanity hostname
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io'
			}
		]
	}
};

export default nextConfig;
