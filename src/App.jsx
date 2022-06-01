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
  const [totalCount, setTotalCount] = useState(0);
  const [newCount, setNewCount] = useState(0);
  const [inProgressCount, setInprogressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

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
                <Route path="/add" element={<AddIssue />} />
                <Route path="/edit/:id" element={<EditIssue />} />
                <Route
                  path="/issues"
                  element={
                    <Issues
                      totalCount={totalCount}
                      newCount={newCount}
                      inProgressCount={inProgressCount}
                      completedCount={completedCount}
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
