// frontend/context/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signOut,
  User,
  getIdTokenResult,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth } from '../firebase';

type Role = 'admin' | 'user' | null;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: Role;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  role: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          await firebaseUser.reload();
          const refreshedUser = auth.currentUser;

          if (refreshedUser) {
            const tokenResult = await getIdTokenResult(refreshedUser, true);
            const roleClaim = tokenResult.claims.role as Role;

            setUser(refreshedUser);
            setRole(roleClaim ?? null);
          } else {
            setUser(null);
            setRole(null);
          }
        } catch (error) {
          console.error("Error refreshing user:", error);
          setUser(firebaseUser); // fallback
        }
      } else {
        setUser(null);
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Login failed:", error.message);
      throw error; // Pass the error up to the UI for messages
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
