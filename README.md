# Quaestio: Questionnaire Platform (Frontend)

A modern, full-featured React-based questionnaire platform for creating, administering, and analyzing surveys, quizzes, and exams. Includes user authentication, analytics, drag-and-drop form builders, and an admin dashboard.

---

## 🛠️ Tech Stack

- **React** (with TypeScript)
- **Vite** (for fast development/build)
- **Apollo Client** (GraphQL API integration)
- **Mantine** UI (components, forms, charts)
- **@hello-pangea/dnd** (drag-and-drop support)
- **Tailwind CSS** (utility classes, optional)
- **SCSS Modules** (custom component styling)
- **Joi** (env validation)
- **Vercel** (deployment config)

---

## 🚀 Setup Guide

### Prerequisites
- Node.js v20+
- Yarn or npm
- A running GraphQL backend (see `.env-example`)

### 1. Clone and Install
```bash
# Clone
 git clone <repo-url>
 cd questionnaire-frontend

# Install dependencies
 npm install
# or
yarn install
```

### 2. Configure Environment
- Copy `.env-example` to `.env` and adjust values:
  - `VITE_GRAPHQL_ENDPOINT` (e.g. http://localhost:5000/graphql)
  - `VITE_HOST`, `VITE_PORT`, etc.

### 3. Run Development Server
```bash
npm run dev
# or
yarn dev
```
- App should be available at `http://localhost:5173` (or your specified port)

### 4. Lint & Format
```bash
npm run lint
```

### 5. Build for Production
```bash
npm run build
```

### 6. Generate GraphQL Types (optional)
```bash
npm run gen-gql
```

---

## Project Structure

- `src/` — Main source code
  - `components/` — UI components (forms, tables, charts, auth, etc)
  - `containers/` — Page-level containers (home, questionnaire, response, not found)
  - `contexts/` — React Contexts for global state (auth, alert, modal)
  - `hoc/` — Higher-order components (layout, loader)
  - `utils/` — Utility functions (color, objects, html, graphql)
  - `generated/` — (auto-generated GraphQL types)
  - `scss/` — SCSS partials for theme variables, global styles
- `.env-example` — Example environment config
- `vite.config.ts` — Vite configuration
- `vercel.json` — Vercel deployment config

---

## Features
- User authentication (sign in/up, session management)
- Admin dashboard with questionnaire CRUD
- Public/private questionnaire response forms
- Drag-and-drop question/option ordering
- Analytics: response metrics, charts, per-question stats
- Theming via Mantine & SCSS variables
- Type-safe GraphQL operations

---

## Customization
- **UI Theme**: SCSS variables in `src/scss/_variables.scss`, Mantine theme config
- **API Endpoint**: `.env` (`VITE_GRAPHQL_ENDPOINT`)
- **Deployment**: Edit `vercel.json` for rewrite rules

---

## License

MIT or as specified in the repository.
