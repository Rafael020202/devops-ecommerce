import bcrypt from 'bcrypt';

import { Criptography } from '@/contracts';

export class BcryptProvider implements Criptography {
  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, 8);
  }

  async compare(data: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(data, hashed);
  }
}
