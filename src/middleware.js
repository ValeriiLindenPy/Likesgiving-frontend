export { default } from "next-auth/middleware";

export const config = {
    matcher: ['/', '/profile/:path*', '/like/:path*', '/dislike/:path*'],
};