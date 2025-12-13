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

---

## ✨ Features

* Add your own words
* Quizzes by Difficulty
* View Stats of previous quizzes

---

## 🏗️ Project Architecture


```
WebDesignFinalProject/
├── client/
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.css
│       ├── App.js
│       ├── components/
│       │   └── Navbar.js
│       ├── config.js
│       ├── index.css
│       ├── index.js
│       ├── pages/
│       │   ├── Add.js
│       │   ├── Home.js
│       │   ├── Manage.js
│       │   ├── Quiz.js
│       │   └── Stats.js
│       └── reportWebVitals.js
├── Home.png
├── Quiz.png
├── README.md
└── server/
    ├── index.js
    ├── models/
    │   ├── QuizResult.js
    │   └── Vocab.js
    ├── node_modules/
    ├── package.json
    ├── package-lock.json
    ├── routes/
    │   └── api.js
    └── seed.js
```

**Flow Explanation**
The React frontend communicates with the Express backend through API routes. The backend interacts with MongoDB using Mongoose models, and environment variables are used to store secrets.

---

## 📦 Installation & Setup

### **1. Clone the project**

```bash
git clone [https://github.com/NHaisler/Web-Design-Final-Project.git](https://github.com/NHaisler/Web-Design-Final-Project.git)
cd Web-Design-Final-Project
```

---

### **2. Environment Variables**

Include a `.env` file in both repos.

**Backend `.env.example`:**

```
MONGO_URI=your_mongodb_url
PORT=5000
NEXT_PUBLIC_API_URL=your_onrender_url
```


---

### **3. Install Dependencies**

#### Frontend:

```bash
cd client
npm install
npm run dev
```

#### Backend:

```bash
cd server
npm install
npm run dev
```

---

### **4. Running Entire App Locally**

1. Start backend on `http://localhost:4000`
2. Start frontend on `http://localhost:5173`
3. Confirm CORS + API requests are working

## 🚀 Deployment Notes

Document where/how you deployed:

### **Frontend**

* Netlify

### **Backend**

* Render

---

## 🎥 Video Walkthrough

**Link to Loom/YouTube:**
[DEMO](https://youtu.be/P2CRqWs7TO8?si=imvGpBT5kvWD1x46)
---

# 🧠 Reflection

### **1. What was the hardest part of this project?**

Getting the deployment working. It is one thing to have things work locally, but to have them work while deployed in two different places, pushing fixes to GIthub. Fixing settings on both deployement sites, as well as connecting with a database. It can be a lot, and there were a ton of errors to fix for it to work.

### **2. What are you most proud of?**

Getting my first fully deployed up and running website. It is cool to have a link I can just go to and there it is. I have had plenty of temporary local things, but this one can be very easy to show others.

### **3. What would you do differently next time?**

Not much, maybe choose something with more difficult CSS. I can code fine, but I want to have some cooler or nicer looking stuff on my site, since it is all ok, but pretty basic.

### **4. How did you incorporate feedback from the 12/5 check-in gallery?**

Based on feeback from a friend saying, "What if I don't know Japanese words to add?", I decided to provide a base of 500 words so anyone can use the site. Not needing to add any for themselves before they start.

# Acknowledgments / AI Usage Disclosure

I used Gemini for a lot of things. Getting CSS and formatting nice. Debugging API issues, lots of CORS and deployment issues. It mainly acted as a tool to speed up tasks, and give me quick potential solutions to errors I encountered.
