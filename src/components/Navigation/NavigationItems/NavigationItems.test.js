import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    it('should render two <NavigationItems /> if not authenticated', () => {

    });
});