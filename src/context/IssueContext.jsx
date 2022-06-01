import { createContext, useReducer } from 'react';
import {
  ADD_ISSUE,
  COMPLETE_ISSUE,
  DELETE_ISSUE,
  UPDATE_ISSUE,
} from './actions';
import { issueReducer } from './issueReducer';

export const IssueContext = createContext();

const initialState = [
  {
    id: 'c145ad1f-84ff-44aa-ade9-82eb43ab1177',
    title: 'title 1',
    subTitle: 'sub title 2',
    assignedTo: 'siam',
    startDate: new Date(),
    endDate: new Date(),
    priority: 'low',
    status: 'new',
    completedPercentage: 88,
  },
];

export const IssueProvider = ({ children }) => {
  const [issues, dispatch] = useReducer(issueReducer, initialState);

  const addIssue = (issue) => {
    dispatch({ type: ADD_ISSUE, payload: issue });

    // setIssues((prevIssues) => [...prevIssues, issue]);

    // setTotalCount((prevCount) => prevCount + 1);

    // if (issue.status === 'new') {
    //   setNewCount((prevCount) => prevCount + 1);
    // }
    // if (issue.status === 'inProgress') {
    //   setInprogressCount((prevCount) => prevCount + 1);
    // }
    // if (issue.status === 'completed') {
    //   setCompletedCount((prevCount) => prevCount + 1);
    // }
  };

  const updateIssue = (issueToUpdate) => {
    dispatch({ type: UPDATE_ISSUE, payload: issueToUpdate });
  };

  const deleteIssue = (id) => {
    dispatch({ type: DELETE_ISSUE, payload: id });
  };

  const completeIssue = (id) => {
    dispatch({ type: COMPLETE_ISSUE, payload: id });
  };

  const value = {
    issues,
    addIssue,
    deleteIssue,
    updateIssue,
    completeIssue,
  };

  return (
    <IssueContext.Provider value={value}>{children}</IssueContext.Provider>
  );
};
