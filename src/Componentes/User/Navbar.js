import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

// Importar contexto
import { UserContext } from './../../Context/UserContext';

function Navbar() {
    let { user, handleLogOut } = useContext(UserContext);

    return(
        <nav className="navbar navbar-expand-lg navbar-primary bg-light">
            <div className="container">
                <div className="navbar-brand">
                    <Link to="/dashboard">
                        Tiendas
                    </Link>
                </div>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/sucursales" className="nav-link">Sucursales</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/user" className="nav-link">Usuario</Link>
                        </li>
                    </ul>

                    <form className="form-inline my-2 my-lg-0">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav user-nav">
                                    <li className="nav-item">
                                        <p>Saludos <strong>{(user.displayName) ? user.displayName : 'usuario anónimo'}</strong></p>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img className="align-self-start img-thumbnail rounded-circle user-image" src={(user.photoURL) ? user.photoURL : './img/userImage.png'} />
                                        </a>
                                        <div className="dropdown-menu p-3" aria-labelledby="navbarDropdownMenuLink">
                                            <a className="dropdown-item" onClick={handleLogOut}>Cerrar sesion</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;