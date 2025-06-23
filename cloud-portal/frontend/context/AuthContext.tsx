// frontend/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User, getIdTokenResult } from 'firebase/auth';
import { auth } from '../firebase';

type Role = 'admin' | 'user' | null;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: Role;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  role: null,
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
          // 🔁 Refresh user info to ensure displayName/photoURL are updated
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

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, role, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ This is the hook you should use in other components
export const useAuth = () => useContext(AuthContext);
