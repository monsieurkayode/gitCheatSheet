import React from 'react';
import { shallow } from 'enzyme';
import CheatCommand from '../../../components/Cheat/CheatCommand';

const setup = () => {
  const props = {
    command: 'git merge',
    onCopy: jest.fn(),
    id: '1',
  };

  const wrapper = shallow(<CheatCommand {...props} />);
  return { wrapper, props };
};

describe('CheatCard Component', () => {
  const { wrapper, props } = setup();

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onCopy', () => {
    wrapper.find('.command').simulate('click');
    expect(props.onCopy).toHaveBeenCalled();
  });
});
