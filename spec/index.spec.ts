import 'mocha';
import { expect } from 'chai';

import { describe as modelDescribe } from '../src/index';

describe('index', () => {
  it('should have a describe function', () => {
    expect(typeof modelDescribe).to.equal('function');
    class SomeClass {}
    expect(() => modelDescribe(new SomeClass())).to.not.throw(Error);
  });
});
