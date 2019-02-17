import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddItem from '../../components/AddItem';

configure({adapter: new Adapter()});

describe('AddItem component', () => {
  let component;

  beforeAll(() => {
    component = <AddItem 
                  orderId = {1} 
                  availableItems = {[{
                        id:1,
                        itemName:"item1",
                        price:"$300",
                      },
                      {
                        id:2,
                        itemName:"item2",
                        price:"$400",
                      },
                      {
                        id:3,
                        itemName:"item3",
                        price:"$600",
                      }
                  ]} 
                />
  });

  it('renders without crashing', () => {
    shallow(component);
  });


  it('should display list of all available items ', () => {
    const wrapper = shallow(component);
    expect(wrapper.find('.menuItem')).toHaveLength(3);
  });

  it('should add a selected item ', () => {
    // TODO
  });

});