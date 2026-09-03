# Development Roadmap (PHASES.md)

This roadmap outlines the phases of building Assay, from setup to the AI-powered assistant.

---

## Phase 0: Planning & Specifications
* **Objective:** Define product scope, create database schemas, styling guidelines, and project specifications.
* **Status:** ✅ Completed
* **Deliverables:** PRD, ARCHITECTURE, RULES, PHASES, and initial DESIGN_SYSTEM documents.

---

## Phase 1: Project Setup & Core Layout
* **Objective:** Create the initial mobile app skeleton, routing layout, and visual components.
* **Status:** ✅ Completed
* **Deliverables:**
  - [x] Create project repository & install Expo v54.
  - [x] Configure TypeScript config & default imports.
  - [x] Load custom fonts (`AnticDidone_400Regular`, `DMSans_400Regular`, `DMSans_500Medium`, `DMSans_600SemiBold`, `DMSans_700Bold`).
  - [x] Implement bottom tab routing (`app/(tabs)/_layout.tsx`: Dashboard, Upload, Transactions, Insights, Settings).
  - [x] Design visual component system (`Typography`, `Card`/`AppCard`, `Button`/`AppButton`, `ScreenHeader`, `TransactionRow`, `AppChip`, `AppInput`).

---

## Phase 2: Design System & Mobile UI Redesign
* **Objective:** Standardize the entire mobile UI under ONE strict visual identity and design system.
* **Status:** ✅ Completed
* **Deliverables:**
  - [x] Centralize color tokens (Deep Navy `#111827`, Warm Off-White `#F7F7F5`, Surface White `#FFFFFF`, Assay Gold `#D6A928`, Border `#E7E7E3`).
  - [x] Enforce typography hierarchy (Antic Didone for editorial page titles, DM Sans / Avenir Next for primary UI).
  - [x] Build and integrate cohesive `ScreenHeader` across all major screens.
  - [x] Remove debug controls (blue gear icon) and replace with clean system navigation.
  - [x] Standardize Dashboard screen with Monthly Spend Hero, Quick Actions, Donut breakdown, Money Leaks, and Recent Transactions.
  - [x] Standardize Upload screen with upload surface and AI Extraction Pipeline preview.
  - [x] Standardize Transactions screen with search bar, filter chips, and date-grouped transaction lists.
  - [x] Standardize Insights screen with segmented control (`Overview`, `Trends`, `Analysis`), hero sparkline card, and insight cards.
  - [x] Standardize Settings screen with Profile card, Preferences, Support list rows, and Log Out action.
  - [x] Standardize modal flows (Welcome screen, Transaction Detail, Smart Split, Assay AI Assistant).

---

## Phase 3: Authentication
* **Objective:** Secure app access and enable personal database records.
* **Status:** 📋 Pending
* **Tasks:**
  - [ ] Setup Auth system (Supabase Auth or OAuth/JWT flow).
  - [ ] Build Login, Signup, and Password Reset screens using the Assay design system.
  - [ ] Implement secure storage token cache on-device.

---

## Phase 4: Backend & Image Storage
* **Objective:** Setup FastAPI server, database connections, and file uploads.
* **Status:** 📋 Pending
* **Tasks:**
  - [ ] Create FastAPI base structure with SQLModel/SQLAlchemy.
  - [ ] Configure PostgreSQL instance (Supabase DB).
  - [ ] Create S3 or Cloudinary image upload storage bucket integration.

---

## Phase 5: OCR Pipeline & AI Parser
* **Objective:** Convert receipt/screenshot images into raw text strings and structured transaction JSON.
* **Status:** 📋 Pending
* **Tasks:**
  - [ ] Integrate Google Cloud Vision API on the backend.
  - [ ] Configure Gemini Developer API client.
  - [ ] Prompt engineer JSON output matching transaction schema parameters.

---

## Phase 6: Smart Categorization & Leak Engine
* **Objective:** Automatically group transactions and detect recurring micro-spends.
* **Status:** 📋 Pending
* **Tasks:**
  - [ ] Build merchant classification embeddings / LLM mapping.
  - [ ] Implement grouping logic for micro-transactions under ₹100.
  - [ ] Calculate monthly/annual projected cost impact of micro-spending habits.

---

## Phase 7: Analytics, Smart Split & AI Chatbot Integration
* **Objective:** Live API integration for charts, bill splitting, and natural language financial query assistant.
* **Status:** 📋 Pending
* **Tasks:**
  - [ ] Connect interactive charts to live backend backend analytics routes.
  - [ ] Wire OCR item parsing into Smart Split friend assignment flow.
  - [ ] Connect Assay AI chat interface to RAG vector database backend.
