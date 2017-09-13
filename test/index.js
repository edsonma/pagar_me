import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import expect from 'expect';
import App from '../src/App';
import jsdom from "mocha-jsdom";

describe("<App />", () => {
  jsdom();

  it("Should return an h1 with 'Pagar-me' string", () => {

    const component = ReactTestUtils.renderIntoDocument(
      <App />
    );

    const h1 = ReactTestUtils.findRenderedDOMComponentWithTag(
      component, "h1"
    );

    expect(h1.textContent).toEqual(" Pagar-me ");
  });
});
