import { removeStorageItem, setStorageItem } from "./storage";

const authorizationEndpoint: string = "https://accounts.spotify.com/authorize";
const scope: string = 'user-read-private user-read-email';

const generateRandomString = () => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = crypto.getRandomValues(new Uint8Array(64));

    return randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const generateHashedCode = async (codeVerifier: string) => {
    const data = new TextEncoder().encode(codeVerifier);

    return await crypto.subtle.digest('SHA-256', data);
}

const generateCodeChallenge = async (hashedCode: ArrayBuffer) => {
    // @ts-expect-error
    return btoa(String.fromCharCode(...new Uint8Array(hashedCode)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

export const redirectToSpotifyAuth = async () => {
    const codeVerifier = generateRandomString();
    const hashedCode = await generateHashedCode(codeVerifier);
    const codeChallenge = await generateCodeChallenge(hashedCode);

    setStorageItem('code_verifier', codeVerifier);

    const authUrl = new URL(authorizationEndpoint);
    const params = {
        response_type: 'code',
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID ?? '',
        scope: scope,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL ?? '',
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
}

export const removeUserDataFromStorage = () => {
    removeStorageItem("access_token")
    removeStorageItem("refresh_token")
    removeStorageItem("expires_in")
    removeStorageItem("expires")
    removeStorageItem("code_verifier")
}