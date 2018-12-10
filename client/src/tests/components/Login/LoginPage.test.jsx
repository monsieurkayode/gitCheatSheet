import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage, mapStateToProps } from '../../../components/Login/LoginPage';

const setup = () => {
  const props = {
    authenticated: false,
    loading: false,
    loginUser: () => Promise.resolve()
  };

  return shallow(<LoginPage {...props} />);
};

describe('LoginPage Component', () => {
  const wrapper = setup();
  const event = { target: { name: 'username', value: '' }, preventDefault: jest.fn() };

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleInputChange', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleInputChange');
    wrapper.instance().handleInputChange(event);
    expect(spy).toHaveBeenCalled();
  });

  describe('handleSubmit', () => {
    it('should be called', () => {
      const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
      wrapper.instance().handleSubmit(event);
      expect(spy).toHaveBeenCalled();
    });

    it('should set error if form is invalid', () => {
      wrapper.instance().handleSubmit(event);
      expect(wrapper.state('errors'))
        .toEqual({
          password: 'Enter your password to login',
          username: 'Enter your username'
        });
    });

    it('should submit valid forms with no errors', () => {
      wrapper.setState({ user: { username: 'user', password: 'password' }, errors: {} });
      wrapper.instance().handleSubmit(event);
      expect(wrapper.state('errors')).toEqual({});
    });
  });


  it('should call handleBlur', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleBlur');
    wrapper.instance().handleBlur(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should return a Redirect component if user is authenticated', () => {
    wrapper.setProps({ authenticated: true });
    expect(wrapper.find('Redirect').length).toBe(1);
  });

  describe('mapStateToProps', () => {
    it('should return an object', () => {
      expect(mapStateToProps({ userDetails: { user: {}, makingApiRequest: true } }))
        .toBeInstanceOf(Object);
    });
  });
});
