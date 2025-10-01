// src/auth.ts
import { jwtDecode } from 'jwt-decode';
import http_api from './http_api';

export interface IUser {
  userId: string | number;
  email: string;
  firstName: string;
  lastName: string;
  phone:string;
  photoUrl: string;
}

// --- Збереження токена і користувача ---
export const storeToken = (token: string) => {
  console.log('Storing token');
localStorage.setItem('token', `Bearer ${token}`);
  http_api.defaults.headers['Authorization'] = getToken();

  const user: IUser = getUserFromToken(token);
  saveUser(user);
};

export const loadTokenFromStorage = (): IUser | null => {
  const token = getToken();
  if (!token) return null;

  http_api.defaults.headers['Authorization'] = `Bearer ${token}`;
  const user: IUser = getUserFromToken(token);
  saveUser(user);
  return user;
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  delete http_api.defaults.headers['Authorization'];
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// --- Робота з користувачем ---
export const saveUser = (user: IUser) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = (): IUser | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const getUserFromToken = (token: string): IUser => {
  const rawToken = token.startsWith('Bearer ') ? token.slice(7) : token;
  return jwtDecode(rawToken);
};

// --- Перевірка авторизації ---
export const isSignedIn = (): boolean => !!getToken();