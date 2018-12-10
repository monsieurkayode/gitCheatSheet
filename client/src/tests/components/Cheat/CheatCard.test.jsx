import React from 'react';
import { shallow } from 'enzyme';
import { CheatCard } from '../../../components/Cheat/CheatCard';

const setup = () => {
  const props = {
    commands: ['git merge'],
    description: 'desc',
    header: 'header',
    _id: '1',
    setId: jest.fn(),
    copiedId: '1'
  };

  return shallow(<CheatCard {...props} />);
};

describe('CheatCard Component', () => {
  const wrapper = setup();

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
