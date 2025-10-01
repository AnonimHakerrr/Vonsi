// UserContext.tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type IUser, getToken, removeToken } from "../services/tokenService";
import http_api from "../services/http_api";

interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  signOut: () => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const signOut = useCallback(() => {
    setUser(null);
    removeToken();
  }, [setUser]);

  const fetchUser = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await http_api.get<IUser>("/api/Users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Failed to fetch user:", err);
      signOut(); // тепер стабільна функція
    }
  }, [signOut, setUser]);

  useEffect(() => {
    if (getToken()) {
      fetchUser(); // підтягнути дані користувача після завантаження
    }
  }, [fetchUser]);

  return (
    <UserContext.Provider
      value={{ user, setUser, signOut, refreshUser: fetchUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
