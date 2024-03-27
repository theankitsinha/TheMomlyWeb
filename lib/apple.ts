import {SignJWT} from 'jose';
import {createPrivateKey} from 'crypto';


export default async function generateAppleClientSecret() {
//#ONLY TO GENERATE A APPLE SECRET - PREVIOUS SECRET VALID TILL 2025-09-01
// APPLE_TEAM_ID="63NZ5N63RA"
// APPLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
// MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgbasAQykFudcj9O2n
// rRbdjAszBtI10QrMhiiZ5hZ/5zWgCgYIKoZIzj0DAQehRANCAASyaiiDf4eySkQu
// 7ANsS3R8lAAmq/VLbZAWqZGdecLWVKv/7tPf3w6EpKvJKK5cInGkaYNfskTCasi2
// WtjkADHD
// -----END PRIVATE KEY-----"
// APPLE_KEY_ID="998W9HF6TA"
    const iss = process.env.APPLE_TEAM_ID!;

    const private_key = process.env.APPLE_PRIVATE_KEY!;

    const sub = process.env.APPLE_CLIENT_ID!;

    const kid = process.env.APPLE_KEY_ID!;

    const expires_in = 86400 * 2 * 180;
    const exp = Math.ceil(Date.now() / 1000) + expires_in;

    /**
     * How long is the secret valid in seconds.
     * @default 15780000
     */
    const expiresAt = Math.ceil(Date.now() / 1000) + expires_in;
    const expirationTime = exp ?? expiresAt;

    const secret = await new SignJWT({})
        .setAudience('https://appleid.apple.com')
        .setIssuer(iss)
        .setIssuedAt()
        .setExpirationTime(expirationTime)
        .setSubject(sub)
        .setProtectedHeader({alg: 'ES256', kid})
        .sign(createPrivateKey(private_key.replace(/\\n/g, '\n')));
    return {secret: secret, expiry: new Date(expirationTime * 1000)}
}

