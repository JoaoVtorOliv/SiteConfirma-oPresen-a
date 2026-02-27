import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Guest = {
  name: string;
  confirmed: boolean;
};

export function exportGuestsToPDF(guests: Guest[]) {
  const doc = new jsPDF();

  doc.text("Lista de Convidados", 14, 15);

  autoTable(doc, {
    startY: 20,
    head: [["Nome", "Status"]],
    body: guests.map(g => [
      g.name,
      g.confirmed ? "Confirmado" : "Não confirmado",
    ]),
  });

  doc.save("convidados.pdf");
}
