const adminUrl = process.env.MOMLYADMIN_URL;

export function adminApi(path: string): string {
    return adminUrl + '/api/v1/' + path;
}

export function generateFetchOptions(method: string, requestBody?: object | null, token?: string,) {
    const apikey = process.env.MOMLYADMIN_API_KEY;
    if (apikey === undefined) {
        throw new Error(JSON.stringify({
            errors: 'Momly Admin API KEY Not initialised',
            status: false
        }))
    }
    const headers = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-api-key': apikey,
    })
    if (token) {
        headers.append("Authorization", 'Bearer ' + token);
    }
    const options = {
        method: method,
        headers,

    };
    if (requestBody) {
        //@ts-ignore
        options.body = JSON.stringify(requestBody)
    }
    return options;
}

export async function login(email: string, password: string, deviceId: string, tokenUserId: string | null, loginMethod: string) {
    return await fetch(adminApi('web-login'), generateFetchOptions('POST', {
        email: email,
        device_id: deviceId,
        login_method: loginMethod,
        user_id: tokenUserId ?? null,
        password: password
    }, 'login'));
}
