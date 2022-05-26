import React from 'react';

import { FaTrash, FaCheckSquare, FaEdit } from 'react-icons/fa';

import { Badge, ProgressBar } from 'react-bootstrap';

const Issue = ({ issue }) => {
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
  const lowPercentageClass = completedPercentage <= 30 ? 'danger' : '';
  const mediumPercentageClass =
    completedPercentage > 30 && completedPercentage < 70 ? 'info' : '';
  const highPercentageClass = completedPercentage > 70 ? 'success' : '';
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
};

export default Issue;
