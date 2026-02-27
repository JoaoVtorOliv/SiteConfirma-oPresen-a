// src/utils/nomeUtils.ts

export function validarNome(nome: string) {
  const nomeLimpo = nome.trim().replace(/\s+/g, " ");

  if (!nomeLimpo) {
    return { valido: false, mensagem: "Informe seu nome." };
  }

  if (nomeLimpo.split(" ").length < 2) {
    return { valido: false, mensagem: "Informe nome e sobrenome." };
  }

  const regex = /^[A-Za-zÀ-ÿ\s]+$/;
  if (!regex.test(nomeLimpo)) {
    return { valido: false, mensagem: "Use apenas letras no nome." };
  }

  return { valido: true, nomeNormalizado: nomeLimpo };
}

export function normalizarNome(nome: string) {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .trim();
}
