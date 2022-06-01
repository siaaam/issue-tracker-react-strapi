import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { IssueContext } from './context/IssueContext';
import Issue from './Issue';
import IssueBar from './IssueBar';

const Issues = ({ totalCount, newCount, inProgressCount, completedCount }) => {
  const { issues } = useContext(IssueContext);
  console.log(issues);
  return (
    <>
      <h2>All Issues...</h2>
      <IssueBar
        totalCount={totalCount}
        newCount={newCount}
        inProgressCount={inProgressCount}
        completedCount={completedCount}
      />
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
          {issues.map((issue) => (
            <Issue key={issue.id} issue={issue} />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Issues;
