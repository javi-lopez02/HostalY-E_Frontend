import { Outlet } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import Autorizer from "./Autorizer";

export const ProtectedRoutes = () => {
  const { loading, isAuth } = useAuth();

  if (!isAuth && !loading) return <Autorizer />;

  return <Outlet />;
};
