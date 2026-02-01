# Expense Tracker Project Documentation

## 1. Project Overview
The **Expense Tracker** is a full-stack web application designed to help users manage their personal finances. Users can register, log in, and track their daily expenses with a clean and intuitive interface. The application follows a modern decoupled architecture with a dedicated backend API and a responsive frontend client.

## 2. Key Features
- **User Authentication**: Secure signup and login functionality using JWT-based sessions.
- **Expense Management**: Add, view, update, and delete expense records.
- **Secure Data Storage**: Passwords are hashed using Bcrypt before being stored in MongoDB.
- **File Uploads**: Support for uploading profile pictures or file attachments using Multer.
- **Responsive UI**: Built with Bootstrap 5 to ensure a seamless experience on both desktop and mobile devices.

## 3. Technical Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.x)
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Token (JWT) & Bcrypt
- **Middleware**: CORS, Body-Parser, Multer (file uploads)

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **Form Handling**: Formik & Yup (Validation)
- **Styling**: Bootstrap 5 & Vanilla CSS
- **Notifications**: React Toastify

---

## 4. System Requirements
To run this project locally, ensure you have the following installed:
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **MongoDB**: A local instance or a MongoDB Atlas URI
- **Web Browser**: Modern browser (Chrome, Firefox, Edge, etc.)

---

## 5. Configuration & Environment
The backend requires a `.env` file in the `/Backend` directory with the following variables:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
```

---

## 6. Installation & Setup

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd Expense-Tracker
```

### Step 2: Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (using nodemon):
   ```bash
   npm start
   ```

### Step 3: Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The application will typically be available at `http://localhost:5173` (Frontend) and the API at `http://localhost:3000` (Backend).
