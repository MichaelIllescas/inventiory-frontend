import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, getSession } from "../features/auth/api/authService";
import { LoadingInventiory } from "../components/LoadingInventiory";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userData = await getSession();
        setUser(userData);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // 🔹 Nueva función para hacer login y actualizar el usuario en el contexto
  const loginUser = async (email, password) => {
    const userData = await login(email, password);
    setUser(userData); // 🔹 Guarda la sesión en el contexto
    return userData;
  };

  if (loading || !animationFinished) {
    return <LoadingInventiory onFinish={() => setAnimationFinished(true)} />;
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
