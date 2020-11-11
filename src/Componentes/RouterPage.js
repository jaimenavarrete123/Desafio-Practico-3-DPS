import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import { UserContext } from '../Context/UserContext';

// Importar componentes
import Login from './Login';
import Registro from './Registro';
import Navbar from './User/Navbar';
import Dashboard from './User/Dashboard';
import Sucursales from './User/Sucursales';
import User from './User/User';

function RouterPage() {
    let {user, setUser, handleLogOut, load} = useContext(UserContext);

    return (
       <Router>
            <div>
                {
                    user ?
                        load &&
                        <>
                            <Navbar />

                            <Switch>
                                <Route exact path="/dashboard">
                                    <Dashboard />
                                </Route>
                                <Route exact path="/sucursales">
                                    <Sucursales />
                                </Route>
                                <Route exact path="/user">
                                    <User />
                                </Route>

                                <Route>
                                    <Redirect to="/dashboard" />
                                </Route>
                            </Switch>
                        </>
                    : 
                        load &&
                        <>
                            <Switch>
                                <Route exact path="/login">
                                    <Login />
                                </Route>
                                <Route exact path="/registro">
                                    <Registro />
                                </Route>

                                <Route>
                                    <Redirect to="/login" />
                                </Route>
                            </Switch>
                        </>
                }
            </div>
       </Router>
    );
}

export default RouterPage;