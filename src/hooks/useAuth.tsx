import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut as fbSignOut, User } from "firebase/auth";
import { auth } from "@/services/firebase";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ⚠️ coloque o email real do admin
  const ADMIN_EMAIL = "karolayne.isadoramartins@hotmail.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isAdmin = user?.email === ADMIN_EMAIL;

  const signOut = async () => {
    await fbSignOut(auth);
  };

  return {
    user,
    isAdmin,
    isLoading,
    signOut,
  };
};
