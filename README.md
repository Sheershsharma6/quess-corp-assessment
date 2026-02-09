# HRMS Lite - Full-Stack Engineering Assessment

A high-performance, lightweight Human Resource Management System built for streamlined employee lifecycle management and automated attendance tracking.

## 🚀 Live Environment

- **Web Interface:** [Paste Vercel URL here]
- **API Instance:** [Paste Render URL here]/api

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14+ (JSX Architecture), Tailwind CSS for advanced UI/UX.
- **Backend:** Node.js & Express.js (RESTful API Design).
- **Database:** MongoDB Atlas via Mongoose ODM.
- **Infrastructure:** Vercel (CD for Frontend) and Render (CD for Backend).

---

## 🏗️ System Architecture

The project follows a **Monorepo** structure with decoupled service directories:

### 1. Employee Management System

- **Registration Engine:** Implements server-side validation for unique IDs and email formats.
- **Directory Service:** Real-time fetching of employee records from the database.
- **Lifecycle Management:** Secure termination (deletion) of employee records.

### 2. Attendance & Analytics

- **Dynamic Marking:** Interactive UI for Present/Absent status logging.
- **Data Persistence:** Automated ISO timestamps for every attendance record.
- **Log Retrieval:** Employee-specific history tracking to view attendance trends.

### 3. Advanced UI/UX Components

- Glassmorphism design elements and responsive grid layouts.
- Interactive loading states (spinners/skeletons) and real-time state updates.
- Custom-built, reusable components using Tailwind's utility-first CSS.

---

## ⚙️ Local Development Setup

### System Requirements

- Node.js v18.x or higher
- MongoDB Instance (Atlas or Local)

### Installation

1. **Clone & Initialize:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/YOUR_REPO.git](https://github.com/YOUR_USERNAME/YOUR_REPO.git)
   cd YOUR_REPO
   ```
# quess-corp-assessment
