import { ModelRegistry } from '../service/ModelRegistry';

/**
 * The fields marked with this decorator will be used as an attribute where
 * applicable, such as when the class is sent as the body for an SNS publish
 * or added as a message to an SQS queue.
 */
export function attribute(name?: string): any {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    ModelRegistry.instance.register(target, { attributes: { [propertyKey]: name || propertyKey } });
    return descriptor;
  };
}
