export const getValuesFromEnum = <T extends object>(enumObj: T) => {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key))) // filter out numeric keys which are values in numeric enums
    .map((key) => ({ key: enumObj[key as keyof T], name: key }));
};
