import { ModelRegistry } from '../service/ModelRegistry';

/**
 * Indicates that field is to be saved as a tag, rather than within the body.
 */
export function encrypt(secret: Buffer): any {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    ModelRegistry.instance.register(target, { encrypt: { [propertyKey]: secret } });
    return descriptor;
  };
}
