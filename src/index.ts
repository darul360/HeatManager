import { IstaScraper } from './scraper';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { parseConsumptionData } from './utils';
import * as dotenv from 'dotenv';

dotenv.config();

const email = process.env.ISTA_EMAIL;
const password = process.env.ISTA_PASSWORD;
const manualGuid = process.env.ISTA_USER_GUID;

if (!email || !password) {
    console.error('Please set ISTA_EMAIL and ISTA_PASSWORD in .env file');
    process.exit(1);
}

(async () => {
    const scraper = new IstaScraper(email, password);
    try {
        await scraper.init();
        await scraper.login();

        const userId = await scraper.getUserId(manualGuid);
        if (!userId) {
            console.error('Could not find User ID. URL pattern might have changed.');
            process.exit(1);
        }

        console.log('Found User ID:', userId);

        // 1. Scrape Raw Data
        const rawData = await scraper.getConsumptionData(userId);
        console.log('Scraped Raw Data. Parsing...');

        // 2. Parse Data
        const cleanData = parseConsumptionData(rawData);
        console.log('Data Parsed. Uploading to Firestore...');

        // 3. Upload to Firestore
        await setDoc(doc(db, "data", "consumption"), cleanData);
        console.log('SUCCESS: Data saved to Firestore!');

    } catch (error) {
        console.error('Error during scraping process:', error);
        process.exit(1);
    } finally {
        await scraper.close();
        process.exit(0);
    }
})();
