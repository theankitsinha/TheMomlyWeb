import CredentialsProvider from "next-auth/providers/credentials";
import {login} from "@/lib/admin";
import {DashboardResponseType, LoginPostResponseType} from "@/types/admin-api";
import {v4 as uuidv4} from 'uuid';
import {extractUserIdAndUUID, uuidValidateV4} from "@/lib/utils";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import {AuthOptions} from "next-auth";


export const nextAuthOptions: AuthOptions = {
    session: {
        maxAge: 6 * 60 * 60 // 4 hours
    },
    pages: {
        signIn: '/login',
        signOut: '/logout',
        error: '/login',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        AppleProvider({
            clientId: process.env.APPLE_CLIENT_ID!,
            clientSecret: process.env.APPLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    response_type: 'code id_token',
                    response_mode: 'form_post',
                    scope: 'name email',
                    client_id: process.env.APPLE_CLIENT_ID,
                },
            },

        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                token: {
                    label: "token:",
                    type: "text",
                },
                email: {
                    label: "email:",
                    type: "text",
                },
                password: {
                    label: "password:",
                    type: "password",
                },
            },
            //@ts-ignore
            async authorize(credentials) {
                if (!credentials || !credentials.email || credentials.email.toString().trim() == '') {
                    throw new Error(JSON.stringify({
                        errors: 'Email are not valid',
                        status: false
                    }));
                }
                if ((!credentials.token || credentials.token.toString().trim() === '') && (!credentials.password || credentials.password.toString().trim() === '')) {
                    throw new Error(JSON.stringify({
                        errors: 'Password are not valid',
                        status: false
                    }));
                }
                const deviceId = uuidv4();
                let tokenUserId = null;
                if (credentials.token) {
                    const {userId, uuid} = extractUserIdAndUUID(credentials.token);
                    if (uuidValidateV4(uuid ?? '')) {
                        tokenUserId = userId;
                    }
                }
                const response = await login(
                    credentials.email,
                    credentials.password,
                    deviceId,
                    tokenUserId,
                    tokenUserId ? "qrcode" : "password");
                if (response.ok) {
                    const res: LoginPostResponseType = await response.json();
                    if (!res.status) {
                        throw new Error(JSON.stringify({
                            errors: res.message,
                            status: false
                        }));
                    }

                    if (res.data.roles.some(role => role.title != 'User')) {
                        throw new Error(JSON.stringify({
                            errors: "User not activated",
                            status: false
                        }));
                    }
                    return res.data;
                } else {
                    const errorMessage = await response.json()
                    console.log("Auth error!", errorMessage)
                    throw new Error(JSON.stringify({
                        errors: errorMessage.message ?? 'Invalid credentials',
                        status: false
                    }));
                }
            },
        }),
    ],
    // cookies: {
    //     pkceCodeVerifier: {
    //         name: 'next-auth.pkce.code_verifier',
    //         options: {
    //             httpOnly: true,
    //             sameSite: 'none',
    //             path: '/',
    //             secure: true,
    //         },
    //     },
    //     callbackUrl: {
    //         name: '__Secure-next-auth.callback-url',
    //         options: {
    //             httpOnly: false,
    //             sameSite: 'none',
    //             path: '/',
    //             secure: true,
    //         },
    //     },
    // },
    callbacks: {
        // async signIn({account, profile, user, email}: { account?: any, profile?: any, user?: any, email?: any }) {
        //     console.info("Custom - Account: " + JSON.stringify(account));
        //     console.info("Custom - Profile: " + JSON.stringify(profile));
        //     console.info("Custom - User: " + JSON.stringify(user));
        //     console.info("Custom - Email: " + JSON.stringify(email));
        //
        //     // if (account.provider === "google") {
        //     //     return profile.email_verified && profile.email.endsWith("@example.com")
        //     // }
        //     return true // Do different verification for other providers that don't have `email_verified`
        // },
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