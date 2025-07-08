# 💸 Personal Finance Manager

A full-stack web application that helps you **track your income and expenses**, visualize your finances, and manage transactions with ease. Built using **React (TypeScript)** for the frontend and **Spring Boot** with **PostgreSQL** for the backend.

> 🔗 **Live App:**  
> 🖥️ Frontend: [personal-finance-manager-black.vercel.app](https://personal-finance-manager-black.vercel.app/)  
> 🌐 Backend: [personal-finance-manager-production-9c7e.up.railway.app](https://personal-finance-manager-production-9c7e.up.railway.app/)

---

## 📸 Demo

Starting Page:
![image](https://github.com/user-attachments/assets/c1b6761e-ba0d-4305-a2f9-d9e1d28ade57)

Transaction Page:
![image](https://github.com/user-attachments/assets/ceba1480-149c-40ea-b5d7-4e3cec7adcf6)

Charts and Monthly Expenses

![image](https://github.com/user-attachments/assets/bf787543-6b40-41b9-a42a-3ea2a968693e)

![image](https://github.com/user-attachments/assets/7c2d2caf-74ca-42c3-98e8-9682f92124f8)

![image](https://github.com/user-attachments/assets/b92b3ac2-e94b-4d2f-a32c-04987fd0c158)

With Filter :
![image](https://github.com/user-attachments/assets/97a0a691-c7ef-4200-87c6-08d9cf226d50)



## 📦 Features

- ✅ Add, edit, delete transactions (income & expenses)
- 📅 Filter transactions by date
- 📊 View summary and income vs expense charts
- 📈 See balance summary dynamically update
- 📤 Export data to CSV or PDF (future feature)
- 🔐 User login & authentication (future feature)

---

## 🧑‍💻 Tech Stack

### 🟦 Frontend — React + TypeScript

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/) – API requests
- [Chart.js + react-chartjs-2](https://react-chartjs-2.js.org/) – Visual charts
- [Bootstrap](https://getbootstrap.com/) – Styling and responsive layout
- Vite – Build tool for fast development

### 🟨 Backend — Spring Boot

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa) – ORM layer
- [Hibernate](https://hibernate.org/) – Persistence
- [PostgreSQL](https://www.postgresql.org/) – Relational database
- [Spring Web](https://spring.io/guides/gs/rest-service/) – REST API
- [Lombok](https://projectlombok.org/) – Cleaner Java code

---

## ⚙️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/transactions`        | Fetch all transactions |
| POST   | `/api/transactions`        | Add a new transaction |
| PUT    | `/api/transactions/{id}`   | Edit a transaction |
| DELETE | `/api/transactions/{id}`   | Delete a transaction |
| GET    | `/api/transactions/between?start=yyyy-mm-dd&end=yyyy-mm-dd` | Filter by date range |

---

## 🚀 Deployment

| Platform | URL |
|----------|-----|
| **Frontend (React)** | [Vercel](https://vercel.com) |
| **Backend (Spring Boot + PostgreSQL)** | [Railway](https://railway.app) |

### 📁 Environment Setup

#### Frontend `.env`:
```env
VITE_API_BASE_URL=https://personal-finance-manager-production-9c7e.up.railway.app/api




