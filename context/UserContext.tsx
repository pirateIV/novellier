import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { apiClient, buildAuthHeaderToken } from "@/lib/axios";
import Cookies from "js-cookie";

type User = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  totalReviews: number;
  books: any[];
};

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  loading: true,
});

export const useUserData = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token");
      if(!token) {
        setUser(null)
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const response = await apiClient.get(
          "/auth/me",
          buildAuthHeaderToken(token)
        );
        const user = (await response.data) as User;
        setUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.log("failed to fetch user data", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isAuthenticated, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
