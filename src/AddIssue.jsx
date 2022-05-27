import React from 'react';
import IssueForm from './IssueForm';

const AddIssue = ({ addIssue }) => {
  const handleIssue = (issue) => {
    //   adding issue
    addIssue(issue);
  };
  return <IssueForm addIssue={handleIssue} />;
};

export default AddIssue;
