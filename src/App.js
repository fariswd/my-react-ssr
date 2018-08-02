import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config'
import { Route, Switch, NavLink } from 'react-router-dom'
import Home from './component/Home'

import HomeRoute from './routes/Home'
import AboutRoute from './routes/About'
import ContactRoute from './routes/Contact'
import NotFoundRoute from './routes/NotFound'

import Routes from './routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/about'>About</NavLink></li>
          <li><NavLink to='/contact'>Contact</NavLink></li>
        </ul>
        <Switch>
          {renderRoutes(Routes)}
          {/* <Route exact path='/' render={() => <Home />} />
          <Route path='/about' component={AboutRoute} />
          <Route path='/contact' component={ContactRoute} />
          <Route component={NotFoundRoute} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
