import { ModelRegistry } from '../service/ModelRegistry';

/**
 * Indicates that field is to be saved as a tag, rather than within the body.
 */
export function encode(algorithm: 'hex' | 'base64' = 'hex'): any {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    ModelRegistry.instance.register(target, { encode: { [propertyKey]: algorithm } });
    return descriptor;
  };
}
