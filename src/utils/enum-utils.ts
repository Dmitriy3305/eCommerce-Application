type Enum<T> = {
  [key: string]: T;
};

export function getEnumKey<T>(enumArg: Enum<T>, enumValue: T): string | null {
  const pairs = Object.entries(enumArg);
  const key = pairs.find((pair) => pair[1] === enumValue);
  return key ? key[0] : null;
}

export function isEnumValue<T>(enumArg: Enum<T>, enumValue: T): boolean {
  return Object.values(enumArg).includes(enumValue);
}
