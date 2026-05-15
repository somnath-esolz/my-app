# API Documentation

**Base URL:** `https://my-app-production-f6bc.up.railway.app`  
**API Version Prefix:** `/v1`  
**Database:** MongoDB (Mongoose)

---

## Root

### GET /

Health-check / greeting endpoint. Not versioned — available directly at `/`.

**Response `200 OK`**
```
Hello World!
```

---

## Products

All product endpoints are prefixed with `/v1/products`.

### Product Object

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `_id` | string (ObjectId) | — | auto | MongoDB document ID |
| `name` | string | yes | — | Product name |
| `price` | number (≥ 0) | yes | — | Product price |
| `description` | string | no | — | Optional product description |
| `isActive` | boolean | no | `true` | Whether the product is active |
| `createdAt` | string (ISO 8601) | — | auto | Creation timestamp |
| `updatedAt` | string (ISO 8601) | — | auto | Last update timestamp |

---

### POST /v1/products

Create a new product.

**Request Headers**
```
Content-Type: application/json
```

**Request Body**

| Field | Type | Required | Constraints |
|---|---|---|---|
| `name` | string | yes | Non-empty string |
| `price` | number | yes | ≥ 0 |
| `description` | string | no | — |
| `isActive` | boolean | no | — |

Extra fields not listed above are rejected (`forbidNonWhitelisted: true`).

**Example Request**
```bash
curl -X POST https://my-app-production-f6bc.up.railway.app/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MacBook Pro",
    "price": 1999,
    "description": "Fast laptop",
    "isActive": true
  }'
```

**Response `201 Created`**
```json
{
  "_id": "6650a1f2e4b0a1c2d3e4f5a6",
  "name": "MacBook Pro",
  "price": 1999,
  "description": "Fast laptop",
  "isActive": true,
  "createdAt": "2026-05-15T10:00:00.000Z",
  "updatedAt": "2026-05-15T10:00:00.000Z",
  "__v": 0
}
```

**Error Responses**

`400 Bad Request` — validation failed (e.g. `name` is a number, `price` is negative, unknown field sent)
```json
{
  "statusCode": 400,
  "message": [
    "name must be a string",
    "price must not be less than 0"
  ],
  "error": "Bad Request"
}
```

---

### GET /v1/products

Retrieve all products.

**Example Request**
```bash
curl https://my-app-production-f6bc.up.railway.app/v1/products
```

**Response `200 OK`**
```json
[
  {
    "_id": "6650a1f2e4b0a1c2d3e4f5a6",
    "name": "MacBook Pro",
    "price": 1999,
    "description": "Fast laptop",
    "isActive": true,
    "createdAt": "2026-05-15T10:00:00.000Z",
    "updatedAt": "2026-05-15T10:00:00.000Z",
    "__v": 0
  },
  {
    "_id": "6650a1f2e4b0a1c2d3e4f5a7",
    "name": "iPhone 15",
    "price": 999,
    "description": "Smartphone",
    "isActive": true,
    "createdAt": "2026-05-15T11:00:00.000Z",
    "updatedAt": "2026-05-15T11:00:00.000Z",
    "__v": 0
  }
]
```

Returns an empty array `[]` when no products exist.

---

### GET /v1/products/:id

Retrieve a single product by its MongoDB ObjectId.

**Path Parameters**

| Parameter | Type | Description |
|---|---|---|
| `id` | string (ObjectId) | The product's `_id` |

**Example Request**
```bash
curl https://my-app-production-f6bc.up.railway.app/v1/products/6650a1f2e4b0a1c2d3e4f5a6
```

**Response `200 OK`**
```json
{
  "_id": "6650a1f2e4b0a1c2d3e4f5a6",
  "name": "MacBook Pro",
  "price": 1999,
  "description": "Fast laptop",
  "isActive": true,
  "createdAt": "2026-05-15T10:00:00.000Z",
  "updatedAt": "2026-05-15T10:00:00.000Z",
  "__v": 0
}
```

**Error Responses**

`200 OK` with `null` body — product not found (Mongoose `findById` returns `null`).

---

### PATCH /v1/products/:id

Partially update a product. Only send the fields you want to change — all fields are optional.

**Path Parameters**

| Parameter | Type | Description |
|---|---|---|
| `id` | string (ObjectId) | The product's `_id` |

**Request Headers**
```
Content-Type: application/json
```

**Request Body**

| Field | Type | Required | Constraints |
|---|---|---|---|
| `name` | string | no | — |
| `price` | number | no | ≥ 0 |
| `description` | string | no | — |
| `isActive` | boolean | no | — |

Extra fields not listed above are rejected.

**Example Request** — update only the price
```bash
curl -X PATCH https://my-app-production-f6bc.up.railway.app/v1/products/6650a1f2e4b0a1c2d3e4f5a6 \
  -H "Content-Type: application/json" \
  -d '{"price": 1799}'
```

**Response `200 OK`** — returns the updated document
```json
{
  "_id": "6650a1f2e4b0a1c2d3e4f5a6",
  "name": "MacBook Pro",
  "price": 1799,
  "description": "Fast laptop",
  "isActive": true,
  "createdAt": "2026-05-15T10:00:00.000Z",
  "updatedAt": "2026-05-15T12:30:00.000Z",
  "__v": 0
}
```

**Error Responses**

`400 Bad Request` — validation failed.

`200 OK` with `null` body — no product found with the given `id`.

---

### DELETE /v1/products/:id

Delete a product by its MongoDB ObjectId.

**Path Parameters**

| Parameter | Type | Description |
|---|---|---|
| `id` | string (ObjectId) | The product's `_id` |

**Example Request**
```bash
curl -X DELETE https://my-app-production-f6bc.up.railway.app/v1/products/6650a1f2e4b0a1c2d3e4f5a6
```

**Response `200 OK`** — returns the deleted document
```json
{
  "_id": "6650a1f2e4b0a1c2d3e4f5a6",
  "name": "MacBook Pro",
  "price": 1799,
  "description": "Fast laptop",
  "isActive": true,
  "createdAt": "2026-05-15T10:00:00.000Z",
  "updatedAt": "2026-05-15T12:30:00.000Z",
  "__v": 0
}
```

`200 OK` with `null` body — no product found with the given `id`.

---

## Validation Rules Summary

These rules are enforced globally via `ValidationPipe`:

- `whitelist: true` — strips any fields not declared in the DTO silently.
- `forbidNonWhitelisted: true` — rejects the request with `400` if unknown fields are present.

### Common `400` Causes

| Mistake | Error message |
|---|---|
| `name` sent as a number | `name must be a string`, `name should not be empty` |
| `price` sent as a string | `price must not be less than 0`, `price must be a number` |
| `price` is negative | `price must not be less than 0` |
| Unknown field sent (e.g. `category`) | `property category should not exist` |
| `isActive` sent as a string | `isActive must be a boolean value` |
