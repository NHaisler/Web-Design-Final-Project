# 📘 Japanese Quiz Site

*A straightforward, full-stack application for practicing Japanese vocabulary through customizable quizzes.*

---

## 🚀 Overview

The Japanese Quiz Site is designed to help users test their knowledge of Japanese vocabulary (Kanji, Hiragana, and English meanings). It features a robust backend for managing a database of words and a dynamic frontend that generates interactive quizzes based on user-selected filters.

**Who it's for:** Students and learners of the Japanese language who need a tool for active recall testing.

---

## 🌐 Live Demo

| Type                         | Link                                                           |
| ---------------------------- | -------------------------------------------------------------- |
| **Frontend (Deployed Site)** | [https://fastidious-creponne-2dca81.netlify.app](https://japanesequizsite.netlify.app/) |
| **Backend (API Base URL)** | [https://web-design-final-project.onrender.com](https://web-design-final-project.onrender.com)   |


########################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################



# 📘 Japanese Quiz Site

---

## 🚀 Overview

The Japanese Quiz Site is designed to help users test their knowledge of Japanese vocabulary (Kanji, Hiragana, and English meanings). It features a robust backend for managing a database of words and a dynamic frontend that generates interactive quizzes based on user-selected filters.

**Who it's for:** Students and learners of the Japanese language who need a tool for active recall testing.

---

## 🌐 Live Demo

| Type                         | Link                                                           |
| ---------------------------- | -------------------------------------------------------------- |
| **Frontend (Deployed Site)** | https://japanesequizsite.netlify.app/ |
| **Backend (API Base URL)**   | https://web-design-final-project.onrender.com   |

> Test these in an incognito window before submission.

---

## ✨ Features

List **3–6 key features**, ideally with short bullets:

* Create, read, update, and delete **[core resource name]**
* Responsive UI with reusable components
* Backend API with full CRUD operations
* Data persisted in MongoDB
* Advanced feature: *describe yours clearly*
* Error handling on client + server

### **Advanced Feature**

Describe which advanced feature you implemented and **1–2 sentences** about how it works:


---

## 📸 Screenshots

> Include 2–4 screenshots of your app.
> Use relative paths (e.g., `/screenshots/home.png`) or full URLs.

---

## 🏗️ Project Architecture

Describe how the pieces fit together.

```
/frontend
  /src
    /components
    /pages
    App.jsx
    main.jsx

/backend
  /models
  /routes
  server.js
```

Include a sentence explaining the flow:

> The React frontend communicates with the Express backend through API routes. The backend interacts with MongoDB using Mongoose models, and environment variables are used to store secrets.

---

## 📦 Installation & Setup

### **1. Clone the project**

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

---

### **2. Environment Variables**

Include a `.env.example` file in both repos.

**Backend `.env.example`:**

```
MONGO_URI=your_mongodb_url
PORT=4000
JWT_SECRET=your_secret_if_using_auth
API_KEY=if_using_external_apis
```

**Frontend `.env.example`:**

```
VITE_API_URL=https://your-backend-url.com
```

---

### **3. Install Dependencies**

#### Frontend:

```bash
cd frontend
npm install
npm run dev
```

#### Backend:

```bash
cd backend
npm install
npm run dev
```

---

### **4. Running Entire App Locally**

1. Start backend on `http://localhost:4000`
2. Start frontend on `http://localhost:5173`
3. Confirm CORS + API requests are working

---

## 🛠 API Documentation

Document the **main 3–5 routes**:

### **GET /api/resource**

Returns all resources.

### **POST /api/resource**

Creates a new resource.
Body example:

```json
{
  "name": "Example",
  "description": "Text here"
}
```

### **PATCH /api/resource/:id**

Updates a resource.

### **DELETE /api/resource/:id**

Deletes a resource.

> Add additional routes if needed (auth, file uploads, WebSockets, etc.).

---

## 🚀 Deployment Notes

Document where/how you deployed:

### **Frontend**

* Vercel / Netlify
* Explain build command if different (`npm run build`)

### **Backend**

* Render / Railway
* Note environment variable setup


---

## 🎥 Video Walkthrough

**Link to Loom/YouTube:**
[https://your-video-link.com](https://your-video-link.com)

Include quick timestamps if you want extra professionalism:

* **0:00–0:30** Overview
* **0:30–1:30** Core features demo
* **1:30–2:30** Advanced feature
* **2:30–3:00** Technical challenge solved

---

# 🧠 Reflection

*(This section is required for grading.)*

### **1. What was the hardest part of this project?**

Write 3–5 sentences.

### **2. What are you most proud of?**

Could be a feature, a UI improvement, debugging work, or personal growth.

### **3. What would you do differently next time?**

Think in terms of planning, scoping, or tech choices.

### **4. How did you incorporate feedback from the 12/5 check-in gallery?**

Be explicit (this is graded):

> “Based on feedback, I reduced scope by removing X and focused on stabilizing Y.”
> “I reorganized my components for readability after feedback about structure.”

---

# Acknowledgments / AI Usage Disclosure

> Include a brief note on tools used (per academic integrity guidelines):

Examples:

* “Used ChatGPT to help troubleshoot a CORS issue.”
* “Used Claude for help writing documentation.”
* “Used VSCode Copilot for autocomplete suggestions.”
