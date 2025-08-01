# OAuth-Server 🔐 (Express + Google OAuth + JWT)

This is the backend companion for the [OAuth-Client](https://github.com/your-username/oauth-client) project. It provides a secure **Google OAuth 2.0 authentication** flow using the **Google token**, verifies it using Google APIs, and issues a **JWT** token for session management.

---

## 🌐 Features

- ✅ Google OAuth 2.0 token verification
- 🔐 JWT token generation and validation
- 🍪 Secure `HttpOnly` cookie support (optional)
- 🔁 Session support with `passport` (optional)
- 🚀 Ready to integrate with any frontend (e.g., React)

---

## 🛠️ Tech Stack

- **Node.js + Express**
- **passport / passport-google-token**
- **jsonwebtoken**
- **dotenv**
- **cookie-session** *(optional)*

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/oauth-server.git
cd oauth-server
2. Install Dependencies
bash
Copy
Edit
npm install
3. Create a .env File
env
Copy
Edit
GOOGLE_CLIENT_ID=your_google_client_id
JWT_SECRET=your_jwt_secret
COOKIE_KEY=random_secure_cookie_key
CLIENT_URL=http://localhost:3000
NODE_ENV=development
🔑 How It Works
Frontend sends Google credential token to POST /api/auth/google

Backend verifies it using Google's tokeninfo API or OAuth2 client

If valid:

User is created/found in DB (if using one)

A JWT is signed and returned or set as cookie

Client stores token (e.g., in HttpOnly cookie or memory)



🤝 Connect
Author: Dileep jatav
Contact: Email Dileepkhurana73@gmail.com
