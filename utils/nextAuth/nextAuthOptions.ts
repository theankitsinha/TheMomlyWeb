import CredentialsProvider from "next-auth/providers/credentials";
import {login} from "@/lib/admin";
import {uuidv4} from "@firebase/util";
import {DashboardResponseType, LoginPostResponseType} from "@/types/admin-api";
import {NextAuthOptions} from "next-auth";


export const nextAuthOptions: NextAuthOptions = {
    session: {
        maxAge: 6 * 60 * 60 // 4 hours
    },
    pages: {
        signIn: '/login',
        signOut: '/logout',
        error: '/login',
    },
    providers: [
        // AppleProvider({
        //     clientId: process.env.APPLE_ID ?? 'com.toimoi.momly',
        //     clientSecret: process.env.APPLE_SECRET ?? '',
        // }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email:",
                    type: "text",
                    placeholder: "your-email",
                },
                password: {
                    label: "password:",
                    type: "password",
                    placeholder: "your-password",
                },
            },
            //@ts-ignore
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password || credentials.password.toString().trim() == '' || credentials.email.toString().trim() == '') {
                    throw new Error(JSON.stringify({
                        errors: 'Credentials are not filled',
                        status: false
                    }));
                }
                const deviceId = uuidv4();
                const response = await login(credentials.email, credentials.password, deviceId, "password");
                if (response.ok) {
                    const res: LoginPostResponseType = await response.json();
                    if (!res.status) {
                        throw new Error(JSON.stringify({
                            errors: res.message,
                            status: false
                        }));
                    }
                    return res.data;
                } else {
                    console.log("Auth error!", await response.json())
                    throw new Error(JSON.stringify({
                        errors: 'Invalid credentials',
                        status: false
                    }));
                }
            },
        }),
    ],
    callbacks: {
        async jwt({token, user,}: { token: any, user: DashboardResponseType | any }) {
            if (user) {
                token.user = user
                token.accessToken = user.accessToken
            }
            return token;
        },
        async session({session, token}: { session: any, token: any }) {
            session.accessToken = token.accessToken
            session.user = token.user
            return session
        },
    },
};