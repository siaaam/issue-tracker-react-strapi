import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import Navigation from './Navigation';
import Issues from './issues';

import Home from './Home';

import { Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';

import { ToastContainer } from 'react-toastify';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';

import EditIssue from './EditIssue';
import AddIssue from './AddIssue';

function App() {
  const [issues, setIssues] = useState([
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
  ]);

  const [totalCount, setTotalCount] = useState(0);
  const [newCount, setNewCount] = useState(0);
  const [inProgressCount, setInprogressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const addIssue = (issue) => {
    setIssues((prevIssues) => [...prevIssues, issue]);

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

  const deleteIssue = (id) => {
    const issuesAfterDelete = issues.filter((issue) => issue.id !== id);
    setIssues(issuesAfterDelete);
  };

  const completeIssue = (id) => {
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

  const updateIssue = (issueToUpdate) => {
    const issuesAfterUpdate = issues.map((issue) => {
      if (issueToUpdate.id === issue.id) {
        return {
          ...issueToUpdate,
          status:
            parseInt(issueToUpdate.completedPercentage) < 100
              ? 'inProgress'
              : issueToUpdate.status,
          id: issue.id,
        };
      } else {
        return issue;
      }
    });
    setIssues(issuesAfterUpdate);
  };

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
      <Row>
        <BrowserRouter>
          <Navigation />
          <Col sm={{ span: 10, offset: 2 }}>
            <Container>
              <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/add" element={<AddIssue addIssue={addIssue} />} />
                <Route
                  path="/edit/:id"
                  element={
                    <EditIssue
                      issues={issues}
                      addIssue={addIssue}
                      updateIssue={updateIssue}
                    />
                  }
                />
                <Route
                  path="/issues"
                  element={
                    <Issues
                      issues={issues}
                      totalCount={totalCount}
                      newCount={newCount}
                      inProgressCount={inProgressCount}
                      completedCount={completedCount}
                      completeIssue={completeIssue}
                      deleteIssue={deleteIssue}
                    />
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>
          </Col>
        </BrowserRouter>
      </Row>
    </>
  );
}

export default App;
