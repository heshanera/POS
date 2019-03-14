import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import OrderList from '../containers/orderList';
import Login from '../containers/login';

class App extends Component {

  	render() {
    	return(
	      	<Switch>
		        <Route exact path="/(|login)" component={Login} />
		        <Route exact path="/orders" component={OrderList} />
	      	</Switch>
    	);
  	}
}

export default withRouter(App);
