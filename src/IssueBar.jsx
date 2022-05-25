import React from 'react';
import { Row, Col } from 'react-bootstrap';

const IssueBar = ({
  totalCount,
  inProgressCount,
  newCount,
  completedCount,
}) => {
  return (
    <Row className="mt-4 mb-4">
      <Col>
        <span>Total: {totalCount}</span>
      </Col>
      <Col>
        <span className="text-primary">New: {newCount}</span>
      </Col>
      <Col>
        <span className="text-info">In Progress: {inProgressCount} </span>
      </Col>
      <Col>
        <span className="text-success">Completed: {completedCount} </span>
      </Col>
    </Row>
  );
};

export default IssueBar;
