// UserContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type IUser, getToken, removeToken } from '../services/tokenService';
import http_api from '../services/http_api';

interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  signOut: () => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const fetchUser = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await http_api.get<IUser>('/api/Users/me');
      setUser(res.data);
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (err) {
      console.error('Failed to fetch user:', err);
      signOut(); // якщо бек не прийняв токен, виходимо
    }
  };

  useEffect(() => {
    if (getToken()) {
      fetchUser(); // підтягнути дані користувача після завантаження
    }
  }, []);

  const signOut = () => {
    setUser(null);
    removeToken();
  };

  return (
    <UserContext.Provider value={{ user, setUser, signOut, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
