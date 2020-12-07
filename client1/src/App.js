import React ,{ Fragment , useEffect}from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Nav from './components/layout/Nav'
import Dashboard from './components/layout/Dashboard';
//Redux
import { Provider } from 'react-redux'
import store from './store'
import {getStock} from './actions/stock'

const App = ()=> {

  useEffect(()=> {
    store.dispatch(getStock())
  }, [])
  return(  
    <Provider store={store}>
        <Router>
          <Fragment>
            <Nav />
            <Route path="/" exact component={Dashboard} />
          </Fragment>
      </Router>
    </Provider>
  )
}


 

export default App;
