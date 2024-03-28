import CredentialsProvider from "next-auth/providers/credentials";
import {login} from "@/lib/admin";
import {LoginPostResponseType, UserDetailsResponse} from "@/types/admin-api";
import {v4 as uuidv4} from 'uuid';
import {extractUserIdAndUUID, uuidValidateV4} from "@/lib/utils";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import {Account, AuthOptions, Profile, User} from "next-auth";
import {generateAppleClientSecret} from "@/lib/apple";

type handleAdminLoginProps = {
    email: string,
    password: string,
    tokenUserId: string | null,
    loginMethod: string,
    name: string | null,
}

async function handleAdminLoginResponse({email, password, tokenUserId, loginMethod, name}: handleAdminLoginProps) {
    const deviceId = uuidv4();
    const response = await login(
        email,
        password,
        deviceId,
        name,
        tokenUserId,
        loginMethod);
    if (response.ok) {
        const res: LoginPostResponseType = await response.json();
        if (!res.status) {
            throw new Error(JSON.stringify({
                errors: res.message,
                status: false
            }));
        }
        if (!(res.data.roles.some(role => role.title === 'User'))) {
            throw new Error(JSON.stringify({
                errors: "User doesnt have access to this app, Please contact Momly Team",
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
}

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
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
        }),
        AppleProvider({
            clientId: process.env.APPLE_CLIENT_ID!,
            clientSecret: await generateAppleClientSecret({
                clientId: process.env.APPLE_CLIENT_ID!,
                keyId: process.env.APPLE_KEY_ID!,
                teamId: process.env.APPLE_TEAM_ID!,
                privateKey: process.env.APPLE_PRIVATE_KEY!,
            }),
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
                let tokenUserId = null;
                if (credentials.token) {
                    const {userId, uuid} = extractUserIdAndUUID(credentials.token);
                    if (uuidValidateV4(uuid ?? '')) {
                        tokenUserId = userId;
                    }
                }
                return await handleAdminLoginResponse({
                    email: credentials.email,
                    password: credentials.password,
                    name: '',
                    tokenUserId: tokenUserId,
                    loginMethod: tokenUserId ? "qrcode" : "password"
                });
            },
        }),
    ],
    cookies: {
        pkceCodeVerifier: {
            name: 'next-auth.pkce.code_verifier',
            options: {
                httpOnly: true,
                sameSite: 'none',
                path: '/',
                secure: true,
            },
        },
    },
    callbacks: {
        async jwt({
                      token,
                      user,
                      account,
                      profile,
                      trigger,
                      isNewUser,
                  }: {
            token: any,
            user: UserDetailsResponse | User,
            account: Account | null;
            profile?: Profile | undefined;
            trigger?: string | undefined;
            isNewUser?: boolean | undefined;
        }) {
            if (account && profile && (account.provider === "google" || account.provider === 'apple') && account.type === 'oauth') {
                user = await handleAdminLoginResponse({
                    email: profile.email!,
                    password: '',
                    name: profile.name!,
                    tokenUserId: null,
                    loginMethod: account.provider === "google" ? "google.com" : "apple.com"
                });
            }
            if (user) {
                token.user = user
                token.accessToken = user.accessToken
            }
            return token;
        },
        async session({session, token}: {
            session: any;
            token: any;
        }) {
            session.accessToken = token.accessToken
            session.user = token.user
            return session
        },
    },
};