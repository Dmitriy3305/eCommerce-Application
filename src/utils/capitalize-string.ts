export default function capitalizeString(str: string): string {
  const parts = str.split(' ').map((part) => part[0].toUpperCase() + part.substring(1));
  return parts.join(' ');
}
