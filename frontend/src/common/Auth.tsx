import { jwtDecode } from "jwt-decode"
import { string } from "zod";
interface DecodedToken {
    role: 'user' | 'admin';
    exp: number;
    iat: number;
}
export const getToken = () => {
    return localStorage.getItem('token')
}

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken')
}

export const getUserName = () => {
    return localStorage.getItem('userName')
}

export const getUserRole = () => {
    const token = getToken()
    if (!token) return null;
    try {
        const decode = jwtDecode<DecodedToken>(token);
        return decode.role;
    } catch {
        return null;
    }
}

export const isAuthenticated = () => {
    const token = getToken();
    return !!token;
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    console.log(decoded.exp * 1000,'Access token Exp')
    console.log(Date.now(),'Current Date')
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const logout = () => {
    localStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
};