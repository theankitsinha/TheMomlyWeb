#!/bin/node

import {SignJWT} from 'jose';
import {createPrivateKey} from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const args = process.argv.slice(2).reduce((acc, arg, i) => {
    if (arg.match(/^--\w/)) {
        const key = arg.replace(/^--/, '').toLowerCase();
        acc[key] = process.argv[i + 3];
    }
    return acc;
}, {});

// APPLE_CLIENT_ID=com.momly.auth
// APPLE_TEAM_ID="63NZ5N63RA"
// APPLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgbasAQykFudcj9O2n\nrRbdjAszBtI10QrMhiiZ5hZ/5zWgCgYIKoZIzj0DAQehRANCAASyaiiDf4eySkQu\n7ANsS3R8lAAmq/VLbZAWqZGdecLWVKv/7tPf3w6EpKvJKK5cInGkaYNfskTCasi2\nWtjkADHD\n-----END PRIVATE KEY-----"
// APPLE_KEY_ID="998W9HF6TA"

// Valid until: Sat Mar 22 2025 13:49:05 GMT+0530 (India Standard Time)

const {
    team_id = process.env.APPLE_TEAM_ID,
    private_key = process.env.APPLE_PRIVATE_KEY,

    client_id = process.env.APPLE_CLIENT_ID,

    key_id = process.env.APPLE_KEY_ID,
    // expires_in = 200 * 180,
    expires_in = 86400 * 2 * 180,
    exp = Math.ceil(Date.now() / 1000) + expires_in
} = args;

/**
 * How long is the secret valid in seconds.
 * @default 15780000
 */
const expiresAt = Math.ceil(Date.now() / 1000) + expires_in;
const expirationTime = exp ?? expiresAt;

const secret = await new SignJWT({})
    .setAudience('https://appleid.apple.com')
    .setIssuer(team_id)
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .setSubject(client_id)
    .setProtectedHeader({alg: 'ES256', key_id, typ: 'JWT'})
    .sign(createPrivateKey(private_key.replace(/\\n/g, '\n')));
console.log(`
Apple client secret generated. Valid until: ${new Date(expirationTime * 1000)}
${secret}`);