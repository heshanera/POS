import { REQUEST_ITEMS, RECEIVE_ITEMS } from '../actions/itemActions';

// loading data from the local storage
const savedState = JSON.parse(localStorage.getItem('items'))
let availableItems = []
if (savedState != null) {
  availableItems = savedState
};

const items = (
  // default values for the state loaded from local storage
  state = availableItems, 
  action) => {

  switch (action.type) {
    case REQUEST_ITEMS:
      return state;
    case RECEIVE_ITEMS:
      return action.payload;
    default:
       return state;
  }
};
export default items;




// let itemReducer = function() {

// 	return [
// 		{
// 			id:1,
// 			itemName:"item1",
// 			price:"$300",
// 		},
// 		{
// 			id:2,
// 			itemName:"item2",
// 			price:"$400",
// 		},
// 		{
// 			id:3,
// 			itemName:"item3",
// 			price:"$600",
// 		},
// 		{
// 			id:4,
// 			itemName:"item4",
// 			price:"$200",
// 		},
// 		{
// 			id:5,
// 			itemName:"item5",
// 			price:"$150",
// 		},
// 		{
// 			id:6,
// 			itemName:"item6",
// 			price:"$700",
// 		},
// 		{
// 			id:7,
// 			itemName:"item7",
// 			price:"$230",
// 		},
// 		{
// 			id:8,
// 			itemName:"item8",
// 			price:"$470",
// 		},
// 		{
// 			id:9,
// 			itemName:"item9",
// 			price:"$100",
// 		}

// 	]

// }

// export default itemReducer;