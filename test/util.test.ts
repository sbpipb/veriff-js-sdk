import { expect } from 'chai';
import * as util from '../src/util';

describe('Util', () => {
  describe('#capitalize', () => {
    it('should capitalize given string', () => {
      expect(util.capitalize('foo bar')).to.eql('Foo bar');
      expect(util.capitalize('foo-bar')).to.eql('Foo-bar');
      expect(util.capitalize('Foo bar')).to.eql('Foo bar');
    });
  });

  describe('#camelCaseToSlug', () => {
    it('should slugify the camelCase', () => {
      expect(util.camelCaseToSlug('f')).to.eql('f');
      expect(util.camelCaseToSlug('fooBar')).to.eql('foo-bar');
      expect(util.camelCaseToSlug('FooBar')).to.eql('foo-bar');
    });
  });
});
