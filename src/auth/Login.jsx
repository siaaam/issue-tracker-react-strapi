import React, { useContext } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Field should contain a valid e-mail')
      .max(255)
      .required('E-mail is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const { saveAuthInfo } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = async (data) => {
    const { password, email } = data;
    //   send api request to the server

    try {
      const res = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: email,
        password,
      });
      saveAuthInfo(res.data);
      toast.success('Login Successful');
      navigate('/issues');
    } catch (err) {
      toast.error(err.response.data.error.message);
      console.log(err);
    }
  };

  return (
    <Row>
      <Col sm={{ span: 6, offset: 1 }}>
        <h2 className="mb-4 mt-4 text-center">Login</h2>
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group as={Row} className="mb-3">
            <Col sm={3}>
              <Form.Label htmlFor="email" column>
                Email
              </Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                type="email"
                id="email"
                placeholder="Enter Your email"
                isInvalid={errors.email}
                {...register('email')}
              />
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={3}>
              <Form.Label htmlFor="password" column>
                Password
              </Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                type="password"
                id="password"
                placeholder="Enter Your password"
                isInvalid={errors.password}
                {...register('password')}
              />
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <div className="mt-4">
            <Button
              variant="primary"
              disabled={isSubmitting}
              size="md"
              type="submit"
            >
              Login
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
