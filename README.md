# ✉️ Cover Letter Generator

A smart, intuitive, and fully customizable **Cover Letter Generation** web app that empowers users to create professional cover letters instantly. Built with a modern stack — **React + Vite** for a blazing-fast frontend experience, and **n8n** as a powerful backend automation engine.

🌐 **Live App**: [coverletter-generation.vercel.app](https://coverletter-generation.vercel.app/)

---

## 🚀 Features

* 📄 **Dynamic Cover Letter Creation**: Easily generate personalized cover letters based on user inputs such as job title, company name, skills, and experience.
* ✨ **Live Preview**: Real-time preview of your cover letter as you type.
* 🛠️ **AI & Automation Powered**: n8n handles backend logic for data handling, formatting, and future extensions like AI text completion.
* 💾 **Export Options**: Download your letter as **PDF** or **copy to clipboard**.
* 🧠 **Smart Suggestions**: (Planned) Integration with AI APIs for improving and proofreading content.

---

## 🧱 Tech Stack

| Layer      | Technology               |
| ---------- | ------------------------ |
| Frontend   | React + Vite             |
| Styling    | Tailwind CSS             |
| Backend    | n8n                      |
| Automation | Webhooks, Workflows      |
| Deployment | Vercel , Self-hosted n8n |

---

## 📦 Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/cover-letter-generator.git
cd cover-letter-generator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

This will launch the frontend at: `http://localhost:5173`

---

## 🔧 Backend Configuration (n8n)

To set up the backend:

1. Install or host [n8n](https://n8n.io) locally or on a cloud server.
2. Import the pre-configured `workflow.json` file from this repository into your n8n instance.
3. Ensure your n8n webhook URL is publicly accessible or tunneled (e.g., via ngrok during development).

---

## 🌐 Environment Variables

Create a `.env` file in the root directory with the following content:

```env
VITE_N8N_WEBHOOK_URL=https://your-n8n-domain.com/webhook/coverletter
```

Replace with your actual webhook URL.

---

---

---

---

##
