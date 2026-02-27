import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Admin() {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate("/admin-login", { replace: true });
    }
  }, [user, isAdmin, isLoading, navigate]);

  if (isLoading) return <p>Carregando...</p>;

  if (!user || !isAdmin) return null;

  return (
    <div>
      <h1>Painel Administrativo</h1>
      {/* conteúdo do admin */}
    </div>
  );
}
