const LOCAL_STORAGE_ACCESS_TOKEN = 'access_token';

export const setAccessTokenToLocalStorage =
  (accessToken) => {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, accessToken);
  };

export const getAccessTokenFromLocalStorage =
  () => {
    return localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
  };
