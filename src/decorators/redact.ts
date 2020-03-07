import { ModelRegistry } from '../service/ModelRegistry';
import { RedactUnless } from '../interfaces/RedactUnless';

/**
 * Indicates that a field should be ignored.
 */
export function redact(unless?: RedactUnless): any {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    ModelRegistry.instance.register(target, { redact: { [propertyKey]: unless ? unless : true } });
    return descriptor;
  };
}
