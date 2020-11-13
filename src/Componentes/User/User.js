import React, { useContext } from 'react';

import { UserContext } from './../../Context/UserContext';

function User() {
    let { user } = useContext(UserContext);

    return (
        <div className="container mt-4">
            <h1 className="p-2 mt-4 mb-4 text-center">USUARIO</h1>
            
            <div className="user-info p-4 bg-light">
                <div className="user-name p-4 bg-dark">
                    <img className="align-self-start img-thumbnail rounded-circle main-user-image" src={(user.photoURL) ? user.photoURL : './img/userImage.png'} alt="Foto del usuario" />
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