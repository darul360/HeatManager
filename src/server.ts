import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.static(path.join(__dirname, '../public')));

function parseConsumptionDataLocal(): any {
    try {
        const rawData = fs.readFileSync(path.join(__dirname, '../consumption_data.json'), 'utf-8');
        return JSON.parse(rawData);
    } catch (e) {
        return {};
    }
}

app.get('/api/config', (req, res) => {
    res.json({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
    });
});

app.post('/api/refresh', (req, res) => {
    exec('npm start', { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
        if (error) return res.status(500).json({ error: 'Scraping failed' });
        res.json({ success: true });
    });
});

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
