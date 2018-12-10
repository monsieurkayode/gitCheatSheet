import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import CategoryCard from '../../../components/Common/CategoryCard';

const setup = () => {
  const props = {
    category: 'Branch',
    history: {
      push: jest.fn()
    }
  };

  const wrapper = mount(
    <BrowserRouter>
      <CategoryCard {...props} />
    </BrowserRouter>
  );

  return { wrapper, props };
};

describe('Category Card Component', () => {
  const { wrapper } = setup();

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the history push method', () => {
    wrapper.find('.category').first().simulate('click');
  });
});
