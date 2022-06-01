import React, { useContext } from 'react';
import IssueForm from './IssueForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { IssueContext } from './context/IssueContext';

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

const EditIssue = () => {
  const { issues, updateIssue } = useContext(IssueContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [issue, setIssue] = useState(null);

  const [errors, setErrors] = useState({
    title: '',
    subTitle: '',
    assignedTo: '',
    startDate: '',
    endDate: '',
  });

  const issueToEdit = () => {
    const foundIssue = issues.find((issue) => issue.id === id);
    if (!foundIssue) {
      toast.warn('not validate');
      return navigate('/issues');
    }
    setIssue(foundIssue);
  };

  useEffect(() => {
    issueToEdit();
  }, [id]);

  const handleUpdatedIssue = (issue) => {
    updateIssue(issue);
  };

  return <IssueForm updateIssue={handleUpdatedIssue} issue={issue} />;
};

export default EditIssue;
