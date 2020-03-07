import 'mocha';
import { expect } from 'chai';

import { ModelRegistry } from '../../src/service/ModelRegistry';
import { Decorations } from '../../src/model/Decorations';
import { metadata } from '../../src/decorators/metadata';

describe('@metadata', () => {
  it('should use a default name', () => {
    class SomeType {}
    const aType: SomeType = new SomeType();
    metadata()(aType, 'id', {} as PropertyDecorator);
    const decorations: Decorations | undefined = ModelRegistry.instance.describe(aType);
    expect(decorations.metadata['id']).to.equal('id');
  });
  it('should use an override', () => {
    class SomeType {}
    const aType: SomeType = new SomeType();
    metadata('MY_OVERRIDE')(aType, 'id', {} as PropertyDecorator);
    const decorations: Decorations | undefined = ModelRegistry.instance.describe(aType);
    expect(decorations.metadata['id']).to.equal('MY_OVERRIDE');
  });
});
