/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, NavLink, Route } from 'react-router-dom';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import LearningPage from './learning/LearningPage';
import TradingViewPage from './tradingView/TradingViewPage';
import APIPage from './api/APIPage';
import NotFoundPage from './NotFoundPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const choosenStyle = { color: '#5bb7db' };
    return (
      <div>
        <div>
          <NavLink exact to="/" activeStyle={choosenStyle}>Home</NavLink>
          {' | '}
          <NavLink exact to="/about" activeStyle={choosenStyle}>About</NavLink>
          {' | '}
          <NavLink exact to="/trading-view" activeStyle={choosenStyle}>Trading View</NavLink>
          {' | '}
          <NavLink exact to="/learning" activeStyle={choosenStyle}>Learning</NavLink>
          {' | '}
          <NavLink exact to="/api" activeStyle={choosenStyle}>API</NavLink>
          {' | '}
          <a href="https://trello.com/b/qMkwFOg9/tradingview" target="_blank">Trello</a>
        </div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/trading-view" component={TradingViewPage} />
          <Route exact path="/learning" component={LearningPage} />
          <Route exact path="/api" component={APIPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
