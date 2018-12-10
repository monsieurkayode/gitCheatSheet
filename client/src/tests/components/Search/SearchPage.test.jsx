import React from 'react';
import { shallow } from 'enzyme';
import { SearchPage } from '../../../components/Search/SearchPage';

const setup = () => {
  const props = {
    cheats: [
      {
        category: { name: 'install' },
        keywords: [],
        description: 'install',
        _id: '1'
      }
    ],
    loading: false
  };

  return shallow(<SearchPage {...props} />);
};

describe('SearchPage Component', () => {
  const wrapper = setup();

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
