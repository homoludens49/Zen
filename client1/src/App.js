import React ,{ Fragment , useEffect}from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Nav from './components/layout/Nav'
import Dashboard from './components/layout/Dashboard';
import Orders from './components/Orders';
import Invoice from './components/Invoice';
import Invoicealilo from './components/Invoicealilo';
import Expenses from './components/Expenses'
import Movements from './components/Movements'
//Redux
import { Provider } from 'react-redux'
import store from './store'
import {getStock , getTotals} from './actions/stock'

const App = ()=> {

  useEffect(()=> {
    store.dispatch(
      getStock()
      )
  }, [])
  return(  
    <Provider store={store}>
        <Router>
          <Fragment>
            <Nav />
            <Route path="/" exact component={Dashboard} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/expenses" exact component={Expenses} />
            <Route path="/movements" exact component={Movements}/>
            <Route path="/invoice" exact component={Invoice} />
            <Route path="/invoicealilo" exact component={Invoicealilo} />
          </Fragment>
      </Router>
    </Provider>
  )
}


 

export default App;
