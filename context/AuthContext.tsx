"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getClientAuth } from "../lib/firebaseAuth";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

type AuthContextValue = {
  user: User | null | undefined;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getClientAuth(), setUser);
    return () => unsubscribe();
  }, []);

  const handleSignOut = useCallback(() => signOut(getClientAuth()), []);
  const value = useMemo(() => ({ user, signOut: handleSignOut }), [user, handleSignOut]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
