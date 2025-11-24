export const getExactUnit = (size: string, units: Record<string, any>) => {
  return units[size];
};

export function getDirtyValues<T extends Record<string, any>>(
  dirtyFields: Partial<Record<keyof T, any>>,
  allValues: T,
): Partial<T> {
  const dirtyValues: Partial<T> = {};

  Object.keys(dirtyFields).forEach((key) => {
    const k = key as keyof T;
    // If it's marked as dirty, grab the current value
    if (dirtyFields[k]) {
      dirtyValues[k] = allValues[k];
    }
  });

  return dirtyValues;
}
