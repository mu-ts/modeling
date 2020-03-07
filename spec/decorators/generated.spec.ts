import 'mocha';
import { expect } from 'chai';

import { ModelRegistry } from '../../src/service/ModelRegistry';
import { Decorations } from '../../src/model/Decorations';
import { generated } from '../../src/decorators/generated';
import { ValueGenerator } from '../../src/interfaces/ValueGenerator';

describe('@generated', () => {
  it('should use a default name', () => {
    class SomeType {}
    const aType: SomeType = new SomeType();
    generated()(aType, 'id', {} as PropertyDecorator);
    const decorations: Decorations | undefined = ModelRegistry.instance.describe(aType);
    expect(decorations.generated['id']).to.equal('uuid.v4');
  });

  it('should accept a function', () => {
    class SomeType {}
    const aType: SomeType = new SomeType();
    generated(() => 'some-id')(aType, 'id', {} as PropertyDecorator);
    const decorations: Decorations | undefined = ModelRegistry.instance.describe(aType);
    expect((decorations.generated['id'] as ValueGenerator)({}, '')).to.equal('some-id');
  });

  it('should accept uuid.v4', () => {
    class SomeType {}
    const aType: SomeType = new SomeType();
    generated('uuid.v4')(aType, 'id', {} as PropertyDecorator);
    const decorations: Decorations | undefined = ModelRegistry.instance.describe(aType);
    expect(decorations.generated['id']).to.equal('uuid.v4');
  });
});
