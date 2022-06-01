import React from 'react';
import { Form, Col } from 'react-bootstrap';

const CheckInput = ({ name, label, value, onChange, valueToChecked }) => {
  return (
    <Col sm="auto">
      <Form.Check
        type="radio"
        value={value}
        label={label}
        name={name}
        onChange={onChange}
        checked={valueToChecked === value}
      />
    </Col>
  );
};

export default CheckInput;
