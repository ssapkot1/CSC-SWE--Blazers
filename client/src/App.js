import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import ProfileComponent from './components/profile.component';
import UserComponent from './components/user.component';
import Search from './components/search.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    // This will check if the user is logged in by looking for the token in localStorage
    // whenever the app is reloaded.
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);



  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand as={Link} to="/">
                Movie Recommendation System
              </Navbar.Brand>
              <Nav className="justify-content-end">
                <Nav.Link as={Link} to={!isLoggedIn ? '/profile' : '/login'}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/search">
                  Search
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path="/" component={Search} />
                  <Route path="/create-user" component={UserComponent} />
                  <Route path="/login" component={UserComponent} />
                  <Route path="/profile" component={ProfileComponent} />
                  <Route path="/search" component={Search} />
                  <Route render={() => <Redirect to="/" />} />
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
