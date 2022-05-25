import React from 'react';
import { Table, Badge, ProgressBar } from 'react-bootstrap';
import { FaTrash, FaCheckSquare, FaEdit } from 'react-icons/fa';

const Issues = ({ issues }) => {
  return (
    <>
      <h2>All Issues...</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Assigned To</th>
            <th>Completed %</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => {
            const {
              id,
              title,
              priority,
              status,
              endDate,
              assignedTo,
              completedPercentage,
            } = issue;
            const lowClass = priority === 'low' ? 'primary' : '';
            const highClass = priority === 'high' ? 'danger' : '';
            const mediumClass = priority === 'medium' ? 'info' : '';
            const lowPercentageClass =
              completedPercentage <= 30 ? 'danger' : '';
            const mediumPercentageClass =
              completedPercentage > 30 && completedPercentage < 70
                ? 'info'
                : '';
            const highPercentageClass =
              completedPercentage > 70 ? 'success' : '';
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{title}</td>
                <td>
                  <Badge pill bg={`${lowClass}${highClass}${mediumClass}`}>
                    {priority}
                  </Badge>
                </td>
                <td>{status}</td>
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
                    <FaEdit className="text-info" />
                    <FaCheckSquare className="text-success" />
                    <FaTrash className="text-danger" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Issues;
