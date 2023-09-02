const codes: { [country: string]: string } = {
  'United Kingdom': 'GB',
  'United States': 'US',
  Russia: 'RU',
};

export default function getCountryCode(country: string): string {
  return codes[country] || '';
}
