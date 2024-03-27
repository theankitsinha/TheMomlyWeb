import {withAuth} from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: '/login',
        signOut: '/logout',
        error: '/login',

    },
});
export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|assets|_next/static|_next/image|.*\\.png$).*)'],
};