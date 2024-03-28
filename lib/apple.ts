import {SignJWT} from "jose";
import {createPrivateKey} from "crypto";

interface generateSecretArgs {
    teamId: string;
    privateKey: string;
    clientId: string;
    keyId: string;
    expiresIn?: number;
}

let secret: string | null;

export async function generateAppleClientSecret({
                                                    teamId,
                                                    privateKey,
                                                    clientId,
                                                    keyId,
                                                    expiresIn = 20 * 180,
                                                }: generateSecretArgs) {
    if (secret == null) {
        const exp = Math.ceil(Date.now() / 1000) + expiresIn;
        const expiresAt = Math.ceil(Date.now() / 1000) + expiresIn;
        const expirationTime = exp ?? expiresAt;
        secret = await new SignJWT({})
            .setAudience('https://appleid.apple.com')
            .setIssuer(teamId)
            .setIssuedAt(new Date())
            .setExpirationTime(expirationTime)
            .setSubject(clientId)
            .setProtectedHeader({alg: 'ES256', kid: keyId, typ: 'JWT'})
            .sign(createPrivateKey(privateKey.replace(/\\n/g, '\n')));
    }
    return secret;
}