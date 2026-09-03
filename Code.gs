/**
 * Apps Script backend — Painel de Processos (Adriana)
 * Lê a aba "📋 Base Consolidada" da planilha e devolve os dados em JSON
 * para o painel HTML hospedado no GitHub Pages.
 *
 * Como implantar:
 * 1. Na planilha do Google Sheets: Extensões > Apps Script
 * 2. Apague o conteúdo padrão e cole este arquivo inteiro
 * 3. Implantar > Nova implantação > tipo "App da Web"
 *    - Executar como: Eu
 *    - Quem pode acessar: Qualquer pessoa
 * 4. Copie a URL gerada e cole na constante SCRIPT_URL do index.html
 */

const ABA_BASE = "📋 Base Consolidada";
const PRIMEIRA_LINHA_DADOS = 5; // linha 4 é o cabeçalho

function doGet(e) {
  const action = (e.parameter && e.parameter.action) || "processos";
  if (action === "processos") return responder(listarProcessos());
  return responder({ status: "erro", mensagem: "ação desconhecida" });
}

function listarProcessos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const aba = ss.getSheetByName(ABA_BASE);
  if (!aba || aba.getLastRow() < PRIMEIRA_LINHA_DADOS) return [];

  const numLinhas = aba.getLastRow() - PRIMEIRA_LINHA_DADOS + 1;
  const valores = aba.getRange(PRIMEIRA_LINHA_DADOS, 1, numLinhas, 15).getValues();

  const processos = [];
  valores.forEach(function (linha) {
    const processo = linha[0];
    if (!processo) return; // ignora linhas em branco (modelo para novos processos)

    processos.push({
      p: String(processo).trim(),
      inst: linha[1] || "",
      acao: linha[2] || "",
      contrario: linha[3] || "",
      responsavel: linha[4] || "",
      valor: numeroOuNulo(linha[5]),
      prov: numeroOuNulo(linha[6]),
      faixa: linha[7] || "",
      tipo: linha[8] || "",
      status: linha[9] || "",
      resultado: linha[10] || "",
      situacao: linha[11] || "Em Andamento", // coluna L, já calculada pela fórmula da planilha
      atualizado: formatarData(linha[13]),
      obs: linha[14] || ""
    });
  });

  return processos;
}

function numeroOuNulo(v) {
  if (v === "" || v === null || v === undefined) return null;
  const n = Number(v);
  return isNaN(n) ? null : n;
}

function formatarData(val) {
  if (!val) return "";
  if (val instanceof Date) {
    const d = String(val.getDate()).padStart(2, "0");
    const m = String(val.getMonth() + 1).padStart(2, "0");
    return d + "/" + m + "/" + val.getFullYear();
  }
  return String(val).trim();
}

function responder(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Rode esta função manualmente no editor pra testar antes de implantar */
function testar() {
  Logger.log(JSON.stringify(listarProcessos().slice(0, 3), null, 2));
}
