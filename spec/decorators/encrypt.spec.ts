import 'mocha';
import { expect } from 'chai';

import { ModelRegistry } from '../../src/service/ModelRegistry';
import { Decorations } from '../../src/model/Decorations';
import { encrypt } from '../../src/decorators/encrypt';

describe('@encrypt', () => {
  it('should use the provided secret.', () => {
    class SomeType {}
    const aType: SomeType = new SomeType();
    encrypt(Buffer.from('a secret'))(aType, 'id', {} as PropertyDecorator);
    const decorations: Decorations | undefined = ModelRegistry.instance.describe(aType);
    expect(decorations.encrypt['id'].toString()).to.equal('a secret');
  });
});
