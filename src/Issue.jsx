import React, { useState } from 'react';

import { FaTrash, FaCheckSquare, FaEdit } from 'react-icons/fa';

import { Badge, ProgressBar, Modal, Button } from 'react-bootstrap';

import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

const Issue = ({ issue, completeIssue, deleteIssue }) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    priority,
    status,
    endDate,
    assignedTo,
    completedPercentage,
  } = issue;

  const [show, setShow] = useState(false);
  const handleClose = (e) => {
    //   check if this is triggered by delete button
    if (e.target.dataset.action === 'delete') {
      deleteIssue(id);
      toast.success('Issue is deleted');
    }
    // confirm delete action if button is clicked

    setShow(false);
  };
  const handleShow = () => setShow(true);

  const lowClass = priority === 'low' ? 'primary' : '';
  const highClass = priority === 'high' ? 'danger' : '';
  const mediumClass = priority === 'medium' ? 'info' : '';
  const lowPercentageClass = completedPercentage <= 30 ? 'danger' : '';
  const mediumPercentageClass =
    completedPercentage > 30 && completedPercentage < 70 ? 'info' : '';
  const highPercentageClass = completedPercentage > 70 ? 'success' : '';
  const completedStatus =
    status === 'completed' ? (
      <span style={{ textDecoration: 'line-through', color: 'red' }}>
        completed
      </span>
    ) : (
      status
    );

  const modal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>Are You Sure You Want To Delete The Issue</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" data-action="delete" onClick={handleClose}>
          Delete
        </Button>
        <Button variant="info" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      {modal}
      <tr key={id}>
        <td>{id}</td>
        <td>{title}</td>
        <td>
          <Badge pill bg={`${lowClass}${highClass}${mediumClass}`}>
            {priority}
          </Badge>
        </td>
        <td>{completedStatus}</td>
        <td>{endDate}</td>
        <td>{assignedTo}</td>
        <td>
          {
            <ProgressBar
              variant={`${lowPercentageClass}${mediumPercentageClass}${highPercentageClass}`}
              className="mt-1"
              animated
              striped
              now={completedPercentage}
              label={`${completedPercentage}%`}
            />
          }
        </td>
        <td>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ height: '21px' }}
          >
            <FaEdit
              className="text-info"
              onClick={() => navigate(`/edit/${id}`)}
            />
            <FaCheckSquare
              className="text-success"
              onClick={() => completeIssue(id)}
            />
            <FaTrash className="text-danger" onClick={handleShow} />
          </div>
        </td>
      </tr>
    </>
  );
};

export default Issue;
