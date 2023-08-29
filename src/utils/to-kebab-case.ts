// Input string separated by spaces and capitalized
export default function toKebabCase(string: string): string {
  return string.toLowerCase().split(' ').join('-');
}
