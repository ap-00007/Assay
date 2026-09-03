# API Specification (API_SPEC.md)

This document details the backend API routes and request/response payloads for the Assay server application. All API paths are prefixed with `/api/v1`.

---

## 1. Authentication

### `POST /auth/register`
Creates a new user profile.
* **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123",
    "name": "Ashish"
  }
  ```
* **Response (201 Created):**
  ```json
  {
    "user_id": "usr_9a8b7c6d",
    "email": "user@example.com",
    "token": "jwt_token_string"
  }
  ```

### `POST /auth/login`
Authenticates a user and returns a token.
* **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123"
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "user_id": "usr_9a8b7c6d",
    "name": "Ashish",
    "token": "jwt_token_string"
  }
  ```

---

## 2. Expenses & Uploads

### `POST /expenses/upload`
Uploads a receipt image or UPI screenshot for OCR + AI parsing.
* **Request Type:** `multipart/form-data`
* **Request Payload:**
  - `file`: Image binary data (JPG/PNG).
* **Response (200 OK):**
  ```json
  {
    "transaction_id": "tx_tmp_12345",
    "extracted_data": {
      "merchant_name": "Starbucks Coffee",
      "amount": 340.00,
      "currency": "INR",
      "date": "2026-07-13T10:42:00Z",
      "category": "Food & Dining",
      "items": [
        {
          "name": "Java Chip Frappuccino",
          "quantity": 1,
          "price": 340.00
        }
      ],
      "payment_mode": "UPI",
      "transaction_ref": "UPI_REF_62738219"
    },
    "confidence_score": 0.94
  }
  ```

### `POST /expenses/confirm`
Saves the parsed/modified transaction details to the database.
* **Request Body:**
  ```json
  {
    "merchant_name": "Starbucks",
    "amount": 340.00,
    "date": "2026-07-13T10:42:00Z",
    "category": "Food & Dining",
    "payment_mode": "UPI",
    "transaction_ref": "UPI_REF_62738219"
  }
  ```
* **Response (201 Created):**
  ```json
  {
    "expense_id": "exp_87654321",
    "merchant_name": "Starbucks",
    "amount": 340.00,
    "date": "2026-07-13T10:42:00Z",
    "category": "Food & Dining",
    "created_at": "2026-07-13T10:43:10Z"
  }
  ```

### `GET /expenses`
Retrieves a list of confirmed expenses with optional pagination and filters.
* **Query Parameters:**
  - `limit`: `20` (default)
  - `offset`: `0`
  - `category`: `Food & Dining`
  - `start_date`: `2026-07-01`
  - `end_date`: `2026-07-31`
* **Response (200 OK):**
  ```json
  {
    "expenses": [
      {
        "expense_id": "exp_87654321",
        "merchant_name": "Starbucks",
        "amount": 340.00,
        "date": "2026-07-13T10:42:00Z",
        "category": "Food & Dining"
      }
    ],
    "total_count": 1
  }
  ```

---

## 3. Money Leak Analysis

### `GET /analytics/leaks`
Analyzes transactions to detect recurring micro-spending patterns (leaks).
* **Response (200 OK):**
  ```json
  {
    "detected_leaks": [
      {
        "leak_id": "leak_tea_coffee",
        "title": "Tea & Coffee micro-spends",
        "frequency": "Daily",
        "avg_amount": 50.00,
        "monthly_sum": 1500.00,
        "yearly_projection": 18000.00,
        "recommendation": "Try brewing coffee at home 3 days a week to save ₹750/month."
      }
    ],
    "leak_total_monthly": 1500.00
  }
  ```

---

## 4. Split Bills

### `POST /splits/create`
Initiates a bill split based on a scanned transaction.
* **Request Body:**
  ```json
  {
    "expense_id": "exp_87654321",
    "participants": [
      {
        "user_id": "usr_9a8b7c6d",
        "share_amount": 170.00
      },
      {
        "email": "friend@example.com",
        "share_amount": 170.00
      }
    ]
  }
  ```
* **Response (201 Created):**
  ```json
  {
    "split_id": "splt_55443322",
    "expense_id": "exp_87654321",
    "split_code": "SPLIT-A7B8",
    "status": "Pending"
  }
  ```
