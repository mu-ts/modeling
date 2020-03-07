import 'mocha';
import { expect } from 'chai';

import { ModelRegistry } from '../../src/service/ModelRegistry';
import { Decorations } from '../../src/model/Decorations';
import { tag } from '../../src/decorators/tag';

describe('@tag', () => {
  it('should use a default name', () => {
    class SomeType {}
    const aType: SomeType = new SomeType();
    tag()(aType, 'id', {} as PropertyDecorator);
    const decorations: Decorations | undefined = ModelRegistry.instance.describe(aType);
    expect(decorations.tag['id']).to.equal('id');
  });
  it('should use an override', () => {
    class SomeType {}
    const aType: SomeType = new SomeType();
    tag('MY_OVERRIDE')(aType, 'id', {} as PropertyDecorator);
    const decorations: Decorations | undefined = ModelRegistry.instance.describe(aType);
    expect(decorations.tag['id']).to.equal('MY_OVERRIDE');
  });
});
