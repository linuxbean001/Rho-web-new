import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './login/login';
import Dashboard from './dashboard/page/dashboard/dashboard';
import LoginProces from './loginproces';

class Layout extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route  path='/login' component={Login} />
                        <Route  path='/auth/tradier/callback' component={LoginProces} />
                        <Route  path='/' component={Dashboard} />
                       
                        
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Layout;
