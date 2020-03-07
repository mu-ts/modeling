import 'mocha';
import { expect } from 'chai';

import { ModelRegistry } from '../../src/service/ModelRegistry';
import { Decorations } from '../../src/model/Decorations';
import { encode } from '../../src/decorators/encode';

describe('@encode', () => {
  it('should use a default name', () => {
    class SomeType {}
    const aType: SomeType = new SomeType();
    encode()(aType, 'id', {} as PropertyDecorator);
    const decorations: Decorations | undefined = ModelRegistry.instance.describe(aType);
    expect(decorations.encode['id']).to.equal('hex');
  });
  it('should accept hex', () => {
    class SomeType {}
    const aType: SomeType = new SomeType();
    encode('hex')(aType, 'id', {} as PropertyDecorator);
    const decorations: Decorations | undefined = ModelRegistry.instance.describe(aType);
    expect(decorations.encode['id']).to.equal('hex');
  });
  it('should accept base64', () => {
    class SomeType {}
    const aType: SomeType = new SomeType();
    encode('base64')(aType, 'id', {} as PropertyDecorator);
    const decorations: Decorations | undefined = ModelRegistry.instance.describe(aType);
    expect(decorations.encode['id']).to.equal('base64');
  });
});
