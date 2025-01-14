import { api } from "@/lib/utils";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  id: number;
  username: string;
}

interface AuthContextActions {
  signOut: () => void;
  refresh: () => void;
}

type AuthType = [AuthContextType | undefined | null, AuthContextActions];

const defaultContext: AuthType = [
  undefined,
  { signOut: () => undefined, refresh: () => undefined },
];

const AuthContext = createContext<AuthType>(defaultContext);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthType>(defaultContext);

  function signOut() {
    setAuth([null, { signOut, refresh: check }]);
    localStorage.removeItem("token");
  }

  function check() {
    api
      .get("/api/Auth/verify")
      .then((res) => {
        setAuth([res.data, { signOut, refresh: check }]);
      })
      .catch(() => setAuth([null, { signOut, refresh: check }]));
  }

  useEffect(check, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
