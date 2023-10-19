import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components and pages
import Navbar from './components/Navigation/Navbar';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import GiftListPage from './components/pages/GiftListPage';
import RecommendationsPage from './components/pages/RecommendationsPage';
import UserProfile from './components/Profile/UserProfile';
import QuestionnairePage from './components/pages/questionnairepage';

// Context
import AuthProvider from './components/Auth/AuthProvider';

// Styles
import './assets/styles/Navbar.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/register" component={RegisterPage} />
                        <Route exact path="/giftlist" component={GiftListPage} />
                        <Route exact path="/recommendations" component={RecommendationsPage} />
                        <Route exact path="/profile" component={UserProfile} />
                        <Route exact path="/questionnaire" component={QuestionnairePage} />
                    </Switch>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
