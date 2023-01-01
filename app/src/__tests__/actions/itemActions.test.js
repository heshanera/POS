import * as itemActions from '../../actions/itemActions';

describe('Item actions', () => {
  it('should request available items', () => {
    const expectedAction = {
      type: itemActions.REQUEST_ITEMS,
    };
    expect(itemActions.requestItems()).toEqual(expectedAction);
  });

  it('should receive available items', () => {
    const items = [
      { itemName: 'item1', price: 2.5, image: {} },
      { itemName: 'item2', price: 1.3, image: {} },
    ];
    const expectedAction = {
      type: itemActions.RECEIVE_ITEMS,
      payload: items,
    };
    expect(itemActions.receiveItems(items)).toEqual(expectedAction);
  });
});
