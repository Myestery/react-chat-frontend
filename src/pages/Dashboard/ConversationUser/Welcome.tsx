import { Button, Col, Row } from "reactstrap";

import React from "react";

const Welcome = () => {
  return (
    <React.Fragment>
      <div className="chat-welcome-section">
        <Row className="w-100 justify-content-center">
          <Col xxl={5} md={7}>
            <div className="p-4 text-center">
              <div className="avatar-xl mx-auto mb-4">
                <div className="avatar-title bg-soft-primary rounded-circle">
                  <i className="bx bxs-message-alt-detail display-4 text-primary m-0"></i>
                </div>
              </div>
              <h4>Welcome to LiveChat Chat App</h4>
              <p className="text-muted mb-4">
               This is a chat app built with React, Redux, Node, Express, and MongoDB. 
              </p>
              
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Welcome;
