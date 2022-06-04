import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { Row, Col, Container, Spinner } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { AuthContext } from './context/AuthContext';
import NotFound from './NotFound';
import EditIssue from './EditIssue';
import AddIssue from './AddIssue';
import Navigation from './Navigation';
import Issues from './issues';
import Home from './Home';
import Register from './auth/Register';
import Login from './auth/Login';

const AuthRequired = ({ children }) => {
  const { user, userLoaded } = useContext(AuthContext);
  const location = useLocation();

  if (userLoaded) {
    if (!user) {
      return <Navigate to="/login" state={{ from: location.pathname }} />;
    } else {
      return children;
    }
  } else {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
};

const PublicRoute = ({ children }) => {
  const { user, userLoaded } = useContext(AuthContext);
  if (userLoaded) {
    if (!user) {
      return children;
    } else {
      return <Navigate to={location?.state?.from || '/issues'} />;
    }
  } else {
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>;
  }
};

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
                <Route
                  path="/add"
                  element={
                    <AuthRequired>
                      <AddIssue />
                    </AuthRequired>
                  }
                />
                <Route
                  path="/edit/:id"
                  element={
                    <AuthRequired>
                      <EditIssue />
                    </AuthRequired>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <Register />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/issues"
                  element={
                    <AuthRequired>
                      <Issues
                        totalCount={totalCount}
                        newCount={newCount}
                        inProgressCount={inProgressCount}
                        completedCount={completedCount}
                      />
                    </AuthRequired>
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
