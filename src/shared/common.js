export const APP_NAME = 'Kigu';

export const REGIONS = [
    { code: 'NAM', label: 'North America' },
    { code: 'CAM', label: 'Central America' },
    { code: 'SAM', label: 'South America' },
    { code: 'EUR', label: 'Europe' },
    { code: 'SLV', label: 'Slavic' },
    { code: 'MEA', label: 'Middle East' },
    { code: 'AFR', label: 'Africa' },
    { code: 'OCE', label: 'Oceania' },
    { code: 'SEA', label: 'Southeast Asia' },
    { code: 'JPN', label: 'Japan' },
    { code: 'CHN', label: 'Mainland China' },
    { code: 'THM', label: 'Taiwan / Hong Kong / Macau' },
    { code: 'KOR', label: 'Korea' },
    { code: 'SAS', label: 'South Asia' },
    { code: 'CAS', label: 'Central Asia' }
];

// Generate HTML options from shared region definitions
export function getRegionOptions() {
    return REGIONS.map(region => `
        <option value="${region.code}">
            ${region.label}
        </option>
    `).join('');
}

// Find region label using its code
export function getRegionLabel(code) {
    return REGIONS.find(region => region.code === code)?.label || '';
}

