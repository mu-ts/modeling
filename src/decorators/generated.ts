import { ModelRegistry } from '../service/ModelRegistry';
import { ValueGenerator } from '../interfaces/ValueGenerator';

/**
 * Tells the collection what attribute is to be used as the id for the documents.
 *
 * Usage: On an attribute @key() and optionally provide a generator to create the ID's if the default of UUID4 is not desired.
 *
 * @param generator for the ID if nothing is provided.
 */
export function generated(generator?: 'uuid.v4' | ValueGenerator): any {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    ModelRegistry.instance.register(target, { generated: { [propertyKey]: generator || 'uuid.v4' } });
    return descriptor;
  };
}
