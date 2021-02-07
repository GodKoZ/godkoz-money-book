import axios from 'axios';

export function useAuthenticator() {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const AuthAPI = axios.create({
    baseURL: BASE_URL + '/api/v1/auth',
    withCredentials: true,
  });

  async function LogIn(provider: 'facebook' | 'google' | 'line') {
    return (window.location.href = `${BASE_URL}/api/v1/auth/${provider}`);
  }

  async function LogOut() {
    try {
      await AuthAPI.get('/logout');
    } catch (e) {
      console.log(e);
    }
  }

  return {
    LogIn,
    LogOut,
  };
}

export default useAuthenticator;
