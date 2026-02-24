import { chromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser, Page, BrowserContext } from 'playwright';

chromium.use(StealthPlugin());

export class IstaScraper {
    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private page: Page | null = null;

    constructor(private email: string, private pass: string) { }

    async init() {
        console.log('Launching browser with Stealth Plugin...');
        try {
            this.browser = await chromium.launch({ headless: true, channel: 'msedge' });
        } catch (e) {
            this.browser = await chromium.launch({ headless: true });
        }
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }

    async login() {
        if (!this.page) throw new Error('Page not initialized');
        await this.page.goto('https://istaconnect.com/');
        try {
            const cookieBtn = await this.page.waitForSelector('button[name="cookies"]', { timeout: 5000 }).catch(() => null);
            if (cookieBtn) {
                await cookieBtn.click();
                await this.page.waitForTimeout(1000);
            }
        } catch (e) { }

        await this.page.waitForSelector('#username');
        await this.page.fill('#username', this.email);
        await this.page.fill('#password', this.pass);
        await this.page.click('button[name="login"]');
        await this.page.waitForLoadState('networkidle', { timeout: 60000 }).catch(() => { });
    }

    async getUserId(manualGuid?: string): Promise<string | null> {
        if (manualGuid) return manualGuid;
        if (!this.page) throw new Error('Page not initialized');
        const url = this.page.url();
        let match = url.match(/user\/([A-F0-9]{32})/i);
        if (match && match[1]) return match[1];

        for (let i = 0; i < 15; i++) {
            await this.page.waitForTimeout(2000);
            match = this.page.url().match(/user\/([A-F0-9]{32})/i);
            if (match && match[1]) return match[1];
        }
        return null;
    }

    async getConsumptionData(userId: string) {
        if (!this.page) throw new Error('Page not initialized');
        const types = [
            { key: 'HEAT', unit: 'GJ' },
            { key: 'HOT_WATER', unit: 'M_3' },
            { key: 'COLD_WATER', unit: 'M_3' }
        ];
        const years = [2025, 2026];
        const data: any = {};

        for (const type of types) {
            data[type.key] = {};
            for (const year of years) {
                const url = `https://istaconnect.com/user/consumption/user/${userId}/consumption/${type.key}/${type.unit}/details/${year}`;
                console.log(`Scraping ${type.key} for ${year}...`);
                try {
                    await this.page.goto(url);
                    await this.page.waitForTimeout(4000);
                    data[type.key][year] = await this.page.evaluate(() => document.body.innerText);
                } catch (e) {
                    data[type.key][year] = { error: (e as any).message };
                }
            }
        }
        return data;
    }

    async close() {
        if (this.browser) await this.browser.close();
    }
}
