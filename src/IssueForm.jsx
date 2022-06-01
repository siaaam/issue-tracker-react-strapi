import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import TextInput from './formInputs/TextInput';

import 'react-datepicker/dist/react-datepicker.css';
import DateInput from './formInputs/DateInput';
import CheckInput from './formInputs/CheckInput';

const defaultIssue = {
  title: '',
  subTitle: '',
  assignedTo: '',
  startDate: new Date(),
  endDate: new Date(),
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
        <TextInput
          label="Title"
          type="text"
          name="title"
          onChange={handleChange}
          value={title}
          placeholder="Enter Your Task Name"
          error={errorTitle}
        />

        <TextInput
          label="Subtitle"
          type="text"
          name="subTitle"
          onChange={handleChange}
          value={subTitle}
          placeholder="Enter Your Task Details"
          error={errorSubTitle}
          as="textarea"
        />

        <TextInput
          label="Assigned To"
          type="text"
          name="assignedTo"
          onChange={handleChange}
          value={assignedTo}
          placeholder="Whom You Are Assigned To"
          error={errorAssignedTo}
        />

        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label column htmlFor="startDate">
              Start Date
            </Form.Label>
          </Col>
          <Col sm={3}>
            <DateInput
              selected={startDate}
              onChange={(date) =>
                setIssue({
                  ...issue,
                  startDate: date,
                })
              }
              name="startDate"
              minDate={startDate}
              value={startDate}
              error={errorStartDate}
              selectsStart
            />
          </Col>

          <Col sm={6}>
            <Row>
              <Col sm={3}>
                <Form.Label column htmlFor="startDate">
                  End Date
                </Form.Label>
              </Col>
              <Col sm={9}>
                <DateInput
                  selected={endDate}
                  onChange={(date) =>
                    setIssue({
                      ...issue,
                      endDate: date,
                    })
                  }
                  name="endDate"
                  minDate={startDate}
                  value={endDate}
                  error={errorEndDate}
                  selectsEnd
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>

        {/* Priority */}
        <Form.Group className="mb-3">
          <Row>
            <Col sm={3}>
              <Form.Label htmlFor="priority">Priority</Form.Label>
            </Col>
            <CheckInput
              name="priority"
              label="Low"
              value="low"
              onChange={handleChange}
              valueToChecked={priority}
            />

            <CheckInput
              name="priority"
              label="High"
              value="high"
              onChange={handleChange}
              valueToChecked={priority}
            />

            <CheckInput
              name="priority"
              label="Medium"
              value="medium"
              onChange={handleChange}
              valueToChecked={priority}
            />
          </Row>
        </Form.Group>

        {/* Status */}
        <Form.Group className="mb-3">
          <Row>
            <Col sm={3}>
              <Form.Label htmlFor="status">Status</Form.Label>
            </Col>
            <CheckInput
              name="status"
              label="InProgress"
              value="inProgress"
              onChange={handleChange}
              valueToChecked={status}
            />
            <CheckInput
              name="status"
              label="Completed"
              value="completed"
              onChange={handleChange}
              valueToChecked={status}
            />
            <CheckInput
              name="status"
              label="New"
              value="new"
              onChange={handleChange}
              valueToChecked={status}
            />
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
