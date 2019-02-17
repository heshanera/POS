import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Item from '../../components/Item';

configure({adapter: new Adapter()});

describe('Item component', () => {
  let component;

  beforeAll(() => {
    component = <Item 
                    itemId={1} 
                    itemName='itemX' 
                    itemPrice={130} 
                    handleRemove={jest.fn()}
                />
  });

  it('renders without crashing', () => {
    shallow(component);
  });


  it('should display item name and price ', () => {
     const wrapper = shallow(component);
     const name = 'itemX';
     const price = 130;
     expect(wrapper.contains(name)).toEqual(true);
     expect(wrapper.contains(price)).toEqual(true);
  });

});