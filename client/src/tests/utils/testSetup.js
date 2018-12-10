import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LocalStorage from '../__mocks__/LocalStorage';


configure({ adapter: new Adapter() });
global.localStorage = new LocalStorage();
