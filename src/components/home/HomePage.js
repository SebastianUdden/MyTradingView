import React from 'react';
import { Link } from 'react-router-dom';

export default class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron" style={{backgroundColor: "inherit"}}>
        <h1>Welcome to Trading View</h1>
        <p>This site is created using React, Redux, React Router and Socket.io. It will be filled with information from relevant APIs to allow efficient live-trading.</p>
        <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
      </div>
    );
  }
}
