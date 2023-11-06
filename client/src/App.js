import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import AddMovie from './components/add-movie.component'

import EditMovie from './components/edit-movies.component'
 
import MoviesList from './components/movies-list.component'
import CreateProfile from './components/create-profile.component'
import ProfileList from './components/profile-list.component'
import Login from './components/login.component'
import Search from './components/search.component'
function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand>
                <Link to={'/create-profile'} className="nav-link">
                  Movie Recomendation System
                </Link>
              </Navbar.Brand>
              <Nav className="justify-content-end">
              <Nav>
                  <Link to={'/create-profile'} className="nav-link">
                    Create Profile
                  </Link>
                </Nav>
                <Nav>
                  <Link to={'/add-movie'} className="nav-link">
                    Add Movie
                  </Link>
                </Nav>
                <Nav>
                  <Link to={'/search'} className="nav-link">
                    Search
                  </Link>
                </Nav>
                <Nav>
                  <Link to={'/login'} className="nav-link">
                    Login
                  </Link>
                </Nav>
                <Nav>
                  <Link to={'/movies-list'} className="nav-link">
                    Movie List
                  </Link>
                </Nav>
                <Nav>
                  <Link to={'/profile-list'} className="nav-link">
                    Profile List
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={(props) => <CreateProfile {...props} />}
                  />
                  <Route
                    exact
                    path="/create-profile"
                    component={(props) => <CreateProfile {...props} />}
                  />
                   <Route
                    exact
                    path="/add-movie"
                    component={(props) => <AddMovie {...props} />}
                  />
                  <Route
                    exact
                    path="/login"
                    component={(props) => <Login {...props} />}
                  />
                  <Route
                    exact
                    path="/search"
                    component={(props) => <Search {...props} />}
                  />
                   <Route
                    exact
                    path="/movies-list"
                    component={(props) => <MoviesList {...props} />}
                  />
                  <Route
                    exact
                    path="/profile-list"
                    component={(props) => <ProfileList {...props} />}
                  />
                  <Route
                    exact
                    path="/edit-movie/:id"
                    component={(props) => <EditMovie {...props} />}
                  />
               
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  )
}
export default App