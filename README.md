# 🎬 MERN Movie Application

A full‑stack **MERN Movie Management Application** built as part of a technical assessment. The application supports **user authentication, role‑based access control, movie listing with search & pagination, admin CRUD operations**, and **background job processing**.

---


---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Material UI (MUI)
* Redux Toolkit
* React Router DOM
* Axios

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication
* Role‑Based Access Control (RBAC)

### Background Jobs

* Redis
* BullMQ

> ℹ️ Redis & BullMQ are used only for background movie import jobs and are **disabled in production** after initial data seeding.

---

## Features

### User Features

* User registration & login
* JWT‑based authentication
* View movies with pagination
* Search movies by name or description

### Admin Features

* Add new movies
* Edit existing movies
* Delete movies
* Trigger background movie import (development only)

---

## 📂 Project Structure

```
root
├── backend
│   ├── config
│   ├── models
│   ├── routes
│   ├── queues
│   ├── workers
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## 🔐 Authentication & Authorization

* JWT tokens are issued on login
* Tokens are stored in localStorage
* Protected backend routes using middleware
* Admin‑only actions restricted via role checks

---

## 🚀 Deployment

### Backend

* Deployed on **Railway**
* Uses MongoDB Atlas for database
* Redis disabled in production using environment flags

### Frontend

* Deployed on **Vercel**
* Connected to Railway backend via Axios base URL

---

## 🧪 API Overview

* `POST /api/auth/register` – Register user
* `POST /api/auth/login` – Login user
* `GET /api/movies` – Get movies (pagination)
* `POST /api/movies` – Add movie (admin)
* `PUT /api/movies/:id` – Update movie (admin)
* `DELETE /api/movies/:id` – Delete movie (admin)
* `POST /api/movies/import/imdb` – Import movies (admin, dev only)

---

## 🧠 Design Decisions

* **Routes‑only backend structure** for simplicity
* **Redux Toolkit** chosen for predictable state management
* **Redis made optional** to avoid production dependency after seeding
* **Environment‑based configuration** for clean deployment

---

## 👨‍💻 Author

Prathmesh Shinde

---

## 📌 Notes

* Admin accounts are assigned via backend logic or database role update
* Import feature is intentionally disabled in production
* UI kept clean and functional for assessment clarity

---

✅ *Project is fully functional and production‑deployed.*
