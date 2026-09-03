# Coding Constitution (RULES.md)

This document acts as the constitution for the Assay codebase. All contributors (including AI assistants) must strictly adhere to these rules.

---

## React & React Native
* **Functional Components Only:** Always use functional components with hooks. Never use React class components.
* **TypeScript Everywhere:** Write strictly typed code. Avoid `any` at all costs. Every component prop and API response must have an explicit interface.
* **Hooks Separation:** Keep complex state management or data fetching logic out of component rendering. Extract them into custom hooks under `hooks/`.

---

## Styling & Theme
* **No Inline Styles:** Do not use `style={{ margin: 10 }}`. Use stylesheet configurations or design system constants.
* **NativeWind / Theme Constants:** Standardize styling using `NativeWind` class names or the theme configurations located in `constants/theme.ts`.
* **Theme Enforcement:** Never use hardcoded color hexes (e.g., `#FF0000`). Always reference `COLORS.primary`, `COLORS.error`, etc.
* **UI Consistency:** No random gradients or styling tweaks. Keep spacing aligned with `SIZES.padding` and `SIZES.radius`.

---

## Component Architecture
* **Single Responsibility Principle:** One component, one responsibility. If a component grows beyond 150 lines, split it into smaller sub-components.
* **Modular Code:** Place screen-specific sub-components in a sub-folder near the screen, and global reusable components in the root `components/` directory.

---

## Naming Conventions
* **Components & Files:** Use `PascalCase` for React components, context providers, and component file names (e.g. `SpendCard.tsx`, `TransactionRow.tsx`).
* **Variables & Functions:** Use `camelCase` for variable names, functions, hooks, and utility files (e.g., `const [isLoading, setIsLoading] = useState(false)`).
* **Constants:** Use `UPPER_SNAKE_CASE` for global constant declarations (e.g., `const API_BASE_URL = '...'`).

---

## Backend Design (FastAPI)
* **Route Separation:** Route files (`routes/` or `routers/`) should only handle HTTP status codes, request parameter validation, and calling services.
* **Service Layer:** All business logic, third-party integrations (Gemini, OCR), and database operations must reside in the service layer (`services/`).
* **No Inline SQL:** Do not write raw SQL or DB sessions directly inside route parameters. Wrap them in helper repositories or service functions.

---

## AI & Third-Party APIs
* **Security Boundaries:** Never call OpenAI, Gemini, or OCR engines directly from the frontend mobile app. This exposes sensitive API keys.
* **Proxy through Backend:** Always route AI features through backend service API endpoints.

---

## Git Flow
* **Feature Branches:** Never commit directly to `main`/`master`. Create feature branches (e.g., `feature/ocr-parser` or `bugfix/font-error`).
* **Atomic Pull Requests:** Keep PRs small and targeted. One feature, one branch, one PR.

---

## Documentation
* **Keep Logs Alive:** Every feature branch or significant code change must update `docs/MEMORY.md` before it is merged.
* **Update Code Comments:** Maintain all existing docstrings and comments. If modifying complex utility behavior, update its documentation inline.
