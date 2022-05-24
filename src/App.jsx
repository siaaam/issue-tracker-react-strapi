import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import IssueBar from './IssueBar';
import Navigation from './Navigation';
import Issues from './issues';
import AddIssue from './AddIssue';

import { Row, Col, Container } from 'react-bootstrap';

function App() {
  return (
    <Row>
      <Navigation />
      <Col sm={{ span: 10, offset: 2 }}>
        <Container>
          <AddIssue />
          <IssueBar />
          <Issues />
        </Container>
      </Col>
    </Row>
  );
}

export default App;
