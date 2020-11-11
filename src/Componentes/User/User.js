import React, { useState, useContext } from 'react';

import { UserContext } from './../../Context/UserContext';

function User() {
    let { user } = useContext(UserContext);

    return (
        <div className="container bg-light mt-4">
            <div className="user-info p-4">
                <div className="user-name p-4 bg-dark">
                    <img className="align-self-start img-thumbnail rounded-circle main-user-image" src={(user.photoURL) ? user.photoURL : './img/userImage.png'} />
                </div>
                <div className="user-data">
                    <p>Nombre de usuario: <strong>{user.displayName ? user.displayName : "Anónimo"}</strong></p>
                    <p>Correo electrónico: <strong>{user.email}</strong></p>
                    <p>Código de usuario: <strong> {user.uid}</strong></p>
                    <p>Email verificado: <strong> {user.emailVerified ? "Si" : "No"}</strong></p>
                </div>
            </div>
        </div>
    );
}

export default User;