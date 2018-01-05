/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, NavLink, Route } from 'react-router-dom';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import TradingViewPage from './tradingView/TradingViewPage';
import APIPage from './api/APIPage';
import NotFoundPage from './NotFoundPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const activeStyle = { color: '#5bb7db' };
    return (
      <div>
        <div>
          <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
          {' | '}
          <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
          {' | '}
          <NavLink to="/trading-view" activeStyle={activeStyle}>Trading View</NavLink>
          {' | '}
          <NavLink to="/api" activeStyle={activeStyle}>API</NavLink>
          {' | '}
          <a href="https://trello.com/b/qMkwFOg9/tradingview" target="_blank" activeStyle={activeStyle}>Trello</a>
        </div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/trading-view" component={TradingViewPage} />
          <Route path="/api" component={APIPage} />
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



// import FuelSavingsPage from './containers/FuelSavingsPage';
// <Route path="/fuel-savings" component={FuelSavingsPage} />
// <NavLink to="/fuel-savings" activeStyle={activeStyle}>Demo App</NavLink>
// {' | '}


// import React, { Component } from "react";
// import socketIOClient from "socket.io-client";

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       response: false,
//       endpoint: "http://127.0.0.1:4001"
//     };
//   }

//   componentDidMount() {
//     const { endpoint } = this.state;
//     const socket = socketIOClient(endpoint);
//     socket.on("FromAPI", data => this.setState({ response: data }));
//   }

//   render() {
//     const { response } = this.state;
//     return (
//       <div style={{ textAlign: "center" }}>
//         {response
//           ? <p>
//               The temperature in Florence is: {response} °F
//             </p>
//           : <p>Loading...</p>}
//       </div>
//     );
//   }
// }

// export default App;
