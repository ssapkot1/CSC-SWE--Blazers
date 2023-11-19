import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap'; // Import Container from React Bootstrap
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
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        // Check if the user is logged in by looking for a token in localStorage
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, []);

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
