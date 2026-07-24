# Frontend Documentation

React SPA for the Delivery System.

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI library |
| TypeScript | Type safety |
| Vite 8 | Build tool + dev server |
| Tailwind CSS 4 | Utility-first styling |
| shadcn/ui | Copy-paste UI components |
| Zustand | State management |
| TanStack React Query | Server state + caching |
| React Router | Client-side routing |
| React Hook Form | Form handling |
| Zod | Schema validation |
| Axios | HTTP client |
| Sonner | Toast notifications |
| Lucide React | Icons |

## Documentation

| Document | Description |
|---|---|
| [Architecture](./architecture.md) | How the app is structured and why |
| [Project Structure](./project-structure.md) | Files and folders layout |
| [Components](./components.md) | How to create and use components |
| [State Management](./state-management.md) | Zustand stores and patterns |
| [API Integration](./api-integration.md) | Axios client and backend connection |
| [Forms & Validation](./forms-validation.md) | React Hook Form + Zod patterns |
| [Routing](./routing.md) | Routes, guards, and navigation |
| [Styling](./styling.md) | Tailwind CSS + shadcn/ui theming |
| [Testing](./testing.md) | How to write tests |

## Quick Start

```bash
cd Frontend
npm install
npm run dev
```

Open http://localhost:5173

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Type check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run linter (oxlint) |
