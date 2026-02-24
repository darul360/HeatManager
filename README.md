# 🌡️ HeatManager: Hybrid Energy Dashboard

A professional energy monitoring system designed to bridge data from **IstaConnect** with a modern, mobile-accessible **Firebase** dashboard.

## 🚀 Key Features

- **Automated Scraper**: Powered by Playwright (with Stealth Plugin) to securely fetch consumption data for Heat, Hot Water, and Cold Water.
- **Hybrid Architecture**:
  - **Cloud (Firebase)**: Secure data storage and global dashboard access from any device.
  - **Local Server**: A lightweight background process on your PC that handles data refreshes, keeping your credentials private and secure.
- **Dynamic Visualizations**: Yearly trends (2025/2026) visualized using Chart.js.
- **Rent Calculator**: Real-time balance estimation based on actual consumption and custom utility rates.

## 🛠️ Quick Start

### 1. Prerequisites
Clone the repository and copy `.env.example` to `.env`. Fill in your credentials:
```env
ISTA_EMAIL=your_email
ISTA_PASSWORD=your_password
ISTA_USER_GUID=optional_manual_guid

# Firebase Config
FIREBASE_API_KEY=...
# ... other keys from Firebase Console
```

### 2. Installation
```bash
npm install
npx playwright install msedge
```

### 3. Local Setup
To access the dashboard via a custom local domain (`http://heatmanager.darul`):
1. Run `setup_dns.ps1` as Administrator.
2. Launch `run_server.bat` (starts the server in background mode).

## 📁 Project Structure

- `/src`: TypeScript source code (Scraper, Express Server, Firebase logic).
- `/public`: Frontend dashboard assets (HTML/JS/CSS).
- `run_server.bat`: Auto-restart startup script with browser launcher.
- `stop_server.bat`: Utility to safely kill background processes.

## 🔒 Security

This application uses **Firebase Authentication**. Only authorized users can access the Firestore database. **Never share your `.env` file publicly.**

---
*Created with ❤️ using **Antigravity***.
