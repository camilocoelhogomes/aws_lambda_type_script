import {randomUUID} from 'crypto';
import {RandomPort} from '../../Application/ports/output/RandomPort';

export class RandomAdapter implements RandomPort {
  UUID(): string {
    return randomUUID();
  }
}
