import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import  Timer from "react-time-counter"

class TimeTracker extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Time Tracker</strong>
          </CardHeader>
          <CardBody>
            <Row className="align-items-center">
              <Col col="6" xl className="mb-3 mb-xl-0">
                <h1><Timer hours={1}/></h1>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col col="12" xl className="mb-3 mb-xl-0">
                Start Tracker
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="success">Start</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default TimeTracker;
