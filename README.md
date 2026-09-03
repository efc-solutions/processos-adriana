# Painel de Processos — Adriana

Site estático (GitHub Pages) que mostra os processos jurídicos direto da planilha do Google Sheets. Sempre que a planilha for atualizada, o painel reflete a mudança na próxima vez que a página for aberta (ou no botão "Atualizar dados").

## Como colocar no ar

### 1. Levar a base pro Google Sheets da Adriana
- Abra o arquivo `Processos Jurídicos - Adriana.xlsx` no Google Drive (ele já converte pra Google Sheets), ou importe a aba **📋 Base Consolidada** para dentro da planilha que ela já usa.
- Mantenha o nome da aba **exatamente** `📋 Base Consolidada` — o Apps Script procura por esse nome.

### 2. Conectar o Apps Script
1. Na planilha: **Extensões → Apps Script**
2. Apague o conteúdo padrão e cole o arquivo `Code.gs`
3. **Implantar → Nova implantação**
   - Tipo: **App da Web**
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
4. Copie a URL gerada (termina em `/exec`)
5. (Opcional) rode a função `testar()` no editor pra conferir se está lendo os dados certos antes de implantar

### 3. Configurar o HTML
No arquivo `index.html`, procure a linha:
```js
const SCRIPT_URL = "COLE_AQUI_A_URL_DO_APPS_SCRIPT";
```
e troque pela URL copiada no passo anterior.

### 4. Subir pro GitHub Pages
```bash
git add index.html Code.gs README.md
git commit -m "Painel de processos da Adriana"
git push
```
Depois, em **Settings → Pages**, confirme que está publicando da branch `main` / pasta raiz (ou `/docs`, dependendo de como você organiza seus outros projetos).

## Ícone no celular (adicionar à tela inicial)
O projeto já vem com `manifest.webmanifest` e os ícones na pasta `icons/`. Depois de publicado no GitHub Pages, é só a Adriana abrir o link no celular e usar **"Adicionar à Tela de Início"** (Safari) ou **"Instalar app"** (Chrome Android) — o ícone da balança aparece na tela como se fosse um app, sem barra de navegador.

Só funciona certo se todos os arquivos forem publicados juntos, mantendo essa estrutura de pastas:
```
painel-adriana/
├── index.html
├── Code.gs
├── manifest.webmanifest
├── favicon.ico
└── icons/
    ├── icon-192.png
    ├── icon-512.png
    ├── icon-maskable-512.png
    ├── apple-touch-icon.png
    ├── favicon-32.png
    └── favicon-16.png
```

## Sempre que a base mudar
- A Adriana só precisa editar a planilha (mudar Status, preencher Resultado Final etc.) — o painel já lê direto de lá, não precisa mexer no código.
- Se mudar o nome de alguma aba ou coluna na planilha, é preciso ajustar o `Code.gs` e reimplantar (Implantar → Gerenciar implantações → editar → nova versão).
