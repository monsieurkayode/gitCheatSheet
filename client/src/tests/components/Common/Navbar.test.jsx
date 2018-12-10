import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { NavBar, mapStateToProps } from '../../../components/Common/Navbar';

const setup = () => {
  const props = {
    authenticated: false,
    logout: jest.fn()
  };

  const wrapper = mount(
    <BrowserRouter>
      <NavBar {...props} />
    </BrowserRouter>
  );

  return { wrapper, props };
};

describe('NavBar Component', () => {
  const { wrapper, props } = setup();

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call logout when the avatar is clicked', () => {
    const Avatar = wrapper.find('Avatar');
    Avatar.simulate('click');
    expect(props.logout).toHaveBeenCalled();
  });

  it('should trigger the click event for navigation links', () => {
    wrapper.find('Link').forEach(el => el.simulate('click'));
  });

  describe('mapStateToProps', () => {
    it('should return an object', () => {
      expect(mapStateToProps({ userDetails: { user: {} } }))
        .toBeInstanceOf(Object);
    });
  });
});
