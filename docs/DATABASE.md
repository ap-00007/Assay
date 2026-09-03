# Database Schema (DATABASE.md)

This document outlines the database structure and relationships for the Assay backend.

---

## Entity Relationship Diagram (Conceptual)

```
  ┌───────────┐             ┌─────────────┐
  │   users   │ 1 ────────* │  expenses   │
  └───────────┘             └─────────────┘
        1                          1
        │                          │
        │ 1                        │ 1
        ▼                          ▼
  ┌───────────┐             ┌─────────────┐
  │  splits   │ * ────────* │ split_items │
  └───────────┘             └─────────────┘
```

---

## 1. Tables Specification

### Table: `users`
Tracks user credentials and metadata.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(50) | PRIMARY KEY | Unique user ID (`usr_...`) |
| `name` | VARCHAR(100) | NOT NULL | User's display name |
| `email` | VARCHAR(150) | UNIQUE, NOT NULL | User's registered email |
| `password_hash` | VARCHAR(255) | NOT NULL | Hashed security password |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Date account was created |

---

### Table: `categories`
Pre-defined and custom expense groupings.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL | PRIMARY KEY | Category index |
| `name` | VARCHAR(50) | UNIQUE, NOT NULL | e.g. "Food & Dining", "Shopping" |
| `color_hex` | VARCHAR(7) | NOT NULL | Associated design system hex |
| `icon_name` | VARCHAR(50) | NOT NULL | Icon token identifier |

---

### Table: `expenses`
Stores transaction details extracted via OCR + AI or entered manually.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(50) | PRIMARY KEY | Unique expense ID (`exp_...`) |
| `user_id` | VARCHAR(50) | FOREIGN KEY -> `users(id)` | Associated owner of expense |
| `merchant_name`| VARCHAR(150)| NOT NULL | Merchant or Payee name |
| `amount` | DECIMAL(10,2)| NOT NULL | Absolute transaction charge |
| `date` | TIMESTAMP | NOT NULL | Time transaction occurred |
| `category_id` | INT | FOREIGN KEY -> `categories(id)`| Classification ID |
| `payment_mode` | VARCHAR(20) | NULL | e.g. "UPI", "Card", "Cash" |
| `transaction_ref`| VARCHAR(100)| NULL | Bank/UPI Ref number reference |
| `receipt_url` | VARCHAR(255) | NULL | URL path of receipt image file |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Log timestamp |

---

### Table: `splits`
Groups representing a split bill event.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(50) | PRIMARY KEY | Unique split ID (`splt_...`) |
| `expense_id` | VARCHAR(50) | FOREIGN KEY -> `expenses(id)`| Root transaction reference |
| `created_by` | VARCHAR(50) | FOREIGN KEY -> `users(id)` | Host user initiating split |
| `split_code` | VARCHAR(20) | UNIQUE, NOT NULL | Code for joining (e.g. SPLIT-A7B8) |
| `status` | VARCHAR(20) | NOT NULL DEFAULT 'Pending' | "Pending", "Settled", "Cancelled" |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Timestamp |

---

### Table: `split_items`
Tracks individual participant amounts and payment status.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL | PRIMARY KEY | Record index |
| `split_id` | VARCHAR(50) | FOREIGN KEY -> `splits(id)` | Parent split reference |
| `user_id` | VARCHAR(50) | FOREIGN KEY -> `users(id)` | Participant user |
| `share_amount` | DECIMAL(10,2)| NOT NULL | Assigned share cost |
| `status` | VARCHAR(20) | NOT NULL DEFAULT 'Unpaid' | "Unpaid", "Paid" |
