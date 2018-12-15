import React from 'react';
import { shallow } from 'enzyme';
import { CheatPage } from '../../../components/Cheat/CheatPage';

const setup = () => {
  const cheat = {
    _id: 1,
    category: '',
    keywords: [],
    description: '',
    header: ''
  };

  const props = {
    match: { params: { category: 'install git' } },
    cheats: [cheat],
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
