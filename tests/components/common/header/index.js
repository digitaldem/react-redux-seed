import React from 'react';
import expect from 'expect';
import { getRenderedComponent } from '../../../../tests';
import { __NAME__ } from '../../../../app/constants';
import Header from '../../../../app/components/common/header';


const state = {
  user: {
    name: 'Test'
  }
};

const defaultProps = { };

describe('components.header', function() {
  describe('render', function() {
    const content = getRenderedComponent(<Header {...defaultProps} />, state).textContent;

    it('should have the correct app name.', function() {
      const otherName = 'Wrong Name';

      expect(content.includes(otherName)).toBe(false);
      expect(content.includes(__NAME__)).toBe(true);
    });

    it('should have the correct user name.', function() {
      const otherName = 'Wrong Name';

      expect(content.includes(otherName)).toBe(false);
      expect(content.includes(state.user.name)).toBe(true);
    });

  });
});
