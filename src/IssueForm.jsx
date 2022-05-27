import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

const defaultIssue = {
  title: '',
  subTitle: '',
  assignedTo: '',
  startDate: '',
  endDate: '',
  priority: 'low',
  status: 'new',
  completedPercentage: 1,
};

const IssueForm = ({ addIssue, updateIssue, issue: issueToEdit }) => {
  const navigate = useNavigate();
  const [issue, setIssue] = useState(defaultIssue);

  const [errors, setErrors] = useState({
    title: '',
    subTitle: '',
    assignedTo: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    if (issueToEdit) {
      const {
        id,
        title,
        subTitle,
        assignedTo,
        startDate,
        endDate,
        priority,
        status,
        completedPercentage,
      } = issueToEdit;

      setIssue({
        id,
        title,
        subTitle,
        assignedTo,
        startDate,
        endDate,
        priority,
        status,
        completedPercentage,
      });
    }
  }, [issueToEdit]);

  const handleChange = (evt) => {
    setIssue({
      ...issue,
      [evt.target.name]: evt.target.value,
    });

    setErrors({
      ...errors,
      [evt.target.name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, subTitle, assignedTo, startDate, endDate, priority } = issue;
    // checking error
    if (title === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: 'Title is required',
      }));
    }

    if (subTitle === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        subTitle: 'Subtitle is required',
      }));
    }

    if (assignedTo === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        assignedTo: 'Assigned to is required',
      }));

      if (startDate === '') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          startDate: 'Start Date is required',
        }));
      }

      if (endDate === '') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          endDate: 'End Date is required',
        }));
      }

      if (priority === '') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          priority: 'End Date is required',
        }));
      }
    }

    const isValid = Object.values(issue).every((elm) => elm);

    if (issue.id && isValid) {
      updateIssue({ ...issue });
      setIssue(defaultIssue);
      toast.success('Issue updated Successfully');
      navigate('/issues');
      return;
    }

    if (isValid) {
      addIssue({ ...issue, id: uuid() });
      setIssue(defaultIssue);
      toast.success('Issue Added Successfully');
      navigate('/issues');
    }
  };

  const {
    title,
    subTitle,
    assignedTo,
    startDate,
    endDate,
    priority,
    status,
    completedPercentage,
  } = issue;
  const {
    title: errorTitle,
    subTitle: errorSubTitle,
    assignedTo: errorAssignedTo,
    startDate: errorStartDate,
    endDate: errorEndDate,
  } = errors;
  return (
    <>
      <h1>{issueToEdit ? 'Edit Issue' : 'Add Issue'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="title" column>
              Title
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
              value={title}
              placeholder="Enter Your Task Name"
              isInvalid={errorTitle}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errorTitle}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="subTitle" column>
              Sub Title{' '}
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              as="textarea"
              type="text"
              name="subTitle"
              id="subTitle"
              onChange={handleChange}
              value={subTitle}
              placeholder="Enter Your Task Details"
              isInvalid={errorSubTitle}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errorSubTitle}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="assignedTo" column>
              Assign To
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="assignedTo"
              id="assignedTo"
              onChange={handleChange}
              value={assignedTo}
              placeholder="Whom You Are Assigned To"
              isInvalid={errorAssignedTo}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errorAssignedTo}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label column htmlFor="startDate">
              Start Date
            </Form.Label>
          </Col>
          <Col sm={3}>
            <Form.Control
              type="date"
              onChange={handleChange}
              name="startDate"
              value={startDate}
              placeholder="Enter Start Date"
              isInvalid={errorStartDate}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errorStartDate}
            </Form.Control.Feedback>
          </Col>

          <Col sm={6}>
            <Row>
              <Col sm={3}>
                <Form.Label column htmlFor="startDate">
                  End Date
                </Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Control
                  type="date"
                  onChange={handleChange}
                  name="endDate"
                  value={endDate}
                  placeholder="Enter end Date"
                  isInvalid={errorEndDate}
                />
                <Form.Control.Feedback type="invalid" className="d-block">
                  {errorEndDate}
                </Form.Control.Feedback>
              </Col>
            </Row>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3">
          <Row>
            <Col sm={3}>
              <Form.Label htmlFor="priority">Priority</Form.Label>
            </Col>
            <Col sm="auto">
              <Form.Check
                type="radio"
                value="low"
                label="Low"
                name="priority"
                onChange={handleChange}
                checked={priority === 'low'}
              />
            </Col>
            <Col sm="auto">
              <Form.Check
                type="radio"
                value="high"
                label="High"
                name="priority"
                onChange={handleChange}
                checked={priority === 'high'}
              />
            </Col>
            <Col sm="auto">
              <Form.Check
                type="radio"
                value="medium"
                label="Medium"
                name="priority"
                onChange={handleChange}
                checked={priority === 'medium'}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3">
          <Row>
            <Col sm={3}>
              <Form.Label htmlFor="status">Status</Form.Label>
            </Col>
            <Col sm="auto">
              <Form.Check
                type="radio"
                value="inProgress"
                label="InProgress"
                name="status"
                onChange={handleChange}
                checked={status === 'inProgress'}
              />
            </Col>
            <Col sm="auto">
              <Form.Check
                type="radio"
                value="completed"
                label="Completed"
                name="status"
                onChange={handleChange}
                checked={status === 'completed'}
              />
            </Col>
            <Col sm="auto">
              <Form.Check
                type="radio"
                value="new"
                label="New"
                name="status"
                onChange={handleChange}
                checked={status === 'new'}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3">
          <Row>
            <Col sm={3}>
              <Form.Label htmlFor="completedPercentage">
                Completed In Percentage
              </Form.Label>
            </Col>
            <Col sm={4}>
              <Form.Range
                value={completedPercentage}
                name="completedPercentage"
                onChange={handleChange}
              />
            </Col>
            <Col sm={1}>{completedPercentage}%</Col>
          </Row>
        </Form.Group>
        <div className="mt-5 mb-2">
          <Button variant="primary" size="md" type="submit" className="me-3">
            {issueToEdit ? 'Update Issue' : 'Submit Issue'}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default IssueForm;
