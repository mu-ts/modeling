import { ModelRegistry } from './service/ModelRegistry';
import { Decorations } from './model/Decorations';

export * from './decorators/attribute';
export * from './decorators/encode';
export * from './decorators/encrypt';
export * from './decorators/generated';
export * from './decorators/metadata';
export * from './decorators/redact';
export * from './decorators/tag';

export * from './model/Decorations';

export * from 'aws-lambda';

/**
 *
 * @param type to return the decorations for.
 */
export const describe = <T>(type: T): Decorations | undefined => ModelRegistry.instance.describe(type);
