## Turborepo + Next.js + Tailwind v4 + shadcn/ui — Template

Template de monorepo com Turborepo para criar apps Next.js usando Tailwind CSS v4 e shadcn/ui em um pacote compartilhado de UI. Pronto para desenvolvimento local, tipos com TypeScript, formatação com Biome e deploy na Vercel.

• Node.js >= 20 • Bun 1.2.x • React 19 • Next.js 15 • Tailwind 4

## Sumário

- O que vem no template
- Requisitos
- Começando
- Scripts úteis
- Estrutura do monorepo
- UI compartilhada (shadcn/ui + Tailwind)
- Adicionando novos componentes shadcn
- Executando somente um app/pacote
- Cache remoto do Turborepo (opcional)
- Deploy na Vercel

## O que vem no template

- apps/web: app Next.js 15 com Turbopack.
- packages/ui: pacote React com Tailwind v4 e componentes shadcn/ui compartilhados.
- config/typescript-config: bases de tsconfig unificadas.
- Turborepo configurado (turbo.json) com pipelines de build/dev/lint/type-check.
- Biome para lint/format.

## Requisitos

- Node.js 20 ou superior (recomendado usar nvm)
- Bun 1.2.x (o repositório usa bun.lock e packageManager "bun@…")

## Começando

Instale as dependências na raiz do monorepo:

```bash
bun install
```

Suba o ambiente de desenvolvimento (todas as apps/pacotes com watch):

```bash
bun run dev
```

Abra http://localhost:3000 para acessar o app "web".

## Scripts úteis (raiz)

- bun run dev: roda turbo dev (watch para todos os pacotes/apps).
- bun run build: build para tudo seguindo dependências.
- bun run lint: lint com Biome em todos os workspaces.
- bun run check-types: checagem de tipos com TypeScript.
- bun run format: formata arquivos com Biome.

No app web (apps/web):

- bun run dev: next dev --turbopack na porta 3000.
- bun run build: next build.
- bun run start: next start.

## Estrutura do monorepo

- apps/web: app Next.js (React 19, Next 15). Importa o CSS global do pacote UI e usa Turbopack no dev.
- packages/ui: biblioteca de componentes compartilhada (Tailwind v4 + shadcn/ui). Exporta CSS global, utils e componentes.
- config/typescript-config: presets de tsconfig compartilhados.
- turbo.json: pipelines de tarefas (dev, build, lint, check-types).

## UI compartilhada (shadcn/ui + Tailwind)

- CSS global: importado no layout da app para carregar Tailwind e variáveis de tema.

Exemplo (já presente em `apps/web/src/app/layout.tsx`):

```ts
import "@repo/ui/globals.css";
```

- PostCSS/Tailwind: o `apps/web/postcss.config.js` reexporta a config do pacote UI, então não é necessário ter configuração duplicada de Tailwind por app.
- Importação de componentes: os componentes ficam em `packages/ui/src/components/**`. Exemplo de uso do botão:

```tsx
import { Button } from "@repo/ui/components/ui/button";

export default function Example() {
	return <Button>Enviar</Button>;
}
```

## Adicionando novos componentes shadcn

Adicione componentes diretamente no pacote UI, assim todas as apps podem reutilizá‑los:

```bash
cd packages/ui
bun shadcn:add button
```

Isso gerará os arquivos em `packages/ui/src/components/**` e quaisquer utilitários necessários. Depois, importe no app como mostrado acima. Caso o componente inclua estilos adicionais, eles serão resolvidos pelo `@repo/ui/globals.css` (Tailwind v4 com `@import "tailwindcss";`).

## Executando somente um app/pacote

Você pode filtrar tarefas do Turborepo:

```bash
# Dev somente do app web
npx turbo dev --filter=web

# Build somente do app web
npx turbo build --filter=web
```

Ou rode scripts no próprio workspace (por exemplo, dentro de `apps/web`):

```bash
cd apps/web
bun run dev
```

## Cache remoto do Turborepo (opcional)

Use a Vercel Remote Cache para compartilhar resultados de build entre máquinas e CI/CD:

```bash
npx turbo login
npx turbo link
```

## Deploy na Vercel

O app principal está em `apps/web`.

Sugestão de configuração:

- Framework: Next.js
- Diretório do projeto: apps/web
- Comando de build (na raiz): bun run build (ou build do próprio projeto web se configurado)
- Output: .next

Se preferir deploy manual, use `bun run build` e `bun run start` dentro de `apps/web`.

## Dicas / Solução de problemas

- Garanta Node 20+: `nvm use 20`.
- Se o Tailwind não aplicar estilos, confirme a importação de `@repo/ui/globals.css` no layout e a versão do Tailwind (v4) instalada.
- Para novos componentes, sempre adicione no pacote UI (packages/ui) para manter o design system centralizado.

---

Feito com Turborepo, Next.js 15, React 19, Tailwind v4 e shadcn/ui.
