import 'mocha';
import { expect } from 'chai';

import { ModelRegistry } from '../../src/service/ModelRegistry';
import { Decorations } from '../../src/model/Decorations';
import { attribute } from '../../src/decorators/attribute';

describe('@attribute', () => {
  it('should use a default name', () => {
    class SomeType {}
    const aType: SomeType = new SomeType();
    attribute()(aType, 'id', {} as PropertyDecorator);
    const decorations: Decorations | undefined = ModelRegistry.instance.describe(aType);
    expect(decorations.attributes['id']).to.equal('id');
  });
  it('should use an override', () => {
    class SomeType {}
    const aType: SomeType = new SomeType();
    attribute('MY_OVERRIDE')(aType, 'id', {} as PropertyDecorator);
    const decorations: Decorations | undefined = ModelRegistry.instance.describe(aType);
    expect(decorations.attributes['id']).to.equal('MY_OVERRIDE');
  });
});
