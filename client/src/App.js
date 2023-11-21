import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProfileComponent from './components/profile.component';
import LoginComponent from './components/login.component';
import CreateUserComponent from './components/create-user.component';
import Search from './components/search.component';
import MovieDetailsComponent from './components/movie-details.component';
import RecommendationComponent from './components/recommendation.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import the NavigationBar component
import NavigationBar from './components/navbar.component';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory(); // Assuming you are using React Router
  
    useEffect(() => {
      const validateToken = (token) => {
        // Implement token validation logic here
      };
  
      const token = localStorage.getItem('token');
      if (token && validateToken(token)) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    }, []);
  
    useEffect(() => {
      if (isLoggedIn) {
        history.push('/profile');
        alert('You are already logged in. Redirecting to your profile.');
      }
    }, [isLoggedIn, history]);

    return (
        <div className="App">
            <Router>
                {/* Replace the old navigation logic with the NavigationBar component */}
                <NavigationBar />

                <Container>
                    <Switch>
                        <Route exact path="/" component={Search} />
                        <Route path="/login" component={LoginComponent} />
                        <Route path="/create-user" component={CreateUserComponent} />

                        <Route path="/profile" component={ProfileComponent} />
                        <Route path="/search" component={Search} />
                        <Route path="/recommendation" component={RecommendationComponent} />
                        <Route path="/movies/details/:id" component={MovieDetailsComponent} />
                        <Route render={() => <Redirect to="/" />} />
                    </Switch>
                </Container>
            </Router>
        </div>
    );
}

export default App;
