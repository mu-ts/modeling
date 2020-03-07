import { Logger, LoggerService } from '@mu-ts/logger';
import { Decorations } from '../model/Decorations';

export class ModelRegistry {
  private readonly logger: Logger;

  private static _i: ModelRegistry;
  private registry: { [key: string]: Decorations } = {};

  public constructor() {
    this.logger = LoggerService.named({ name: this.constructor.name, adornments: { '@mu-ts': 's3' } });
    this.logger.debug('init()');
  }

  /**
   * S3 is a singleton, this makes accessing it much easier/neater.
   */
  public static get instance() {
    if (!this._i) this._i = new ModelRegistry();
    return this._i;
  }

  /**
   *
   * @param type to register the attributes under. It expects to be a class instance, or class constructor.
   * @param attributes to register, which will overwrite existing values should they exist.
   */
  public register<T>(type: T, attributes: { [K in keyof Decorations]: Decorations[K] }): void {
    this.logger.debug('register()', { type, attributes });

    const name: string = this.nameFrom(type);

    if (!this.registry[name]) this.registry[name] = new Decorations();

    // Object.keys(attributes).forEach((key: keyof Decorations) => {
    //   if (Array.isArray(this.registry[name][key])) {
    //     this.registry[name][key].push(attributes[key]);
    //   } else (this.registry[name][key] as any) = attributes[key];
    // });

    this.registry[name] = { ...this.registry[name], ...attributes };

    this.logger.debug('register()', 'After register, registry is:', { name, attributes: this.registry[name] });
  }

  /**
   *
   * @param type of the type to get data for. It expects to be a class instance, or class constructor.
   */
  public describe<T>(type: T): Decorations | undefined {
    const name: string = this.nameFrom(type);
    const metadata: Decorations | undefined = this.registry[name];

    this.logger.debug('describe()', { type, name, metadata });

    return metadata;
  }

  /**
   *
   * @param type normalized into a string value.
   */
  private nameFrom<T>(type: T): string {
    if (typeof type !== 'function' && typeof type !== 'object')
      throw new TypeError(`You must a constructor, or instance, for type (${typeof type}).`);

    return (type as any).name || type.constructor.name;
  }
}
