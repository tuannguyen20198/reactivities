import { Injectable } from '@nestjs/common';
import { hash as bcryptHash, compare as bcryptCompare, genSalt } from 'bcryptjs';
import { HashingService } from './hashing.service';

@Injectable()
export class BcryptService implements HashingService {
  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt(10);
    return await bcryptHash(data.toString(), salt); // convert Buffer to string
  }

  async compare(data: string | Buffer, hashed: string): Promise<boolean> {
    return await bcryptCompare(data.toString(), hashed); // convert Buffer to string
  }
}
