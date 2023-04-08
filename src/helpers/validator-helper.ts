export const checkMissingParams = (data: any, fields: string[]) => {
  const errors: string[] = [];

  for (const field of fields) {
    if (!data[field]?.trim()) {
      errors.push(`{${field}} é obrigatório.`);
    }
  }

  return errors;
};
