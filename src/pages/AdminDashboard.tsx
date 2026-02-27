import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";

import { auth, db } from "../services/firebase";
import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

import {
  Loader2,
  LogOut,
  Search,
  Users,
  UserCheck,
  UserX,
  Calendar,
  Percent,
  FileText, // 🔧 AJUSTE (ícone PDF)
} from "lucide-react";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { exportGuestsToPDF } from "@/lib/exportGuests";

/* 🔧 AJUSTE: tipagem alinhada com Firestore */
interface Convidado {
  id: string;
  nome: string;
  confirmou: boolean;
  acompanhantes?: number;
  createdAt: Timestamp;
}

const AdminDashboard = () => {
  const [convidados, setConvidados] = useState<Convidado[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingData, setLoadingData] = useState(true);

  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  /* 🔒 Proteção de rota */
  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, isAdmin, isLoading, navigate]);

  /* 🔥 Buscar convidados no Firestore */
  useEffect(() => {
    if (user && isAdmin) {
      fetchConvidados();
    }
  }, [user, isAdmin]);

  const fetchConvidados = async () => {
    setLoadingData(true);

    try {
      const q = query(
        collection(db, "convidados"), // 🔧 CONFIRME se é exatamente esse nome
        orderBy("createdAt", "desc"),
      );

      const snapshot = await getDocs(q);

      const data: Convidado[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Convidado, "id">),
      }));

      setConvidados(data);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar os convidados.",
      });
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  /* 📊 Métricas */
  const totalGuests = convidados.length;
  const totalConfirmed = convidados.filter((c) => c.confirmou).length;
  const totalDeclined = convidados.filter((c) => !c.confirmou).length;
  const percent =
    totalGuests > 0 ? Math.round((totalConfirmed / totalGuests) * 100) : 0;

  const filtered = convidados.filter((c) =>
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  /* 📄 Exportar PDF */
  const handleExportPDF = () => {
    exportGuestsToPDF(
      convidados.map((c) => ({
        name: c.nome,
        confirmed: c.confirmou,
      })),
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
            <p className="text-sm text-muted-foreground">
              Gerenciamento de Convidados
            </p>
          </div>

          <div className="flex gap-2">
            {/* 📄 PDF */}
            <Button variant="outline" onClick={handleExportPDF}>
              <FileText className="mr-2 h-4 w-4" />
              Exportar PDF
            </Button>

            {/* 🚪 Logout */}
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle className="text-sm">Total</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              {totalGuests}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle className="text-sm">Confirmados</CardTitle>
              <UserCheck className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent className="text-3xl font-bold text-primary">
              {totalConfirmed}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle className="text-sm">Não Confirmados</CardTitle>
              <UserX className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent className="text-3xl font-bold text-destructive">
              {totalDeclined}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle className="text-sm">Presença</CardTitle>
              <Percent className="h-4 w-4" />
            </CardHeader>
            <CardContent className="text-3xl font-bold">{percent}%</CardContent>
          </Card>
        </div>

        {/* Busca */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
          <Input
            placeholder="Buscar convidado..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 max-w-md"
          />
        </div>

        {loadingData ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell>{guest.nome}</TableCell>
                    <TableCell>
                      {guest.confirmou ? (
                        <Badge className="bg-primary">Confirmado</Badge>
                      ) : (
                        <Badge variant="destructive">Não Confirmado</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {format(
                          guest.createdAt.toDate(),
                          "dd 'de' MMMM 'às' HH:mm",
                          { locale: ptBR },
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
