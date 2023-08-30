// Input string separated by spaces and capitalized
export default function toKebabCase(string: string): string {
  return string.toLowerCase().split(' ').join('-');
}

export function kebabToCamelCase(string: string): string {
  return string
    .split('-')
    .map((word, index) => (index ? word[0].toUpperCase() + word.slice(1) : word))
    .join('');
}
