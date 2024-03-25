import crypto from "crypto";

export type EncryptedObject = {
    iv: string;
    data: string;
}

const ENCRYPTION_KEY = "AgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgk9GzTIM6YKQGfsBl\\n";
const IV_LENGTH = 64;

export function encryptData(data: any, algorithm: string = "aes-128-cbc"): EncryptedObject {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipher(algorithm, ENCRYPTION_KEY);
    const encryptedData = cipher.update(JSON.stringify(data), "utf8", "hex") + cipher.final("hex");
    return {iv: iv.toString("hex"), data: encryptedData};
}

export function decryptData(encryptedData: EncryptedObject, algorithm: string = "aes-128-cbc"): any {
    const decipher = crypto.createDecipher(algorithm, ENCRYPTION_KEY);
    const decryptedData = decipher.update(encryptedData.data, "hex", "utf8") + decipher.final("utf8");
    return JSON.parse(decryptedData);
}
