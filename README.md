# 🌡️ HeatManager: Hybrid Energy Dashboard

Profesjonalny system do monitorowania zużycia energii cieplnej oraz wody, integrujący dane z serwisu **IstaConnect** z nowoczesnym dashboardem w chmurze (**Firebase**).

## 🚀 Główne Funkcje

- **Automatyczny Scraper**: Wykorzystuje Playwright (z Stealth Plugin), aby bezpiecznie pobierać dane o zużyciu ciepła, ciepłej i zimnej wody.
- **Hybrydowa Architektura**:
  - **Chmura (Firebase)**: Bezpieczne przechowywanie danych i dostęp do dashboardu z dowolnego urządzenia (telefon, tablet).
  - **Local Server**: Lokalny proces na Twoim PC, który zarządza odświeżaniem danych i zapewnia prywatność kluczy dostępowych.
- **Inteligentne Wykresy**: Wizualizacja trendów rocznych (2025/2026) za pomocą Chart.js.
- **Kalkulator Czynszu**: Automatyczne wyliczanie balansu opłat na podstawie rzeczywistego zużycia i zdefiniowanych stawek.

## 🛠️ Konfiguracja (Szybki Start)

### 1. Przygotowanie środowiska
Skopiuj plik `.env.example` do `.env` i uzupełnij swoje dane:
```env
ISTA_EMAIL=TwojEmail
ISTA_PASSWORD=TwojeHaslo
ISTA_USER_GUID=OpcjonalnyGUID

# Firebase
FIREBASE_API_KEY=...
# ... reszta kluczy z konsoli Firebase
```

### 2. Instalacja zależności
```bash
npm install
npx playwright install msedge
```

### 3. Uruchomienie lokalne
Aby Dashboard był dostępny pod Twoim własnym adresem `http://heatmanager.darul`:
1. Uruchom `setup_dns.ps1` jako Administrator.
2. Uruchom `run_server.bat` (serwer wstanie w tle).

## 📁 Struktura Projektu

- `/src`: Skrypty TypeScript (Scraper, Serwer Express, Logika Firebase).
- `/public`: Frontend dashboardu (HTML/JS/CSS).
- `run_server.bat`: Skrypt startowy (Auto-restart + Browser Launcher).
- `stop_server.bat`: Szybkie zatrzymanie procesów tła.

## 🔒 Bezpieczeństwo

Aplikacja wykorzystuje **Firebase Authentication**. Tylko zalogowani użytkownicy mają dostęp do danych w Firestore. Pamiętaj, aby nigdy nie udostępniać pliku `.env` publicznie.

---
*Created with ❤️ for smarter home management.*
