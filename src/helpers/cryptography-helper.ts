import bcrypt from 'bcrypt';

export const hash = (data: string): Promise<string> => bcrypt.hash(data, 8);

export const compare = (data: string, encrypted: string): Promise<boolean> =>
  bcrypt.compare(data, encrypted);
