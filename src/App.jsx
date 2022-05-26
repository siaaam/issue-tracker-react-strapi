import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Navigation from './Navigation';
import Issues from './issues';
import AddIssue from './AddIssue';

import { Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  const [issues, setIssues] = useState([
    {
      id: 'c145ad1f-84ff-44aa-ade9-82eb43ab1177',
      title: 'title 1',
      subTitle: 'sub title 2',
      assignedTo: 'siam',
      startDate: '',
      endDate: '',
      priority: 'low',
      status: 'new',
      completedPercentage: 88,
    },
  ]);

  const [totalCount, setTotalCount] = useState(0);
  const [newCount, setNewCount] = useState(0);
  const [inProgressCount, setInprogressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const addIssue = (issue) => {
    setIssues([...issues, issue]);
    setTotalCount((prevCount) => prevCount + 1);
    if (issue.status === 'new') {
      setNewCount((prevCount) => prevCount + 1);
    }
    if (issue.status === 'inProgress') {
      setInprogressCount((prevCount) => prevCount + 1);
    }
    if (issue.status === 'completed') {
      setCompletedCount((prevCount) => prevCount + 1);
    }
  };

  const completeIssue = (id) => {
    console.log(id);
    // get the issue object based on id
    // modify the object with completed logic
    // change the state for re render

    const issuesAfterCompletion = issues.map((issue) => {
      if (issue.id === id) {
        return {
          ...issue,
          completedPercentage: 100,
          status: 'completed',
        };
      } else {
        return issue;
      }
    });
    setIssues(issuesAfterCompletion);
  };

  return (
    <Row>
      <Navigation />
      <Col sm={{ span: 10, offset: 2 }}>
        <Container>
          <AddIssue addIssue={addIssue} />

          <Issues
            issues={issues}
            totalCount={totalCount}
            newCount={newCount}
            inProgressCount={inProgressCount}
            completedCount={completedCount}
            completeIssue={completeIssue}
          />
        </Container>
      </Col>
    </Row>
  );
}

export default App;
