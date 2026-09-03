# Design System (DESIGN_SYSTEM.md)

This design system defines our tokens, components, and layout specs to maintain visual excellence and consistency across the Assay application.

---

## Colors

Our palette uses premium, curated slate and gold tones suitable for a high-end fintech application.

| Token | Color | Hex Code | Description |
| :--- | :--- | :--- | :--- |
| `background` | Sand White | `#F8F7F4` | Global screen background |
| `primary` | Slate Navy | `#0F172A` | Core interactive/text elements and dark blocks |
| `gold` | Antique Gold | `#D4A937` | Highlight color, premium accents, and leak markers |
| `text` | Dark Charcoal| `#1F2937` | Standard readable text |
| `textMuted` | Steel Grey | `#6B7280` | Labels, details, timestamps, and secondary info |
| `white` | Pure White | `#FFFFFF` | Card backgrounds, buttons, and contrast text |
| `border` | Cool Grey | `#E5E7EB` | Dividers and thin container boundaries |
| `error` | Crimson Red | `#EF4444` | Badges, deleted states, and money leak alerts |
| `success` | Emerald Green | `#10B981` | Positive trends, savings, and complete splits |

---

## Typography

We use **Antic Didone** (a elegant serif font) for headings and **Inter** (a highly readable sans-serif font) for core interface elements.

* **Heading Large (H1):** `AnticDidone_400Regular`, Size 32px, Line Height 40px. Used for screen totals or hero statements.
* **Heading Medium (H2):** `AnticDidone_400Regular`, Size 24px, Line Height 32px. Used for card highlights and sections.
* **Section Heading (H3):** `Inter_700Bold`, Size 18px, Line Height 24px. Used for standard card/list headers.
* **Body Bold:** `Inter_700Bold`, Size 14px. Bold UI controls, button labels, and transaction titles.
* **Body Medium:** `Inter_500Medium`, Size 14px. Primary content details and settings items.
* **Body Regular:** `Inter_400Regular`, Size 14px. Secondary text blocks and description copy.
* **Caption:** `Inter_400Regular`, Size 12px. Labels, dates, percentages, and footnotes.

---

## Spacing

Strict multiplier spacing grids must be followed to maintain visual balance.

* `SIZES.padding` (Default): **24px** — Outer container margins, major card interior spacing.
* `XS`: **4px** — Spacing between icons and their tiny text labels.
* `SM`: **8px** — Inner item padding (e.g. padding inside list items, text to text spacing).
* `MD`: **12px** — Separation between input controls and small badges.
* `LG`: **16px** — Space between content chunks within cards.
* `XL`: **24px** — Standard spacing between distinct sections or cards.

---

## Border Radius

Soft, large radius corners represent our modern aesthetic.

* **Medium Radius:** `SIZES.radius` (**20px**) — Default for transaction cards, input fields, and action buttons.
* **Large Radius:** `SIZES.largeRadius` (**24px**) — Used for the main dashboard Hero Spend card.
* **Circle/Pill Radius:** **9999px** — Used for user avatars, transaction category status indicators, and pill badges.

---

## Shadows

Soft, subtle shadows keep components floating above the background without looking messy.

```typescript
export const SHADOWS = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
};
```

---

## UI Components Guidelines

### Buttons
* **Primary:** Background `primary` (Slate Navy), Text `white`, medium border radius.
* **Secondary:** Background `white`, Text `primary`, thin `border` outline.
* **Action Icons:** Circle background `white` with a soft shadow, containing central colored icons.

### Cards
* **Standard:** Pure white background, `soft` shadow, 20px padding, 20px border radius.
* **Hero/Primary:** Solid `primary` slate background, light gold text highlights, 24px padding, 24px border radius.

### Charts & Visualization
* **Donut Chart:** Inner background matching global screen background (`#F8F7F4`), thick circular ring representing percentage spent in each category. Color coding must match category tokens.

### Navigation Layout
* Bottom Tab bar: Background `white` with subtle top border, primary icons representing active routes.
* Tab transitions must be smooth and use native-like screens.
