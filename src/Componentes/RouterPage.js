import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import { UserContext } from '../Context/UserContext';

// Importar componentes
import Login from './Login';
import Registro from './Registro';

function RouterPage() {
    let {user, setUser, handleLogOut, load} = useContext(UserContext);

    return (
       <Router>
            <div>
                {
                    user ?
                        <div>
                            <p>Bienvenido {user.email}</p>
                            <button onClick={() => handleLogOut()}>Cerrar sesion</button>
                        </div>
                    : 
                        load &&
                        <Switch>
                            <Route exact path="/">
                                <Login />
                            </Route>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                            <Route exact path="/registro">
                                <Registro />
                            </Route>
                        </Switch>
                }
            </div>
       </Router>
    );
}

export default RouterPage;