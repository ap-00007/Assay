# Assay - Product Requirements Document (PRD)

## Vision
Assay helps people understand where their money goes by automatically extracting and categorizing expenses from receipts, invoices, and UPI payment screenshots using AI.

## Problem Statement
* **Manual tracking fails:** Users start tracking manually but give up within days due to friction.
* **Small UPI payments go unnoticed:** Digital microtransactions (tea, snacks, auto rides) accumulate and drain bank balances without being categorized.
* **Existing apps require too much effort:** SMS readers are unreliable, privacy-invasive, and platform-restricted; manual entry apps require too much discipline.
* **Users want insights, not spreadsheets:** People want actionable advice on how to stop money leaks, not just raw logs.

## Target Users
* **College Students:** Budget-conscious, high volume of micro-payments via UPI, needs split billing.
* **Young Professionals:** Just starting to earn, struggle to save, eat out/order delivery frequently, need leak detection.
* **Working Adults:** Need clean logs for monthly budget management and tax preparation.
* **Freelancers:** Need to separate business expenses from personal ones.
* **Families:** Need to track combined/joint expenses easily.

## User Personas

### Persona 1: Rohan, 21 (College Student)
* **Behavior:** Pays for tea, snacks, and shared auto rides multiple times a day using UPI.
* **Pain Point:** Has no idea how he runs out of pocket money by the 20th of every month. Manual entry apps are too annoying for ₹20 transactions.
* **Goal:** A frictionless way to track where all the small ₹20-50 payments go.

### Persona 2: Priya, 26 (Software Engineer)
* **Behavior:** Orders food via apps, shops online, pays rent, and buys coffee daily.
* **Pain Point:** Earns well but struggles to save. She doesn't want to grant SMS permissions to intrusive fintech apps.
* **Goal:** Gain insights on how much she is spending on lifestyle leaks and get recommendations to optimize savings.

## Goals
* **Zero-Friction Entry:** Enable expense logging in under 3 seconds via receipt photo or UPI screenshot upload.
* **Intelligent Auto-Categorization:** Correctly identify merchants and map them to standard categories with >90% accuracy.
* **Proactive Leak Detection:** Group and surface recurring micro-payments that constitute "money leaks".
* **Privacy-First:** Do not require broad SMS reading or bank login permissions. Rely on user-initiated screenshot/receipt uploads.

## Non Goals
* **Automated Bank Sync:** No screen-scraping or direct bank logins in the MVP.
* **Investment/Wealth Management:** The app will focus strictly on expense tracking and budgeting, not stock/mutual fund investments.
* **Full-fledged Accounting:** No balance sheets, profit & loss statements, or double-entry bookkeeping.

## Core Features

### 1. Receipt OCR
* **Problem:** People don't manually enter expenses because typing details is tedious.
* **Solution:** Automatically scan receipts using the camera or gallery, extracting merchant name, date, items, tax, and total amount.
* **Priority:** High

### 2. UPI Screenshot Parser
* **Problem:** Small UPI payments (GPay, PhonePe, Paytm) are frequent and go undocumented.
* **Solution:** Allow users to upload a screenshot of any UPI transaction success screen to instantly parse amount, merchant/payee, timestamp, and transaction ID.
* **Priority:** High

### 3. AI Categorization
* **Problem:** Raw merchant names (e.g. "ZEPTO*SUPERDAILY") are hard to read and tedious to categorize manually.
* **Solution:** AI engine maps merchants to user-friendly names (e.g. "Zepto") and automatically assigns them categories (e.g. "Groceries").
* **Priority:** High

### 4. Money Leak Engine
* **Problem:** Users don't realize how small, frequent purchases drain their budget.
* **Solution:** Highlight patterns of recurring micro-spends (e.g., ₹50 tea daily) and project their monthly/yearly impact.
* **Priority:** Medium

### 5. Smart Split
* **Problem:** Splitting bill items manually among friends is slow and leads to calculation mistakes.
* **Solution:** Parse a receipt, select who ordered what, and auto-generate split requests.
* **Priority:** Medium

## Future Features
* **SMS Parser (Optional / On-device):** Read transactions from transactional SMS notifications safely.
* **Budget Alerts:** Proactive warnings when approaching category budget limits.
* **Recurring Subscription Manager:** Track active SaaS, streaming, and gym subscriptions from invoices.

## User Stories
* **As a student**, I want to upload UPI success screenshots, so I can track miscellaneous spending without typing.
* **As a working adult**, I want to take a photo of a restaurant bill, so that my food expenses are logged instantly.
* **As a user**, I want to see my spending aggregated by categories (Food, Shopping, Transit), so I know where to cut back.
* **As a user**, I want to see how much my ₹30 daily tea costs me over a year, so I can adjust my daily spending behavior.

## Success Metrics
* **Engagement:** Daily/Weekly active users (DAU/WAU) checking their dashboard.
* **Retention:** Percentage of users who upload at least 3 transactions per week after 30 days.
* **Accuracy:** AI parser classification accuracy (target >92% correct mapping).
* **Friction Reducer:** Average time spent logging an expense (target <3 seconds).

## Competitive Advantage
* **Visual-First Parsing:** Unlike standard apps relying on SMS or bank feeds, Assay leverages screenshots and receipts directly, maintaining privacy while reducing friction.
* **Leak Detection Focus:** Rather than just plotting charts, it actively exposes the "leaks"—the small, repetitive expenses that add up.

## MVP Scope
* Expo mobile app (Android & iOS).
* Upload/Camera capabilities for receipts and screenshots.
* Backend API to parse images (OCR + Gemini LLM).
* Local/Backend storage for expenses and categories.
* Interactive Dashboard (Total Spent, Spending Breakdown, Money Leaks, Recent Transactions).

## Future Roadmap
* **Phase 1-4:** Mobile frontend, layouts, and image upload.
* **Phase 5-8:** Backend processing, OCR implementation, and AI categorization engine.
* **Phase 9-12:** Advanced Analytics, Money Leak Engine, Smart split, and AI Assistant chatbot.
