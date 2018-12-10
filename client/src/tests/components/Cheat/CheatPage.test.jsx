import React from 'react';
import { shallow } from 'enzyme';
import { CheatPage } from '../../../components/Cheat/CheatPage';

const setup = () => {
  const props = {
    match: { params: { category: 'install git' } },
    cheats: [{ _id: 1 }],
    loading: false
  };

  return shallow(<CheatPage {...props} />);
};

describe('CheatPage Component', () => {
  const wrapper = setup();

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
