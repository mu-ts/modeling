import { ModelRegistry } from '../service/ModelRegistry';

/**
 * This field should be used as metadata, where applicable, to further describe the
 * object when it is persisted.
 */
export function metadata(name?: string): any {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    ModelRegistry.instance.register(target, { metadata: { [propertyKey]: name || propertyKey } });
    return descriptor;
  };
}
