import React from 'react';
import { render } from '@testing-library/react';
import About from './about';

describe('<About/>', () => {
  it('matches snapshot', () => {
    const utils = render(<About />);
    expect(utils.container).toMatchSnapshot();
  });
  it('has h1 tag', () => {
    const utils = render(<About />);
    utils.getByText('About');
  });
});
