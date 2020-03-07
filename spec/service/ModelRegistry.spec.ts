import 'mocha';
import { expect } from 'chai';

import { ModelRegistry } from '../../src/service/ModelRegistry';
import { Decorations } from '../../src/model/Decorations';

describe('ModelRegistry', () => {
  describe('instance', () => {
    it('should not be undefined', () => expect(() => ModelRegistry.instance).to.not.throw(Error));
  });

  describe('register()', () => {
    class MyType {}

    const type: MyType = new MyType();

    it('generated with default.', () =>
      expect(() => ModelRegistry.instance.register(type, { generated: { id: 'uuid.v4' } })).to.not.throw(Error));
    it('generated with function.', () =>
      expect(() => ModelRegistry.instance.register(type, { generated: { id: () => '' } })).to.not.throw(Error));

    it('encode hex.', () =>
      expect(() => ModelRegistry.instance.register(type, { encode: { id: 'hex' } })).to.not.throw(Error));
    it('encode base64.', () =>
      expect(() => ModelRegistry.instance.register(type, { encode: { id: 'base64' } })).to.not.throw(Error));

    it('encrypt.', () =>
      expect(() => ModelRegistry.instance.register(type, { encrypt: { id: Buffer.from('my-secret') } })).to.not.throw(
        Error
      ));

    it('redact always', () =>
      expect(() => ModelRegistry.instance.register(type, { redact: { id: true } })).to.not.throw(Error));
    it('redact unless', () =>
      expect(() => ModelRegistry.instance.register(type, { redact: { id: () => true } })).to.not.throw(Error));

    it('metadata', () =>
      expect(() => ModelRegistry.instance.register(type, { metadata: { id: 'ID' } })).to.not.throw(Error));

    it('tag', () => expect(() => ModelRegistry.instance.register(type, { tag: { id: 'ID' } })).to.not.throw(Error));

    it('attribute', () =>
      expect(() => ModelRegistry.instance.register(type, { attribute: { id: 'ID' } })).to.not.throw(Error));

    it('random', () =>
      expect(() => ModelRegistry.instance.register(type, { random: { id: 'ID' } })).to.not.throw(Error));

    it('random', () =>
      expect(() => ModelRegistry.instance.register('type', { random: { id: 'ID' } })).to.throw(TypeError));
  });

  describe('describe()', () => {
    class DescribeType {}
    it('be undefined', () => expect(ModelRegistry.instance.describe({})).to.be.undefined);

    const describeType: DescribeType = new DescribeType();

    ModelRegistry.instance.register(describeType, { metadata: { id: 'ID' } });

    let decorations: Decorations | undefined = ModelRegistry.instance.describe(describeType);

    it('not undefined', () => expect(decorations).to.not.be.undefined);
    it('have metadata', () => expect(decorations.metadata).to.not.be.undefined);

    ModelRegistry.instance.register(describeType, { random: 'foo-bar' });

    decorations = ModelRegistry.instance.describe(describeType);

    it('not undefined', () => expect(decorations).to.not.be.undefined);
    it('have metadata', () => expect(decorations.metadata).to.not.be.undefined);
    it('have metadata', () => expect(decorations.metadata['id']).to.equal('ID'));
    it('have random', () => expect(decorations.random).to.not.be.undefined);
    it('to be foo-bar', () => expect(decorations.random).to.equal('foo-bar'));
  });
});
