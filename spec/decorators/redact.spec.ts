import 'mocha';
import { expect } from 'chai';

import { ModelRegistry } from '../../src/service/ModelRegistry';
import { Decorations } from '../../src/model/Decorations';
import { redact } from '../../src/decorators/redact';
import { RedactUnless } from '../../src/interfaces/RedactUnless';

describe('@redact', () => {
  it('should use a default name', () => {
    class SomeType {}
    const aType: SomeType = new SomeType();
    redact()(aType, 'id', {} as PropertyDecorator);
    const decorations: Decorations | undefined = ModelRegistry.instance.describe(aType);
    expect(decorations.redact['id']).to.be.true;
  });

  it('should accept function', () => {
    class SomeType {}
    const aType: SomeType = new SomeType();
    redact(() => true)(aType, 'id', {} as PropertyDecorator);
    const decorations: Decorations | undefined = ModelRegistry.instance.describe(aType);
    expect(decorations.redact['id']).to.not.be.undefined;
    expect((decorations.redact['id'] as RedactUnless)({}, '')).to.be.true;
  });
});
