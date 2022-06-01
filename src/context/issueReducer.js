import {
  ADD_ISSUE,
  COMPLETE_ISSUE,
  DELETE_ISSUE,
  UPDATE_ISSUE,
} from './actions';

export const issueReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ISSUE:
      return [...state, payload];
    case DELETE_ISSUE:
      const issuesAfterDelete = state.filter((issue) => issue.id !== payload);
      return [...issuesAfterDelete];
    case UPDATE_ISSUE:
      const issuesAfterUpdate = state.map((issue) => {
        if (payload.id === issue.id) {
          return {
            ...payload,
            status:
              parseInt(payload.completedPercentage) < 100
                ? 'inProgress'
                : payload.status,
            id: issue.id,
          };
        } else {
          return issue;
        }
      });
      return [...issuesAfterUpdate];

    case COMPLETE_ISSUE:
      const issuesAfterCompletion = state.map((issue) => {
        if (issue.id === payload) {
          return {
            ...issue,
            completedPercentage: 100,
            status: 'completed',
          };
        } else {
          return issue;
        }
      });
      return [...issuesAfterCompletion];
    default:
      return state;
  }
};
