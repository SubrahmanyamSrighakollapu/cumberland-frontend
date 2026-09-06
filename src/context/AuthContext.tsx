"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: AdminUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "cumberland_admin_token";
const USER_KEY = "cumberland_admin_user";

type StoredInit = {
  token: string | null;
  user: AdminUser | null;
  loaded: boolean;
};

function readInitial(): StoredInit {
  if (typeof window === "undefined") {
    return { token: null, user: null, loaded: false };
  }
  try {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);
    return {
      token: storedToken,
      user: storedUser ? JSON.parse(storedUser) : null,
      loaded: true,
    };
  } catch {
    return { token: null, user: null, loaded: true };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const initial = readInitial();
  const [token, setToken] = useState<string | null>(initial.token);
  const [user, setUser] = useState<AdminUser | null>(initial.user);
  const [isLoading, setIsLoading] = useState(!initial.loaded);

  React.useEffect(() => {
    if (!initial.loaded) {
      const data = readInitial();
      if (data.token) setToken(data.token);
      if (data.user) setUser(data.user);
      setIsLoading(false);
    }
  }, [initial.loaded]);

  const login = (newToken: string, newUser: AdminUser) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    }
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
