import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("hussio_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    await new Promise((r) => setTimeout(r, 800));

    const mockUser = {
      id: "user_" + Date.now(),
      name: email.split("@")[0],
      email,
      avatar: null,
    };

    localStorage.setItem("hussio_user", JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const register = async (name, email, password) => {
    await new Promise((r) => setTimeout(r, 800));

    const mockUser = {
      id: "user_" + Date.now(),
      name,
      email,
      avatar: null,
    };

    localStorage.setItem("hussio_user", JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const logout = () => {
    localStorage.removeItem("hussio_user");
    setUser(null);
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    localStorage.setItem("hussio_user", JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
