import reducer from '../../reducers/reducerItems';
import * as itemReducer from '../../reducers/reducerItems';
import * as itemActions from '../../actions/itemActions';

describe('Item reducer', () => {
  let items;
  beforeEach(() => {
    items = [
      {
        image: {
          contentType: 'image/png',
          image: {
            type: 'Buffer',
            data: [123, 12, 9, 12, 7],
          },
        },
        itemName: 'itemX',
        price: 2.3,
        _id: '5c7166a61dee2c23f58dce5d',
      },
      {
        image: {
          contentType: 'image/png',
          image: {
            type: 'Buffer',
            data: [12, 212, 39, 32, 98],
          },
        },
        itemName: 'itemY',
        price: 2.9,
        _id: '5c7167441dee2c23f58dce61',
      },
    ];

    itemReducer.getSavedState = jest.fn(() => ({}));
    // const localStorageData = JSON.stringify({});
    // Storage.prototype.getItem = jest.fn((key) => {if (key == 'items') return {}});
  });

  it('should return the initial state', () => {
    const data = [];
    // global.localStorage.clear();
    expect(reducer(undefined, {})).toEqual(data);
  });

  it('should handle REQUEST_ITEMS', () => {
    expect(reducer([], { type: itemActions.REQUEST_ITEMS })).toEqual([]);
    expect(reducer(items, { type: itemActions.REQUEST_ITEMS })).toEqual(items);
  });

  it('should handle RECEIVE_ITEMS', () => {
    const newItems = [
      {
        image: {
          contentType: 'image/png',
          image: {
            data: [123, 12, 23, 4, 54, 65, 234, 13],
            type: 'Buffer',
          },
        },
        itemName: 'itemX',
        price: 1.3,
        _id: '5c7166c81dee2c23f58dce5e',
      },
    ];

    expect(reducer([], { type: itemActions.RECEIVE_ITEMS, payload: items })).toEqual(items);
    expect(reducer(items, { type: itemActions.RECEIVE_ITEMS, payload: newItems })).toEqual(newItems);
  });
});
