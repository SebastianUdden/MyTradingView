import React from 'react';

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
    this.ISOStringDateCET = this.state.date.addHours(1).toISOString();
    this.ISOStringDatePST = this.state.date.addHours(-9).toISOString();
    this.ISOStringDateKST = this.state.date.addHours(-7).toISOString();
  }

  render() {
    const clock = {
      textAlign: "center",
      border: "1px white solid",
      padding: "10px",
      fontWeight: "600",
      fontSize: "140%",
      color: "#ddd",
      backgroundColor: "#000"
    };
    return (
        <div>
            <span className="col-xs-4" style={clock}>Central European Time | {this.ISOStringDateCET ? this.ISOStringDateCET.substring(0, 19).replace('T', ' ').substring(11, 19) : ''}</span>
            <span className="col-xs-4" style={clock}>Pacific Standard Time | {this.ISOStringDatePST ? this.ISOStringDatePST.substring(0, 19).replace('T', ' ').substring(11, 19) : ''}</span>
            <span className="col-xs-4" style={clock}>Korean Standard Time | {this.ISOStringDateKST ? this.ISOStringDateKST.substring(0, 19).replace('T', ' ').substring(11, 19) : ''}</span>
        </div>
    );
  }
}

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
};
