import React from 'react';
import { shallow } from 'enzyme';
import { SignupPage, mapStateToProps } from '../../../components/Signup/SignupPage';

const setup = () => {
  const props = {
    authenticated: false,
    loading: false,
    registerUser: () => Promise.resolve()
  };

  return shallow(<SignupPage {...props} />);
};

describe('SignupPage Component', () => {
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
          password: 'Password is required',
          username: 'Username is required'
        });
    });

    it('should submit valid forms with no errors', () => {
      wrapper.setState({
        user: { username: 'user', password: 'password', confirmPassword: 'password' },
        errors: {}
      });
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
