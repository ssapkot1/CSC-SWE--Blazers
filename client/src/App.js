// import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import ProfileComponent from './components/profile.component';
import UserComponent from './components/user.component';
import Search from './components/search.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/profile'); // Redirect to the profile page
    }
  }, [isLoggedIn, history]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token or any auth data
    setIsLoggedIn(false);
    history.push('/login'); // Redirect to the login page
  };

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={'/search'} className="nav-link">
                  Movie Recomendation System
                </Link>
              </Navbar.Brand>
              <Nav className="justify-content-end">
                {!isLoggedIn ? (
                  <>
                    <Nav>
                      <Link to={'/create-user'} className="nav-link">
                        Create Profile
                      </Link>
                    </Nav>
                    <Nav>
                      <Link to={'/login'} className="nav-link">
                        Login
                      </Link>
                    </Nav>
                  </>
                ) : (
                  <>
                    <Nav>
                      <Link to={'/search'} className="nav-link">
                        Search
                      </Link>
                    </Nav>
                    <Nav>
                      <button onClick={handleLogout} className="nav-link btn btn-link">
                        Logout
                      </button>
                    </Nav>
                  </>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path="/" component={(props) => <Search {...props} />} />
                  <Route exact path="/create-user" component={(props) => <UserComponent {...props} setIsLoggedIn={setIsLoggedIn} />} />
                  <Route exact path="/profile" component={ProfileComponent} />
                  <Route exact path="/login">
                    <UserComponent setIsLoggedIn={setIsLoggedIn} />
                  </Route>
                  <Route exact path="/search" component={(props) => <Search {...props} />} />
                </Switch>
                
              </div>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default App;