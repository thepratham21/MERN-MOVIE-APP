# MERN Movie App – API List

This document contains the complete list of APIs implemented in the **MERN Movie App**, grouped by feature/phase. This can be used for **project explanation, interviews, and documentation**.

---

## 🔐 Authentication APIs

### 1️⃣ Register User

```
POST /api/auth/register
```

**Body**

```json
{
  "name": "John Doe",
  "email": "john@test.com",
  "password": "123456",
  "role": "admin"
}
```

---

### 2️⃣ Login User

```
POST /api/auth/login
```

**Body**

```json
{
  "email": "john@test.com",
  "password": "123456"
}
```

**Response**

```json
{
  "token": "JWT_TOKEN"
}
```

---

## 🎬 Movie Management APIs

### 3️⃣ Add Movie (Admin Only)

```
POST /api/movies
```

**Headers**

```
Authorization: Bearer <ADMIN_TOKEN>
```

**Body**

```json
{
  "title": "Inception",
  "rating": 8.8,
  "releaseDate": "2010-07-16",
  "duration": 148,
  "description": "A mind-bending thriller"
}
```

---

### 4️⃣ Get All Movies

```
GET /api/movies
```

---

### 5️⃣ Search Movies

```
GET /api/movies/search?q=inception
```

---

### 6️⃣ Sort Movies

```
GET /api/movies/sorted?by=rating&order=desc
```

**Sort Fields Supported**

* title
* rating
* releaseDate
* duration

---

### 7️⃣ Update Movie (Admin Only)

```
PUT /api/movies/:id
```

**Headers**

```
Authorization: Bearer <ADMIN_TOKEN>
```

---

### 8️⃣ Delete Movie (Admin Only)

```
DELETE /api/movies/:id
```

**Headers**

```
Authorization: Bearer <ADMIN_TOKEN>
```

---

## ⚡ Background Import API (Redis + BullMQ)

### 9️⃣ Import Movies from External API (Admin Only)

```
POST /api/movies/import/imdb
```

*(Data source: TMDB API — endpoint name kept for assignment compatibility)*

**Headers**

```
Authorization: Bearer <ADMIN_TOKEN>
```

**Response**

```json
{
  "message": "TMDB movies queued for import",
  "total": 260
}
```

---

## 🛡️ Middleware Used

* `userAuth` – JWT authentication
* `adminAuth` – Role-based access control

Used to protect:

* Add movie
* Update movie
* Delete movie
* Import movies

---

