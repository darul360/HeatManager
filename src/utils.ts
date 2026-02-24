export function parseConsumptionData(rawData: any): any {
    try {
        const result: any = {};
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        for (const type in rawData) {
            result[type] = {};
            for (const year in rawData[type]) {
                if (typeof rawData[type][year] !== 'string') {
                    result[type][year] = rawData[type][year];
                    continue;
                }

                const text = rawData[type][year] || "";
                result[type][year] = {};

                const regex = /\t(January|February|March|April|May|June|July|August|September|October|November|December)\t([\d\.]+)\s*(GJ|m³|m3)/g;

                let match;
                while ((match = regex.exec(text)) !== null) {
                    const month = match[1];
                    const value = parseFloat(match[2]);
                    result[type][year][month] = value;
                }

                months.forEach(m => {
                    if (result[type][year][m] === undefined) {
                        result[type][year][m] = 0;
                    }
                });
            }
        }
        return result;
    } catch (e) {
        console.error("Error parsing data:", e);
        return {};
    }
}
