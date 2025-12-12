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

---

## ✨ Features

* **Quiz Customization:** Users can select the number of questions, the JLPT difficulty level (N5 to N1), and the vocabulary category (tags).
* **Vocabulary Management (CRUD):** Functionality to create, read, update, and delete words from the database via the "Manage" page.
* **Progress Tracking:** Completed quiz scores are saved to the database.
* **Data Persistence:** All vocabulary and quiz results are stored securely in MongoDB Atlas.
* **Real-time Feedback:** Immediate visual feedback (green/red buttons) is provided after answering a question.

### **Advanced Feature: Data Visualization 📊**

The "Stats" page includes a responsive bar chart (using the **Recharts** library) that displays a history of all user-completed quiz scores, allowing the user to view their progress over time.

---

## 📸 Screenshots

*(Note: Replace these placeholders with links to your actual screenshots)*

![Quiz Page](https://via.placeholder.com/800x400?text=Quiz+Setup+and+Interface)
*The main quiz setup screen.*

![Stats Page](https://via.placeholder.com/800x400?text=Stats+Page+Visualization)
*A look at the score visualization chart.*

---

## 🏗️ Project Architecture

The project utilizes the MERN stack (MongoDB, Express, React, Node) and is split into two primary directories:
