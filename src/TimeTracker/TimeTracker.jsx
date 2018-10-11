import React, { Component } from 'react';
import { Input, Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import  Timer from "react-time-counter"
import { timeActions } from '../_actions';

import { connect } from 'react-redux';

class TimeTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      session: "",
      time: "00:00:00",
      active: false
    };

    this.startSession = this.startSession.bind(this);
    this.endSession = this.endSession.bind(this);
  }

  componentDidMount() {
    this.getLastSession()
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  tick() {
    const { session } = this.props
    if (session && session.start_date) {
      var date1 = new Date(session.start_date);
      var date2 = new Date();
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var totalSeconds = Math.ceil(timeDiff / (1000)); 

      var hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      var minutes = Math.floor(totalSeconds / 60);
      var seconds = totalSeconds % 60;
      var time = ('00' + hours).slice(-2) + ":" + ('00' + minutes).slice(-2)  + ":" + ('00' + seconds).slice(-2)
      this.setState({
        time: time,
        active: true
      })
    } else {
      this.setState({
        time: "00:00:00",
        active: false
      })
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  startSession(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { dispatch } = this.props;
    dispatch(timeActions.startTime());
  }

  endSession(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { dispatch } = this.props;
    dispatch(timeActions.endSession());
  }

  getLastSession() {
    const { dispatch } = this.props;
    dispatch(timeActions.getLastSession())
  }
  
  render() {
    const { session } = this.props;
    const { time, active } = this.state
    var button = {}
    if(active) {
      button = <Button block color="alert" onClick={this.endSession}>Stop</Button>
    } else {
      button = <Button block color="success" onClick={this.startSession}>Start</Button>
    }
      
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Time Tracker</strong>
          </CardHeader>
          <CardBody>
            <Row className="align-items-center">
              <Col col="6" xl className="mb-3 mb-xl-0">
                <h1>{time}</h1>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col col="12" xl className="mb-3 mb-xl-0">
                Start Tracker 
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                { button } 
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { session } = state.startTrack;
  return {
    session
  };
}

const connectedTimeTracker = connect(mapStateToProps)(TimeTracker);
export { connectedTimeTracker as TimeTracker }; 


//export default TimeTracker;


