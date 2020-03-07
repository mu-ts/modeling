import { ModelRegistry } from '../service/ModelRegistry';

/**
 * This field should be used as metadata, where applicable, to further describe the
 * object when it is persisted.
 */
export function tag(name?: string): any {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    ModelRegistry.instance.register(target, { tag: { [propertyKey]: name || propertyKey } });
    return descriptor;
  };
}
