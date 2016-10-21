import React from 'react';
import expect, { createSpy } from 'expect';
import { renderComponent, getRenderedComponent } from '../../../tests';
import Landing from '../../../app/components/landing';


const state = {
  user: {
    name: 'Test'
  }
};

const defaultProps = {
  actions: {
    loadExamples: createSpy()
  },
  isLoading: false,
  examples: []
};

describe('components.landing', function() {
  describe('shouldComponentUpdate', function() {
    const component = renderComponent(<Landing {...defaultProps} />, state);

    it('should not need to update by default.', function() {
      expect(component.shouldComponentUpdate(defaultProps, null)).toEqual(false);
    });

    it('should update if there is a change to component state.', function() {
      expect(component.shouldComponentUpdate(defaultProps, {change: true})).toEqual(true);
    });

    it('should update if there is a change in props.', function() {
      const newProps = Object.assign({}, defaultProps, { isLoading: true });
      expect(component.shouldComponentUpdate(newProps, null)).toEqual(true);
    });

  });

  describe('componentWillMount', function() {
    beforeEach(function() {
      defaultProps.actions.loadExamples.reset();
      renderComponent(<Landing {...defaultProps} />, state);
    });

    it('should dispatch the loadExamples action.', function() {
      expect(defaultProps.actions.loadExamples).toHaveBeenCalled();
      expect(defaultProps.actions.loadExamples.calls.length).toEqual(1);
    });

  });

  describe('render', function() {
    const content = getRenderedComponent(<Landing {...defaultProps} />, state).textContent;

    it('should have the correct name.', function() {
      const otherName = 'Error Page';
      const correctName = 'Landing Page';

      expect(content.includes(otherName)).toBe(false);
      expect(content.includes(correctName)).toBe(true);
    });

  });
});
