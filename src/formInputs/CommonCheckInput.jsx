import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import CheckInput from './CheckInput';

const CommonCheckInput = ({ label, valueToIterate, onChange }) => {
  return (
    <Form.Group className="mb-3">
      <Row>
        <Col sm={3}>
          <Form.Label htmlFor={label}>{label}</Form.Label>
        </Col>

        {valueToIterate.map((elm, idx) => (
          <CheckInput
            key={idx}
            name={elm.name}
            label={elm.label}
            value={elm.value}
            onChange={onChange}
            valueToChecked={elm.valueToChecked}
          />
        ))}
      </Row>
    </Form.Group>
  );
};

export default CommonCheckInput;
