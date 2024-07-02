const TOKEN_KEY = 'jwt-token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const EXPIRES_KEY = 'jwt-expires';
const USERID_KEY = 'user-local-id'

export const setToken = ({refreshToken, accessToken, userId, expiresIn = '3600'}) => {

    const expiresData = new Date().getTime() + expiresIn * 1000;

    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresData.toString());
    localStorage.setItem(USERID_KEY, userId);
}
const getAccessToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}
const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
}
const getGetTokenExpiresDate = () => {
    return localStorage.getItem(EXPIRES_KEY);
}
const getUserId = () => {
    return localStorage.getItem(USERID_KEY);
}
const removeAuthData = () => {
    localStorage.removeItem(USERID_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_KEY);
}


const localStorageService = {
    getAccessToken,
    getRefreshToken,
    getUserId,
    removeAuthData,
    getGetTokenExpiresDate, setToken
}
export default localStorageService