# Design System (DESIGN_SYSTEM.md)

This design system defines our tokens, components, typography rules, and layout specs to maintain visual excellence and visual consistency across the Assay application.

---

## 1. Product Identity & Design Principles

* **App Name:** ASSAY
* **Product:** AI-powered personal finance and expense intelligence mobile application.
* **Aesthetics:** Minimal, Quiet, Premium, Financial, Intelligent, Trustworthy.
* **Core Rule:** One strict visual system applied consistently across every screen. All screens consume shared components and design tokens.

---

## 2. Color Tokens

Our palette uses a restrained, high-end fintech color system.

| Token | Name | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| `primary` | Deep Navy | `#111827` | Primary text, hero cards, primary buttons, bottom navigation |
| `background` | Warm Off-White | `#F7F7F5` | Global screen background |
| `surface` | Pure White | `#FFFFFF` | Cards, inputs, lists, sheets, and popovers |
| `gold` | Assay Gold | `#D6A928` | Active navigation, important highlights, selected states, key data points |
| `text` | Deep Navy Text | `#111827` | Main readable text and headings |
| `textSecondary` | Steel Grey | `#6B7280` | Supporting text, descriptions, metadata, timestamps, secondary labels |
| `textMuted` | Muted Grey | `#6B7280` | Subtitles and quiet indicators |
| `border` | Cool Grey | `#E7E7E3` | Dividers, input outlines, card boundaries |
| `white` | Pure White | `#FFFFFF` | Contrast text on dark backgrounds |

### Semantic Colors

Only used when communicating explicit status:

| Token | Name | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| `success` | Emerald Green | `#16A34A` | Income values (`+₹85,000`), positive trends, completed statuses |
| `warning` | Amber Warning | `#D97706` | Budget warnings, spend spikes |
| `error` | Crimson Red | `#DC2626` | Expenses (`−₹340`), money leaks, alert badges |
| `info` | Royal Blue | `#2563EB` | Informational messages |

---

## 3. Typography System

Assay pairs an elegant editorial serif with a refined sans-serif.

### Editorial Font
* **Font Family:** `Antic Didone` (`AnticDidone_400Regular`)
* **Usage:** Major page titles (`Upload Receipt`, `Transactions`, `Insights`, `Settings`) and brand statements. Used sparingly in normal case with generous spacing. Never used for dense financial values, body text, or form controls.

### Primary UI Font
* **Font Family:** `Avenir Next` / `DM Sans` (`DMSans_400Regular`, `DMSans_500Medium`, `DMSans_600SemiBold`, `DMSans_700Bold`)
* **Usage:** Transaction names, financial amounts (`−₹340`, `+₹85,000`), categories, buttons, navigation labels, search/form fields, descriptions, timestamps, status labels, card headers, charts, and metrics.

### Type Scale

| Variant | Font | Size / Line Height | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `display` | Primary UI | 42px / 48px | Bold (700) | Hero totals and major numerical values |
| `pageTitle` | Editorial Serif | 38px / 46px | Regular (400) | Major page headers (`Transactions`, `Insights`) |
| `h1` | Editorial Serif | 34px / 42px | Regular (400) | Brand titles and major section introductions |
| `h2` | Editorial Serif | 28px / 36px | Regular (400) | Hero card headings and sub-page titles |
| `h3` | Primary UI | 24px / 32px | SemiBold (600) | Section titles and container headers |
| `cardHeading`| Primary UI | 19px / 26px | SemiBold (600) | Card titles |
| `body` | Primary UI | 16px / 24px | Regular (400) | Standard body copy |
| `bodyMedium` | Primary UI | 16px / 24px | Medium (500) | Medium-emphasis labels and row titles |
| `bodyBold` | Primary UI | 16px / 24px | Bold (700) | Merchant names and prominent list text |
| `secondary` | Primary UI | 14px / 20px | Regular (400) | Metadata, descriptions, and supporting info |
| `caption` | Primary UI | 13px / 18px | Medium (500) | Labels, status badges, and chip text |
| `navigation`| Primary UI | 12px / 16px | Medium (500) | Bottom tab bar labels |
| `financial` | Primary UI | 17px / 22px | Bold (700) | Financial figures (single-line, non-wrapping) |

---

## 4. Spacing System

Based on a strict 8-point grid:

| Token | Size | Usage |
| :--- | :--- | :--- |
| `xs` | 4px | Icon-to-text spacing, micro margins |
| `sm` | 8px | Inner chip/badge padding, row item spacing |
| `md` | 12px | Component-to-component padding, small container gaps |
| `base` | 16px | Card internal padding, list row padding |
| `lg` | 20px | Standard card padding |
| `xl` (padding) | 24px | Primary screen horizontal margin/padding, section gaps |
| `xxl` | 32px | Major section margins |
| `xxxl` | 40px | Hero section vertical gaps |
| `huge` | 48px | Display/header offsets |

---

## 5. Border Radius

| Token | Size | Usage |
| :--- | :--- | :--- |
| `smallRadius` | 12px | Chips, badges, small control boxes, icons |
| `radius` | 16px | Action buttons, inputs, standard UI controls |
| `cardRadius` | 20px | Standard cards, transaction containers |
| `heroRadius` | 24px | Large hero cards (Monthly Spend, Insight Hero) |
| `bottomNavRadius` | 28px | Bottom navigation bar top corners |

---

## 6. Component Architecture

All screens consume shared components:

* [`ScreenHeader`](file:///Users/ashishsmac/Projects/assay/components/ui/ScreenHeader.tsx): Reusable header providing greeting/title, subtitle, and notification actions.
* [`Card` / `AppCard`](file:///Users/ashishsmac/Projects/assay/components/Card.tsx): Card container with `default`, `hero`, `list`, `insight`, and `interactive` variants.
* [`Button` / `AppButton`](file:///Users/ashishsmac/Projects/assay/components/Button.tsx): Buttons (`primary`, `secondary`, `gold`) with touch feedback.
* [`TransactionRow`](file:///Users/ashishsmac/Projects/assay/components/ui/TransactionRow.tsx): Standard transaction item (merchant, category, date/time, amount, payment method chip).
* [`AppChip`](file:///Users/ashishsmac/Projects/assay/components/ui/AppChip.tsx): Filter pills (`All`, `UPI`, `Receipt`, `Cash`, `Card`).
* [`AppInput`](file:///Users/ashishsmac/Projects/assay/components/ui/AppInput.tsx): Search input field with Lucide icon.
