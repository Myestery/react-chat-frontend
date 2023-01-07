import React from "react";

export class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      laps: [],
      text: "00:00:00",
      running: false,
      miliseconds: 0,
      seconds: 0,
      minutes: 0,
    };
  }

  componentDidMount() {
    this.start();
  }
  componentWillUnmount() {
    this.stop();
  }

  start = () => {
    if (!this.state.running) {
      this.setState({ running: true });
      this.watch = setInterval(() => this.step(), 10);
    }
  };

  stop = () => {
    this.setState({ running: false });
    clearInterval(this.watch);
  };

  step = () => {
    if (!this.state.running) return;
    this.calculate();
    this.print();
  };

  reset = () => {
    this.setState({
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
      text: "00:00:00",
      laps: [],
    });
  };

  print = () => {
    this.setState({ text: this.format() });
  };

  format = () => {
    return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(
      this.state.miliseconds
    )}`;
  };

  calculate = () => {
    this.state.miliseconds += 1;
    if (this.state.miliseconds >= 100) {
      this.state.seconds += 1;
      this.state.miliseconds = 0;
    }
    if (this.state.seconds >= 60) {
      this.state.minutes += 1;
      this.state.seconds = 0;
    }
  };

  lap = () => {
    if (this.state.running) {
      this.setState({ laps: this.state.laps.concat(this.state.text) });
    }
  };

  render() {
    return (
      <div className="main">
        <div className="stopwatch">{this.state.text}</div>
        <ul className="results">
          {this.state.laps.map(lapTime => (
            <li>{lapTime}</li>
          ))}
        </ul>
      </div>
    );
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}
