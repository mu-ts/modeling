import { ValueGenerator } from '../interfaces/ValueGenerator';
import { RedactUnless } from '../interfaces/RedactUnless';

/**
 * Generic decorations available to modeled classes.
 */
export class Decorations {
  generated?: { [key: string]: ValueGenerator | 'uuid.v4' };
  encode?: { [key: string]: 'hex' | 'base64' };
  encrypt?: { [key: string]: Buffer };
  redact?: { [key: string]: boolean | RedactUnless };
  metadata?: { [key: string]: string };
  tag?: { [key: string]: string };
  attributes?: { [key: string]: string };

  /**
   * To allow other frameworks to piggy back on this behavior allow
   * any other values to be added.
   */
  [key: string]: any;
}
