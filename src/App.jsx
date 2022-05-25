import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import IssueBar from './IssueBar';
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
      completedPercentage: 12,
    },
  ]);

  const [totalCount, setTotalCount] = useState(0);
  const [newCount, setNewCount] = useState(0);
  const [inProgressCount, setInprogressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const addIssue = (issue) => {
    setIssues([...issues, issue]);
  };
  console.log(issues);
  return (
    <Row>
      <Navigation />
      <Col sm={{ span: 10, offset: 2 }}>
        <Container>
          <AddIssue addIssue={addIssue} />
          <IssueBar
            totalCount={totalCount}
            newCount={newCount}
            inProgressCount={inProgressCount}
            completedCount={completedCount}
          />
          <Issues issues={issues} />
        </Container>
      </Col>
    </Row>
  );
}

export default App;
