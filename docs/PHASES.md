# Development Roadmap (PHASES.md)

This roadmap outlines the phases of building Assay, from setup to the AI-powered assistant.

---

## Phase 0: Planning
* **Objective:** Define product scope, create database schemas, styling guidelines, and project specifications.
* **Status:** ✅ Completed
* **Deliverables:** PRD, ARCHITECTURE, RULES, PHASES, and initial DESIGN_SYSTEM documents.

---

## Phase 1: Project Setup & Core Layout
* **Objective:** Create the initial mobile app skeleton, routing layout, and visual components.
* **Status:** ⏳ In Progress
* **Tasks:**
  - [x] Create project repository & install Expo v54.
  - [x] Configure TypeScript config & default imports.
  - [x] Load custom fonts (`Inter`, `AnticDidone`).
  - [ ] Implement tab routing (Dashboard, Scan, History, Settings).
  - [ ] Design visual components (Button, Card, Typography).

---

## Phase 2: Authentication
* **Objective:** Secure app access and enable personal database records.
* **Status:** 📋 Pending
* **Tasks:**
  - [ ] Setup Auth system (Supabase Auth or OAuth/JWT flow).
  - [ ] Build Login, Signup, and Password Reset screens.
  - [ ] Implement secure storage token cache on-device.

---

## Phase 3: Dashboard & Transactions History
* **Objective:** Present transaction lists, spending summaries, and categories.
* **Status:** 📋 Pending
* **Tasks:**
  - [ ] Create Dashboard Hero Card (Total Month Spend).
  - [ ] Build Category breakdown carousel.
  - [ ] Implement search and filterable Transactions History list view.

---

## Phase 4: Upload, Camera & Gallery Integration
* **Objective:** Allow users to capture receipts or select screenshots.
* **Status:** 📋 Pending
* **Tasks:**
  - [ ] Integrate `expo-camera` permissions and viewfinder layout.
  - [ ] Setup image selector for importing from photo library.
  - [ ] Handle local file compression and caching before upload.

---

## Phase 5: Backend & Image Storage
* **Objective:** Setup FastAPI server, database connections, and file uploads.
* **Status:** 📋 Pending
* **Tasks:**
  - [ ] Create FastAPI base structure with SQLModel/SQLAlchemy.
  - [ ] Configure PostgreSQL instance (Supabase DB).
  - [ ] Create S3 or Cloudinary image upload storage bucket integration.

---

## Phase 6: OCR Pipeline
* **Objective:** Convert receipt/screenshot images into raw text strings.
* **Status:** 📋 Pending
* **Tasks:**
  - [ ] Integrate Google Cloud Vision API on the backend.
  - [ ] Build pre-processing helpers (grayscale, contrast adjustments).
  - [ ] Setup fallback to Tesseract for offline/development mode.

---

## Phase 7: Expense AI Parser
* **Objective:** Turn unstructured OCR text block into clear transaction objects.
* **Status:** 📋 Pending
* **Tasks:**
  - [ ] Configure Gemini Developer API client.
  - [ ] Prompt engineer JSON output matching transaction schema parameters.
  - [ ] Implement fallbacks for partial parser failure (e.g. unknown dates).

---

## Phase 8: Smart Categorization
* **Objective:** Automatically group transactions into standard categories.
* **Status:** 📋 Pending
* **Tasks:**
  - [ ] Build classification embeddings or LLM mapping for merchant identification.
  - [ ] Allow custom category creation and system learning based on user updates.

---

## Phase 9: Analytics & Budgeting
* **Objective:** Visual feedback and budget tracking.
* **Status:** 📋 Pending
* **Tasks:**
  - [ ] Build interactive charts (Pie chart, Bar chart) using SVG tools.
  - [ ] Set monthly budget limits per category and trigger alert banners.

---

## Phase 10: Money Leak Engine
* **Objective:** Detect recurring daily/weekly micro-spends.
* **Status:** 📋 Pending
* **Tasks:**
  - [ ] Implement grouping logic for merchants with frequent transactions.
  - [ ] Project annual cost impact of micro-spending habits.
  - [ ] Build proactive dashboard cards highlighting detected leak categories.

---

## Phase 11: Smart Split
* **Objective:** OCR-assisted split billing among friends.
* **Status:** 📋 Pending
* **Tasks:**
  - [ ] Parse individual items from restaurant invoices.
  - [ ] Create user interface allowing assigning items to friends.
  - [ ] Generate quick payment links or UPI deep links.

---

## Phase 12: AI Assistant
* **Objective:** Natural language chatbot interface to ask budgeting questions.
* **Status:** 📋 Pending
* **Tasks:**
  - [ ] Build chat screen client inside the app.
  - [ ] Provide Gemini with access to transaction histories using vector search or direct DB context queries.
  - [ ] Implement smart recommendation cards within the chat.
