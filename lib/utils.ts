import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {validate as uuidValidate, version as uuidVersion} from 'uuid';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function uuidValidateV4(uuid: string) {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

export const extractUserId = (str: string): string | null => {
    const match = str.match(/(\w{10})wfO-\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/);
    if (match && match.length > 1) {
        return match[1];
    }
    return null;
};
export const extractUserIdAndUUID = (str: string): { userId: string | null, uuid: string | null } => {
    const userIdStartIndex = str.indexOf('0c6b5ca98-ca9') + '0c6b5ca98-ca9'.length;
    const userIdEndIndex = str.indexOf('wfO-0');
    const userId = userIdStartIndex !== -1 && userIdEndIndex !== -1 ? str.substring(userIdStartIndex, userIdEndIndex) : null;
    const uuidStartIndex = str.indexOf('wfO-0') + 'wfO-0'.length;
    const uuid = uuidStartIndex !== -1 ? str.substring(uuidStartIndex) : null;
    return {userId, uuid};
};
