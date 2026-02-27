import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) return <div>Carregando...</div>;

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
