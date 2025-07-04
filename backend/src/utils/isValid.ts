export const isValid = (data: any): boolean => {
  if (data === null || data === undefined) return false;

  if (typeof data === 'string') {
    return data.trim().length > 0;
  }

  if (typeof data === 'number') {
    return !isNaN(data);
  }

  if (Array.isArray(data)) {
    return data.length > 0;
  }

  if (typeof data === 'object') {
    return Object.keys(data).length > 0;
  }

  return false;
};
